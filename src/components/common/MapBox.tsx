import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import fireMarker from '@/assets/icons/fire.png';

export interface Marker {
  id: string;
  longitude: number;
  latitude: number;
  title?: string;
}

interface MapBoxProps {
  width?: string;
  height?: string;
  accessToken: string;
  center?: [number, number];
  zoom?: number;
  markers?: Marker[];
  onMarkerClick?: (marker: Marker) => void;
  onVisibleMarkersChange?: (visibleMarkers: Marker[]) => void;
}

export default function MapBox({
  width = '100%',
  height = '400px',
  accessToken,
  center = [126.978, 37.5665],
  zoom = 10,
  markers = [],
  onMarkerClick,
  onVisibleMarkersChange,
}: MapBoxProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    mapboxgl.accessToken = accessToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: center,
      zoom,
    });

    // 지도 이동/줌 이벤트 감지하여 보이는 마커 확인
    const checkVisibleMarkers = () => {
      if (!map.current || !onVisibleMarkersChange) return;

      const bounds = map.current.getBounds();
      if (!bounds) return;

      const visibleMarkers = markers.filter((marker) =>
        bounds.contains([marker.longitude, marker.latitude])
      );

      onVisibleMarkersChange(visibleMarkers);
    };

    // 지도 중심 좌표 출력
    const logCenter = () => {
      if (!map.current) return;
      const center = map.current.getCenter();
      console.log('지도 중심 좌표:', {
        longitude: center.lng,
        latitude: center.lat,
      });
    };

    map.current.on('moveend', checkVisibleMarkers);
    map.current.on('moveend', logCenter);

    // 초기 로드 시에도 확인
    map.current.on('load', checkVisibleMarkers);

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [accessToken, center, zoom, onVisibleMarkersChange]);

  // 마커 업데이트를 별도 useEffect로 분리
  useEffect(() => {
    if (!map.current) return;

    // 기존 마커들 제거
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // 새 마커들 추가
    markers.forEach((marker) => {
      const el = document.createElement('div');
      el.style.width = '32px';
      el.style.height = '32px';
      el.style.backgroundImage = `url(${fireMarker})`;
      el.style.backgroundSize = 'contain';
      el.style.backgroundRepeat = 'no-repeat';
      el.style.backgroundPosition = 'center';
      el.style.cursor = 'pointer';

      const mapboxMarker = new mapboxgl.Marker(el)
        .setLngLat([marker.longitude, marker.latitude])
        .addTo(map.current!);

      // 클릭 이벤트를 Mapbox 마커 요소에 직접 추가
      const markerElement = mapboxMarker.getElement();
      markerElement.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log('마커 클릭됨:', marker);
        if (onMarkerClick) {
          onMarkerClick(marker);
        }
      });

      markersRef.current.push(mapboxMarker);
    });

    // 보이는 마커 확인
    if (onVisibleMarkersChange) {
      const bounds = map.current.getBounds();
      if (bounds) {
        const visibleMarkers = markers.filter((marker) =>
          bounds.contains([marker.longitude, marker.latitude])
        );
        onVisibleMarkersChange(visibleMarkers);
      }
    }
  }, [markers, onMarkerClick, onVisibleMarkersChange]);

  return <div ref={mapContainer} style={{ width, height }} />;
}
