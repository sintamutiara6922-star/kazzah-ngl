"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconShieldCheck, IconLoader2 } from "@tabler/icons-react";

export default function TurnstileVerification() {
  const [showVerification, setShowVerification] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    // Check if user has been verified in this session
    const verified = sessionStorage.getItem("turnstile-verified");
    if (verified === "true") {
      setIsVerified(true);
      return;
    }

    // Show verification modal after a short delay
    const timer = setTimeout(() => {
      setShowVerification(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Load Cloudflare Turnstile script
    if (showVerification && !isVerified) {
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      // Listen for verification success
      const handleVerified = () => {
        handleVerificationSuccess();
      };
      window.addEventListener("turnstile-verified", handleVerified);

      // Cleanup
      return () => {
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
        window.removeEventListener("turnstile-verified", handleVerified);
      };
    }
  }, [showVerification, isVerified]);

  const handleVerificationSuccess = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerified(true);
      sessionStorage.setItem("turnstile-verified", "true");
      setTimeout(() => {
        setShowVerification(false);
      }, 2000);
    }, 1500);
  };

  // Don't show anything if already verified
  if (isVerified && !showVerification) {
    return null;
  }

  return (
    <AnimatePresence>
      {showVerification && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-xl"
        >
          {/* Background grid effect */}
          <div className="absolute inset-0 [background-size:40px_40px] [background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]" />
          <div className="pointer-events-none absolute inset-0 bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-md mx-4"
          >
            <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8 shadow-2xl shadow-cyan-500/5 backdrop-blur-xl">
              <div className="mb-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/20">
                  <IconShieldCheck className="h-8 w-8 text-cyan-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Verifikasi Keamanan
                </h2>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  Kami perlu memverifikasi bahwa kamu bukan robot untuk
                  melindungi platform ini dari spam dan penyalahgunaan.
                </p>
              </div>

              {!isVerified ? (
                <div className="flex flex-col items-center gap-4">
                  {/* Cloudflare Turnstile widget */}
                  <div
                    className="cf-turnstile"
                    data-sitekey={
                      process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
                      "1x00000000000000000000AA"
                    }
                    data-callback="onTurnstileSuccess"
                    data-theme="dark"
                    data-size="normal"
                  />

                  {isVerifying && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-2 text-sm text-cyan-400"
                    >
                      <IconLoader2 className="h-4 w-4 animate-spin" />
                      Memverifikasi...
                    </motion.div>
                  )}

                  <p className="text-xs text-neutral-600 text-center">
                    Dilindungi oleh Cloudflare Turnstile
                  </p>
                </div>
              ) : (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center gap-3 py-4"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/30">
                    <IconShieldCheck className="h-6 w-6 text-emerald-400" />
                  </div>
                  <p className="text-sm font-medium text-emerald-400">
                    Verifikasi Berhasil!
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Define global callback for Turnstile
if (typeof window !== "undefined") {
  (window as any).onTurnstileSuccess = function () {
    // Dispatch custom event to notify the component
    window.dispatchEvent(new Event("turnstile-verified"));
  };
}
