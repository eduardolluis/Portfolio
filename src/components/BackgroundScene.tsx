import { useEffect, useRef } from "react";
import { setupBackgroundScene } from "./background/setupBackgroundScene";

const THREE_SCRIPT_ID = "three-js";

type ThreeWindow = Window & { THREE?: unknown };

export function BackgroundScene({ activeId }: { activeId: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const activeRef = useRef(activeId);
  activeRef.current = activeId;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let cleanup: (() => void) | undefined;
    let disposed = false;
    const script = document.getElementById(THREE_SCRIPT_ID);

    const startScene = () => {
      if (disposed || cleanup) return;
      cleanup = setupBackgroundScene(canvas, () => activeRef.current);
    };

    if ((window as ThreeWindow).THREE) {
      startScene();
    } else {
      script?.addEventListener("load", startScene, { once: true });
    }

    return () => {
      disposed = true;
      script?.removeEventListener("load", startScene);
      cleanup?.();
    };
  }, []);

  return <canvas ref={canvasRef} id="gl" aria-hidden="true" />;
}
