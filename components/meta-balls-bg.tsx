"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const MetaBalls = dynamic(() => import("@/components/meta-balls"), {
  ssr: false,
});

export default function MetaBallsBg() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-25">
      <MetaBalls
        color="#06b6d4"
        cursorBallColor="#22d3ee"
        cursorBallSize={2}
        ballCount={12}
        animationSize={30}
        enableMouseInteraction
        enableTransparency={true}
        hoverSmoothness={0.15}
        clumpFactor={1}
        speed={0.3}
      />
    </div>
  );
}
