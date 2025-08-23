import { useState, useEffect } from 'react';
import MapBox, { Marker } from '@/components/common/MapBox';
import LoadingOverlay from '@/components/common/LoadingOverlay';
import BottomDrawer from '@/components/common/BottomDrawer';
import { Text } from '@/components/common/Text';
import { ArrowRight } from '@/assets/icons';

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMarker, setSelectedMarker] = useState<Marker | null>(null);
  const [currentLocation, setCurrentLocation] = useState<[number, number]>([
    126.978, 37.5665,
  ]);
  const [markers, setMarkers] = useState<Marker[]>([]);

  useEffect(() => {
    // 현재 위치 가져오기
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords;
          setCurrentLocation([longitude, latitude]);

          const currentLocationMarker: Marker = {
            id: 'current-location',
            longitude,
            latitude,
            title: '현재 위치',
          };
          setMarkers((prev) => [...prev, currentLocationMarker]);
        },
        (error) => {
          console.warn('위치 정보를 가져올 수 없습니다:', error);
        }
      );
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleMarkerClick = (marker: Marker) => {
    setSelectedMarker(marker);
    console.log('Dashboard에서 마커 클릭됨:', marker);
  };

  return (
    <div className="w-screen h-screen">
      <LoadingOverlay isLoading={isLoading}>
        <MapBox
          accessToken={import.meta.env.VITE_MAP_TOKEN}
          width="100vw"
          height="100vh"
          center={currentLocation}
          zoom={15}
          markers={markers}
          onMarkerClick={handleMarkerClick}
        />
      </LoadingOverlay>
      <BottomDrawer
        minContentHeight={isLoading ? 120 : selectedMarker ? 264 : 148}
      >
        {isLoading ? (
          <div className="flex flex-col items-center">
            <div className="text-xl font-semibold text-black">
              Loading wildfire data...
            </div>
          </div>
        ) : selectedMarker ? (
          <div className="flex flex-col px-[15.27px]">
            <div className="flex w-fit items-center gap-4pxr px-8pxr py-4pxr rounded-16pxr bg-[#FFD51B]">
              <Text
                fontSize={12}
                fontWeight={400}
                color="black"
                className="text-center"
              >
                Reported
              </Text>
              <Text
                fontSize={12}
                fontWeight={700}
                color="black"
                className="text-center"
              >
                9 Times
              </Text>
            </div>
            <div className="h-8pxr" />
            <Text fontSize={20} fontWeight={600} color="black">
              Uljin Wildfire
            </Text>
            <Text
              fontSize={12}
              fontWeight={400}
              color="black"
              className="opacity-50"
            >
              Seonghae-myeon, Uljin County
            </Text>
            <div className="h-12pxr" />
            <div className="h-12pxr" />
            <div className="w-full flex gap-8pxr">
              <div className="w-full flex justify-center gap-8pxr py-8pxr items-center px-16pxr bg-[#CF1322] rounded-8pxr">
                <Text fontSize={14} fontWeight={500} color="white">
                  Share Incidient
                </Text>
                <ArrowRight />
              </div>
              <div className="w-full flex justify-center gap-8pxr py-8pxr px-16pxr border-[#CF1322] bg-white border-1pxr rounded-8pxr">
                <Text fontSize={14} fontWeight={500} color="primaryRed">
                  Shelter Info
                </Text>
              </div>
            </div>
          </div>
        ) : markers.length > 0 ? (
          <Text
            fontSize={20}
            fontWeight={600}
            color="black"
            className="text-center"
          >
            Tap on a fire to see details
            <br /> and live updates.
          </Text>
        ) : (
          <Text
            fontSize={20}
            fontWeight={600}
            color="black"
            className="text-center"
          >
            Currently, no active wildfire
            <br /> in your area.
          </Text>
        )}
      </BottomDrawer>
    </div>
  );
}
