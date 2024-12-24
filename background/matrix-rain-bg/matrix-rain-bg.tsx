"use client";
import { useEffect, useRef } from "react";

interface MatrixRainBgProps {
  speed: number;
  intensity: number;
  matrixFontSize: number;
}


export default function MatrixRainBg({ 
  speed, 
  intensity, 
  matrixFontSize = 15 
}: MatrixRainBgProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);


  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const context = canvas.getContext("2d");
      if (!context) {
        console.error("Failed to get 2D context");
        return;
      }

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
      const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const numbers = '0123456789';
      const matrixCharacters = katakana + latin + numbers;

      const columnCount = Math.floor(canvas.width / matrixFontSize);
      const columnYPositions: number[] = Array(columnCount).fill(0);
      const adjustedSpeed = speed === 1 ? 0.05 : (speed - 1) * 0.2 + 0.2;
      const adjustedIntensity = intensity / 200;

      let lastTime = 0;
      const fps = 60;
      const interval = 1000 / fps;

      const drawMatrixEffect = (currentTime: number) => {
        if (currentTime - lastTime < interval) {
          requestAnimationFrame(drawMatrixEffect);
          return;
        }

        lastTime = currentTime;

        context.fillStyle = "rgba(0, 0, 0, 0.05)";
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.fillStyle = "#0F0";
        context.font = `${matrixFontSize}px Arial`;

        for (let x = 0; x < columnYPositions.length; x++) {
          if (Math.random() < adjustedIntensity) {
            const randomChar = matrixCharacters.charAt(
              Math.floor(Math.random() * matrixCharacters.length)
            );

            const y = columnYPositions[x] * matrixFontSize;

            context.fillText(
              randomChar,
              x * matrixFontSize,
              y
            );

            if (y > canvas.height && Math.random() > 0.975) {
              columnYPositions[x] = 0;
            } else {
              columnYPositions[x] += adjustedSpeed;
            }
          }
        }
        requestAnimationFrame(drawMatrixEffect);
      };

      requestAnimationFrame(drawMatrixEffect);

      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [speed, intensity]);


  return (
    <canvas
      ref={canvasRef}
      style={{
        display: "block",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1
      }}
    />
  );
}

