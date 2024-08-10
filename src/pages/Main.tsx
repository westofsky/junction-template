import { useRef, useState } from 'react';

export default function Main() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [photoData, setPhotoData] = useState<string | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Error accessing camera: ', err);
    }
  };

  const takePhoto = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        context.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        const data = canvasRef.current.toDataURL('image/png');
        setPhotoData(data);
      }
    }
  };

  return (
    <div className="w-screen h-screen flex flex-row justify-center items-center">
      <div className="flex flex-col items-center">
        <button
          onClick={startCamera}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Start Camera
        </button>
        <video
          ref={videoRef}
          autoPlay
          className="mt-4"
          style={{ width: '100%', maxWidth: '640px', display: 'block' }}
        />
        <button
          onClick={takePhoto}
          className="bg-green-500 text-white px-4 py-2 rounded mt-4"
        >
          Take Photo
        </button>
        <canvas
          ref={canvasRef}
          style={{ display: 'none' }}
          width="640"
          height="480"
        />
        {photoData && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold">Photo Taken:</h2>
            <img
              src={photoData}
              alt="Captured"
              className="mt-2 border rounded"
            />
          </div>
        )}
      </div>
    </div>
  );
}
