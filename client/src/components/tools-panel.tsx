import { useState } from 'react';
import { 
  Heart, 
  PenTool, 
  Type, 
  Paintbrush, 
  Eraser, 
  Trash2, 
  Save, 
  Download 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';

const COLORS = [
  "#FF3366", "#FF5A79", "#FF8FA3", "#FFB6C1", "#FFCCD5",
  "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#3D85C6"
];

interface ToolsPanelProps {
  activeTool: string;
  activeColor: string;
  strokeWidth: number;
  onToolChange: (tool: string) => void;
  onColorChange: (color: string) => void;
  onStrokeWidthChange: (width: number) => void;
  onSaveHeart: () => void;
  isSaving: boolean;
}

export default function ToolsPanel({
  activeTool,
  activeColor,
  strokeWidth,
  onToolChange,
  onColorChange,
  onStrokeWidthChange,
  onSaveHeart,
  isSaving
}: ToolsPanelProps) {
  const [customColor, setCustomColor] = useState(activeColor);

  const handleToolClick = (tool: string) => {
    onToolChange(tool);
  };

  const handleColorClick = (color: string) => {
    onColorChange(color);
    setCustomColor(color);
  };

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setCustomColor(color);
    onColorChange(color);
  };

  const handleStrokeWidthChange = (values: number[]) => {
    onStrokeWidthChange(values[0]);
  };

  const handleClearCanvas = () => {
    // Clear is a special case that should be handled differently
    handleToolClick('clear');
    // Reset back to heart tool after clearing
    setTimeout(() => {
      handleToolClick('heart');
    }, 100);
  };

  return (
    <div className="tools-panel bg-white rounded-xl shadow-md p-4 lg:w-64 flex lg:flex-col gap-4">
      <div className="drawing-tools">
        <h3 className="text-sm font-poppins font-medium text-neutral-600 mb-3">Drawing Tools</h3>
        <div className="grid grid-cols-3 lg:grid-cols-2 gap-2">
          <Button
            variant="ghost"
            className={`tool-btn flex flex-col items-center justify-center p-3 rounded-lg hover:bg-primary/10 transition-colors ${activeTool === 'heart' ? 'active' : ''}`}
            onClick={() => handleToolClick('heart')}
          >
            <Heart className="h-5 w-5" />
            <span className="text-xs mt-1">Heart</span>
          </Button>
          <Button
            variant="ghost"
            className={`tool-btn flex flex-col items-center justify-center p-3 rounded-lg hover:bg-primary/10 transition-colors ${activeTool === 'pen' ? 'active' : ''}`}
            onClick={() => handleToolClick('pen')}
          >
            <PenTool className="h-5 w-5" />
            <span className="text-xs mt-1">Draw</span>
          </Button>
          <Button
            variant="ghost"
            className={`tool-btn flex flex-col items-center justify-center p-3 rounded-lg hover:bg-primary/10 transition-colors ${activeTool === 'text' ? 'active' : ''}`}
            onClick={() => handleToolClick('text')}
          >
            <Type className="h-5 w-5" />
            <span className="text-xs mt-1">Text</span>
          </Button>
          <Button
            variant="ghost"
            className={`tool-btn flex flex-col items-center justify-center p-3 rounded-lg hover:bg-primary/10 transition-colors ${activeTool === 'fill' ? 'active' : ''}`}
            onClick={() => handleToolClick('fill')}
          >
            <Paintbrush className="h-5 w-5" />
            <span className="text-xs mt-1">Fill</span>
          </Button>
          <Button
            variant="ghost"
            className={`tool-btn flex flex-col items-center justify-center p-3 rounded-lg hover:bg-primary/10 transition-colors ${activeTool === 'eraser' ? 'active' : ''}`}
            onClick={() => handleToolClick('eraser')}
          >
            <Eraser className="h-5 w-5" />
            <span className="text-xs mt-1">Eraser</span>
          </Button>
          <Button
            variant="ghost"
            className="tool-btn flex flex-col items-center justify-center p-3 rounded-lg hover:bg-primary/10 transition-colors"
            onClick={handleClearCanvas}
          >
            <Trash2 className="h-5 w-5" />
            <span className="text-xs mt-1">Clear</span>
          </Button>
        </div>
      </div>

      <div className="colors-section mt-4">
        <h3 className="text-sm font-poppins font-medium text-neutral-600 mb-3">Colors</h3>
        <div className="grid grid-cols-5 gap-2 mb-3">
          {COLORS.map((color, index) => (
            <button 
              key={index} 
              className="color-swatch w-8 h-8 rounded-full border-2" 
              style={{ 
                backgroundColor: color,
                borderColor: activeColor === color ? color : 'white'
              }} 
              onClick={() => handleColorClick(color)}
              aria-label={`Select color ${color}`}
            />
          ))}
        </div>
        <Input 
          type="color" 
          value={customColor} 
          onChange={handleCustomColorChange} 
          className="w-full h-10 rounded-lg cursor-pointer" 
        />
      </div>

      <div className="stroke-width mt-4">
        <h3 className="text-sm font-poppins font-medium text-neutral-600 mb-3">Stroke Width</h3>
        <Slider 
          min={1} 
          max={20} 
          step={1} 
          value={[strokeWidth]} 
          onValueChange={handleStrokeWidthChange} 
          className="w-full"
        />
        <div className="flex justify-between text-xs text-neutral-500 mt-1">
          <span>Thin</span>
          <span>Thick</span>
        </div>
      </div>

      <div className="mt-6 lg:mt-auto">
        <Button 
          className="w-full bg-primary text-white mb-2 hover:bg-accent transition-colors"
          onClick={onSaveHeart}
          disabled={isSaving}
        >
          <Save className="mr-2 h-4 w-4" />
          <span>Save Heart</span>
        </Button>
        <Button 
          variant="outline" 
          className="w-full text-primary border-primary hover:bg-primary/5 transition-colors"
        >
          <Download className="mr-2 h-4 w-4" />
          <span>Download</span>
        </Button>
      </div>
    </div>
  );
}
