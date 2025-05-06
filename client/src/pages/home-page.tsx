import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import ToolsPanel from "@/components/tools-panel";
import CanvasArea from "@/components/canvas-area";
import WelcomeScreen from "@/components/welcome-screen";

export default function HomePage() {
  const { user } = useAuth();
  const [activeTool, setActiveTool] = useState<string>("heart");
  const [activeColor, setActiveColor] = useState<string>("#FF3366");
  const [strokeWidth, setStrokeWidth] = useState<number>(3);
  const [canvasData, setCanvasData] = useState<string | null>(null);

  // Fetch saved hearts
  const {
    data: hearts,
    isLoading: heartsLoading,
  } = useQuery({
    queryKey: ["/api/hearts"],
  });

  // Save heart mutation
  const saveHeartMutation = useMutation({
    mutationFn: async (data: { image: string; name?: string }) => {
      const res = await apiRequest("POST", "/api/hearts", data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/hearts"] });
    },
  });

  const handleToolChange = (tool: string) => {
    setActiveTool(tool);
  };

  const handleColorChange = (color: string) => {
    setActiveColor(color);
  };

  const handleStrokeWidthChange = (width: number) => {
    setStrokeWidth(width);
  };

  const handleSaveHeart = async (imageData: string) => {
    saveHeartMutation.mutate({ image: imageData });
  };

  const handleCanvasDataChange = (data: string | null) => {
    setCanvasData(data);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <ToolsPanel 
          activeTool={activeTool}
          activeColor={activeColor}
          strokeWidth={strokeWidth}
          onToolChange={handleToolChange}
          onColorChange={handleColorChange}
          onStrokeWidthChange={handleStrokeWidthChange}
          onSaveHeart={() => {
            if (canvasData) handleSaveHeart(canvasData);
          }}
          isSaving={saveHeartMutation.isPending}
        />
        <CanvasArea 
          activeTool={activeTool}
          activeColor={activeColor}
          strokeWidth={strokeWidth}
          onCanvasDataChange={handleCanvasDataChange}
        />
      </div>
    </div>
  );
}
