import { useState, useRef, useEffect } from 'react';

interface BottomDrawerProps {
  children: React.ReactNode;
  minContentHeight?: number;
  onHeightChange?: (height: number, minHeight: number) => void;
}

export default function BottomDrawer({
  children,
  minContentHeight = 100,
  onHeightChange,
}: BottomDrawerProps) {
  const [height, setHeight] = useState(120);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startHeight, setStartHeight] = useState(0);
  const drawerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const maxHeight = window.innerHeight;
  const minHeight = 120;

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartY(e.clientY);
    setStartHeight(height);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
    setStartHeight(height);
  };

  useEffect(() => {
    setHeight(minContentHeight);
  }, [minContentHeight]);

  useEffect(() => {
    onHeightChange?.(height, minContentHeight);
  }, [height, minContentHeight, onHeightChange]);
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const deltaY = startY - e.clientY;
      const newHeight = Math.max(
        minHeight,
        Math.min(maxHeight, startHeight + deltaY)
      );
      setHeight(newHeight);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      e.preventDefault();

      const deltaY = startY - e.touches[0].clientY;
      const newHeight = Math.max(
        minHeight,
        Math.min(maxHeight, startHeight + deltaY)
      );
      setHeight(newHeight);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, startY, startHeight, minHeight, maxHeight]);

  return (
    <div
      ref={drawerRef}
      className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl z-50 flex flex-col ${
        isDragging ? '' : 'transition-all duration-300 ease-out'
      }`}
      style={{ height: `${height}px` }}
    >
      <div
        className="w-full py-4 flex justify-center items-center cursor-grab active:cursor-grabbing touch-none"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="w-[103.18px] h-[3.86px] bg-gray-300 rounded-full"></div>
      </div>

      {/* 내용 */}
      <div
        ref={contentRef}
        className="overflow-y-auto pt-12pxr pb-40pxr flex-1"
        style={{
          height: `calc(100% - 56px)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
