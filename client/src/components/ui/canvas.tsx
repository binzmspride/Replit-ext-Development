import React, { useRef, useEffect, useState } from "react";
import { drawHeart, adjustColor } from "@/lib/draw-utils";

interface CanvasProps {
  width: number;
  height: number;
  activeTool: string;
  activeColor: string;
  strokeWidth: number;
  onDataChange?: (data: string | null) => void;
}

export default function Canvas({
  width,
  height,
  activeTool,
  activeColor,
  strokeWidth,
  onDataChange
}: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [hasContent, setHasContent] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Setup canvas
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  // Handle canvas clearing
  useEffect(() => {
    if (activeTool === "clear") {
      clearCanvas();
    }
  }, [activeTool]);

  // Get canvas context (helper)
  const getContext = () => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    return canvas.getContext("2d");
  };

  // Clear the canvas
  const clearCanvas = () => {
    const ctx = getContext();
    if (!ctx) return;
    
    ctx.clearRect(0, 0, width, height);
    setHasContent(false);
    if (onDataChange) onDataChange(null);
  };

  // Start drawing
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const ctx = getContext();
    if (!ctx) return;

    const { offsetX, offsetY } = getCoordinates(e);
    setStartX(offsetX);
    setStartY(offsetY);
    setIsDrawing(true);

    // For freehand drawing, start a new path
    if (activeTool === "pen" || activeTool === "eraser") {
      ctx.beginPath();
      ctx.moveTo(offsetX, offsetY);
    }
  };

  // Draw while moving
  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const ctx = getContext();
    if (!ctx) return;

    const { offsetX, offsetY } = getCoordinates(e);

    ctx.strokeStyle = activeTool === "eraser" ? "#F8F9FA" : activeColor;
    ctx.lineWidth = strokeWidth;

    if (activeTool === "heart") {
      // For heart tool, preview as user drags
      const width = offsetX - startX;
      const height = offsetY - startY;
      
      // Clear the canvas to redraw
      ctx.clearRect(0, 0, width, height);
      
      // Draw heart based on drag size
      drawHeart(ctx, startX, startY, Math.abs(width), Math.abs(height), activeColor);
    } else if (activeTool === "pen" || activeTool === "eraser") {
      // For pen/eraser, draw line as user moves
      ctx.lineTo(offsetX, offsetY);
      ctx.stroke();
    }

    setHasContent(true);
    updateCanvasData();
  };

  // Stop drawing
  const stopDrawing = () => {
    if (isDrawing) {
      updateCanvasData();
    }
    setIsDrawing(false);
  };

  // Update canvas data for external use
  const updateCanvasData = () => {
    if (!canvasRef.current || !onDataChange) return;
    const dataUrl = canvasRef.current.toDataURL("image/png");
    onDataChange(dataUrl);
  };

  // Helper to get coordinates for both mouse and touch events
  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { offsetX: 0, offsetY: 0 };

    let offsetX, offsetY;
    
    if ('touches' in e) {
      // Touch event
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      offsetX = touch.clientX - rect.left;
      offsetY = touch.clientY - rect.top;
    } else {
      // Mouse event
      offsetX = e.nativeEvent.offsetX;
      offsetY = e.nativeEvent.offsetY;
    }
    
    return { offsetX, offsetY };
  };

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="absolute top-0 left-0 w-full h-full cursor-crosshair"
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseOut={stopDrawing}
      onTouchStart={startDrawing}
      onTouchMove={draw}
      onTouchEnd={stopDrawing}
    />
  );
}
