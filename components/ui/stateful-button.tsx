"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => Promise<void> | void;
  children: React.ReactNode;
}

export function Button({
  onClick,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const [state, setState] = React.useState<"idle" | "loading" | "success">(
    "idle"
  );

  const handleClick = async () => {
    if (state !== "idle" || disabled) return;
    setState("loading");
    try {
      await onClick?.();
      setState("success");
      setTimeout(() => setState("idle"), 2000);
    } catch {
      setState("idle");
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      disabled={state !== "idle" || disabled}
      whileHover={{ scale: state === "idle" ? 1.02 : 1 }}
      whileTap={{ scale: state === "idle" ? 0.98 : 1 }}
      className={cn(
        "relative flex items-center justify-center gap-2 overflow-hidden rounded-xl px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300",
        state === "idle" &&
          "bg-gradient-to-r from-cyan-600 to-blue-600 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30",
        state === "loading" &&
          "bg-gradient-to-r from-cyan-700 to-blue-700 cursor-wait",
        state === "success" &&
          "bg-gradient-to-r from-emerald-600 to-green-600 shadow-lg shadow-emerald-500/20",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      {...props}
    >
      <AnimatePresence mode="wait">
        {state === "idle" && (
          <motion.span
            key="idle"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2"
          >
            {children}
          </motion.span>
        )}
        {state === "loading" && (
          <motion.span
            key="loading"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2"
          >
            <svg
              className="h-4 w-4 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                className="opacity-25"
              />
              <path
                d="M4 12a8 8 0 018-8"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
            Mengirim...
          </motion.span>
        )}
        {state === "success" && (
          <motion.span
            key="success"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            Terkirim!
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
