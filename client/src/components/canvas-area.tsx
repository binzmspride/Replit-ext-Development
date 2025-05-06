import { useState, useEffect, useRef } from 'react';
import Canvas from '@/components/ui/canvas';
import { Heart } from 'lucide-react';

interface CanvasAreaProps {
  activeTool: string;
  activeColor: string;
  strokeWidth: number;
  onCanvasDataChange: (data: string | null) => void;
}

export default function CanvasArea({
  activeTool,
  activeColor,
  strokeWidth,
  onCanvasDataChange
}: CanvasAreaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [showEmptyState, setShowEmptyState] = useState(true);

  // Set canvas dimensions based on container
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;
        setDimensions({
          width: offsetWidth,
          height: offsetHeight
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  const handleCanvasDataChange = (data: string | null) => {
    onCanvasDataChange(data);
    setShowEmptyState(!data);
  };

  return (
    <div className="canvas-area flex-grow">
      <div className="bg-white rounded-xl shadow-md p-4 h-full">
        <div 
          ref={containerRef} 
          className="canvas-container w-full h-[500px] lg:h-[600px] bg-neutral-100 rounded-lg relative overflow-hidden drawing-canvas"
        >
          {dimensions.width > 0 && dimensions.height > 0 && (
            <Canvas 
              width={dimensions.width}
              height={dimensions.height}
              activeTool={activeTool}
              activeColor={activeColor}
              strokeWidth={strokeWidth}
              onDataChange={handleCanvasDataChange}
            />
          )}
          
          {/* Empty state message overlay */}
          {showEmptyState && (
            <div className="absolute inset-0 flex items-center justify-center text-center p-6">
              <div>
                <Heart className="h-16 w-16 mx-auto text-primary/20 mb-4" />
                <h3 className="text-xl font-poppins font-medium text-neutral-600 mb-2">
                  Start Creating Your Heart
                </h3>
                <p className="text-neutral-500 max-w-md">
                  Select a tool from the panel and begin drawing. 
                  Use the heart tool for perfect heart shapes or draw freehand.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
