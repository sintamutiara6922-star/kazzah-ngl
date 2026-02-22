"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const KEYBOARD_ROWS = [
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="],
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'"],
  ["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"],
];

const KEYBOARD_ROWS_SHIFT = [
  ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+"],
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L", ":", '"'],
  ["Z", "X", "C", "V", "B", "N", "M", "<", ">", "?"],
];

interface KeyboardProps {
  onKeyPress?: (key: string) => void;
  enableSound?: boolean;
  showPreview?: boolean;
  className?: string;
}

export function Keyboard({
  onKeyPress,
  enableSound = false,
  showPreview = false,
  className,
}: KeyboardProps) {
  const [pressedKey, setPressedKey] = React.useState<string | null>(null);
  const [isShift, setIsShift] = React.useState(false);
  const [isCaps, setIsCaps] = React.useState(false);
  const [preview, setPreview] = React.useState("");
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const shouldUppercase = isShift !== isCaps;
  const rows = shouldUppercase ? KEYBOARD_ROWS_SHIFT : KEYBOARD_ROWS;

  const playSound = React.useCallback(() => {
    if (!enableSound) return;
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio();
        audioRef.current.src =
          "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdH2JkJOQi4J6cGhhaGx1fYOIjI2LiIN9d3FtaWpscHV7gISHiYqJh4WBfXl2c3Fxc3V4e36BhIaHh4eGhYN/fHl3dnV1dnd5e31/gYOEhYWFhIKAfnx7enl5eXp7fH1/gIGCg4ODg4KBgH9+fXx8fHx8fX5+f4CAgYGBgYGAgIB/fn5+fn5+fn5/f4CAgICAgICAgH9/f39/f39/f39/f3+AgICAgICAgH9/f39/f39/f39/f39/f3+AgIB/f39/f39/f39/f39/f39/f39/gICAf39/f39/f39/f39/f39/f39/f4CAgH9/fw==";
      }
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0.15;
      audioRef.current.play().catch(() => {});
    } catch {
      // ignore audio errors
    }
  }, [enableSound]);

  const handleKeyPress = React.useCallback(
    (key: string) => {
      setPressedKey(key);
      playSound();
      setTimeout(() => setPressedKey(null), 120);

      if (showPreview) {
        setPreview((prev) => prev + key);
      }

      onKeyPress?.(key);

      if (isShift && !isCaps) {
        setIsShift(false);
      }
    },
    [onKeyPress, playSound, isShift, isCaps, showPreview]
  );

  const handleSpecialKey = React.useCallback(
    (key: string) => {
      setPressedKey(key);
      playSound();
      setTimeout(() => setPressedKey(null), 120);

      switch (key) {
        case "backspace":
          if (showPreview) {
            setPreview((prev) => prev.slice(0, -1));
          }
          onKeyPress?.("Backspace");
          break;
        case "space":
          if (showPreview) {
            setPreview((prev) => prev + " ");
          }
          onKeyPress?.(" ");
          break;
        case "enter":
          if (showPreview) {
            setPreview((prev) => prev + "\n");
          }
          onKeyPress?.("Enter");
          break;
        case "tab":
          if (showPreview) {
            setPreview((prev) => prev + "  ");
          }
          onKeyPress?.("Tab");
          break;
        case "shift":
          setIsShift(!isShift);
          break;
        case "caps":
          setIsCaps(!isCaps);
          break;
      }
    },
    [onKeyPress, playSound, isShift, isCaps, showPreview]
  );

  // Listen to real keyboard for visual feedback
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      setPressedKey(key === " " ? "space" : key);
      playSound();
    };
    const handleKeyUp = () => {
      setPressedKey(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [playSound]);

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      {/* Preview area */}
      {showPreview && preview && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-neutral-300 backdrop-blur-sm"
        >
          <span className="text-cyan-400/60 text-xs font-mono">preview:</span>
          <p className="mt-1 font-mono text-white/80 break-all whitespace-pre-wrap leading-relaxed">
            {preview}
            <span className="inline-block w-0.5 h-4 bg-cyan-400 animate-pulse ml-px align-text-bottom" />
          </p>
        </motion.div>
      )}

      {/* Keyboard */}
      <div className="w-full max-w-2xl select-none rounded-2xl border border-white/[0.06] bg-white/[0.02] p-2 backdrop-blur-xl sm:p-3">
        {/* Row 1: Number row */}
        <div className="flex gap-1 mb-1 justify-center">
          {rows[0].map((key) => (
            <Key
              key={key}
              label={key}
              isPressed={pressedKey === key.toLowerCase()}
              onPress={() => handleKeyPress(key)}
            />
          ))}
          <Key
            label="Del"
            isPressed={pressedKey === "backspace"}
            onPress={() => handleSpecialKey("backspace")}
            className="flex-grow max-w-[4rem]"
            small
          />
        </div>

        {/* Row 2: QWERTY */}
        <div className="flex gap-1 mb-1 justify-center">
          <Key
            label="Tab"
            isPressed={pressedKey === "tab"}
            onPress={() => handleSpecialKey("tab")}
            className="w-10 sm:w-12"
            small
          />
          {rows[1].map((key) => (
            <Key
              key={key}
              label={key}
              isPressed={pressedKey === key.toLowerCase()}
              onPress={() => handleKeyPress(key)}
            />
          ))}
        </div>

        {/* Row 3: ASDF */}
        <div className="flex gap-1 mb-1 justify-center">
          <Key
            label={isCaps ? "CAPS" : "Caps"}
            isPressed={pressedKey === "capslock" || isCaps}
            onPress={() => handleSpecialKey("caps")}
            className="w-12 sm:w-14"
            small
            active={isCaps}
          />
          {rows[2].map((key) => (
            <Key
              key={key}
              label={key}
              isPressed={pressedKey === key.toLowerCase()}
              onPress={() => handleKeyPress(key)}
            />
          ))}
          <Key
            label="Enter"
            isPressed={pressedKey === "enter"}
            onPress={() => handleSpecialKey("enter")}
            className="flex-grow max-w-[4rem]"
            small
          />
        </div>

        {/* Row 4: ZXCV */}
        <div className="flex gap-1 mb-1 justify-center">
          <Key
            label="Shift"
            isPressed={pressedKey === "shift" || isShift}
            onPress={() => handleSpecialKey("shift")}
            className="w-14 sm:w-16"
            small
            active={isShift}
          />
          {rows[3].map((key) => (
            <Key
              key={key}
              label={key}
              isPressed={pressedKey === key.toLowerCase()}
              onPress={() => handleKeyPress(key)}
            />
          ))}
          <Key
            label="Shift"
            isPressed={pressedKey === "shift" || isShift}
            onPress={() => handleSpecialKey("shift")}
            className="flex-grow max-w-[4rem]"
            small
            active={isShift}
          />
        </div>

        {/* Row 5: Space bar */}
        <div className="flex gap-1 justify-center">
          <Key
            label="Ctrl"
            isPressed={pressedKey === "control"}
            onPress={() => {}}
            className="w-10 sm:w-12"
            small
          />
          <Key
            label="Alt"
            isPressed={pressedKey === "alt"}
            onPress={() => {}}
            className="w-10 sm:w-12"
            small
          />
          <Key
            label=""
            isPressed={pressedKey === "space" || pressedKey === " "}
            onPress={() => handleSpecialKey("space")}
            className="flex-1 max-w-xs"
          />
          <Key
            label="Alt"
            isPressed={pressedKey === "alt"}
            onPress={() => {}}
            className="w-10 sm:w-12"
            small
          />
          <Key
            label="Ctrl"
            isPressed={pressedKey === "control"}
            onPress={() => {}}
            className="w-10 sm:w-12"
            small
          />
        </div>
      </div>
    </div>
  );
}

function Key({
  label,
  isPressed,
  onPress,
  className,
  small,
  active,
}: {
  label: string;
  isPressed: boolean;
  onPress: () => void;
  className?: string;
  small?: boolean;
  active?: boolean;
}) {
  return (
    <motion.button
      type="button"
      onMouseDown={(e) => {
        e.preventDefault();
        onPress();
      }}
      animate={
        isPressed
          ? { scale: 0.92, y: 1 }
          : { scale: 1, y: 0 }
      }
      transition={{ type: "spring", stiffness: 600, damping: 30 }}
      className={cn(
        "flex h-8 w-7 items-center justify-center rounded-lg border text-xs font-medium transition-colors duration-75 sm:h-9 sm:w-8",
        isPressed || active
          ? "border-cyan-500/40 bg-cyan-500/20 text-cyan-200 shadow-sm shadow-cyan-500/20"
          : "border-white/[0.08] bg-white/[0.04] text-neutral-400 hover:bg-white/[0.08] hover:text-neutral-200",
        small && "text-[10px]",
        className
      )}
    >
      {label}
    </motion.button>
  );
}
