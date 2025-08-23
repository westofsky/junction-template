import indicatorGif from '@/assets/icons/indicator.gif';

interface LoadingOverlayProps {
  isLoading: boolean;
  children: React.ReactNode;
}

export default function LoadingOverlay({
  isLoading,
  children,
}: LoadingOverlayProps) {
  return (
    <div className="relative w-full h-full">
      {children}
      {isLoading && (
        <div className="absolute inset-0 z-30">
          <div
            className="absolute inset-0 opacity-50"
            style={{
              background: 'white',
              filter: 'blur(7px)',
            }}
          />
          <div className="absolute inset-0 flex justify-center items-center">
            <img
              src={indicatorGif}
              alt="Loading..."
              className="w-[100px] h-[100px]"
            />
          </div>
        </div>
      )}
    </div>
  );
}
