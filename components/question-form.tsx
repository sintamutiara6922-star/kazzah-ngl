"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconBrandWhatsapp,
  IconBrandTelegram,
  IconUser,
  IconUserOff,
  IconSend,
  IconCheck,
  IconKeyboard,
  IconKeyboardOff,
} from "@tabler/icons-react";
import { Button as StatefulButton } from "@/components/ui/stateful-button";
import { Keyboard } from "@/components/ui/keyboard";

export default function QuestionForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [platform, setPlatform] = useState<"whatsapp" | "telegram">("whatsapp");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeField, setActiveField] = useState<"name" | "message" | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.matchMedia("(max-width: 768px)").matches ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0;
      setIsMobile(mobile);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleKeyPress = useCallback(
    (key: string) => {
      if (!activeField) return;

      const inputEl =
        activeField === "name" ? nameInputRef.current : messageInputRef.current;
      if (!inputEl) return;

      const start = inputEl.selectionStart ?? 0;
      const end = inputEl.selectionEnd ?? 0;
      const setter = activeField === "name" ? setName : setMessage;
      const currentVal = activeField === "name" ? name : message;

      if (key === "Backspace") {
        if (start !== end) {
          const newVal = currentVal.slice(0, start) + currentVal.slice(end);
          setter(newVal);
          requestAnimationFrame(() => {
            inputEl.setSelectionRange(start, start);
          });
        } else if (start > 0) {
          const newVal = currentVal.slice(0, start - 1) + currentVal.slice(start);
          setter(newVal);
          requestAnimationFrame(() => {
            inputEl.setSelectionRange(start - 1, start - 1);
          });
        }
      } else if (key === "Enter") {
        if (activeField === "message") {
          const newVal = currentVal.slice(0, start) + "\n" + currentVal.slice(end);
          setter(newVal);
          requestAnimationFrame(() => {
            inputEl.setSelectionRange(start + 1, start + 1);
          });
        }
      } else if (key === "Tab") {
        // Switch focus between fields
        if (activeField === "name") {
          setActiveField("message");
          messageInputRef.current?.focus();
        } else {
          if (!isAnonymous) {
            setActiveField("name");
            nameInputRef.current?.focus();
          }
        }
      } else if (key.length === 1) {
        const newVal = currentVal.slice(0, start) + key + currentVal.slice(end);
        setter(newVal);
        requestAnimationFrame(() => {
          inputEl.setSelectionRange(start + 1, start + 1);
        });
      }

      // Keep focus on the input
      inputEl.focus();
    },
    [activeField, name, message, isAnonymous]
  );

  const handleSubmit = async () => {
    setError("");
    setSuccess(false);

    if (!isAnonymous && !name.trim()) {
      setError("Nama pengirim tidak boleh kosong");
      throw new Error("Nama pengirim tidak boleh kosong");
    }
    if (message.length < 5) {
      setError("Pesan minimal 5 karakter");
      throw new Error("Pesan minimal 5 karakter");
    }

    const res = await fetch("/api/submit-question", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: isAnonymous ? "Anonim" : name.trim(),
        message: message.trim(),
        platform,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      const errMsg = data.error || "Gagal mengirim pertanyaan";
      setError(errMsg);
      throw new Error(errMsg);
    }

    setSuccess(true);
    setName("");
    setMessage("");
    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <section className="relative py-24 px-4" id="kirim">
      <div className="max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 text-balance tracking-tight">
            Kirim Pertanyaan
          </h2>
          <p className="text-neutral-500 text-base leading-relaxed">
            Tulis pertanyaan atau pesan rahasiamu. Identitasmu aman bersama
            kami.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <form
            ref={formRef}
            onSubmit={(e) => e.preventDefault()}
            className="rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] p-6 sm:p-8 shadow-2xl shadow-cyan-500/5"
          >
            <div className="flex flex-col gap-6">
              {/* Anonymous Toggle + Keyboard Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAnonymous(!isAnonymous);
                      if (!isAnonymous) setName("");
                    }}
                    className={`
                      relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium
                      transition-all duration-300 border
                      ${
                        isAnonymous
                          ? "bg-cyan-500/15 border-cyan-500/30 text-cyan-300"
                          : "bg-white/[0.04] border-white/[0.08] text-neutral-400 hover:border-white/20"
                      }
                    `}
                  >
                    {isAnonymous ? (
                      <IconUserOff className="w-4 h-4" />
                    ) : (
                      <IconUser className="w-4 h-4" />
                    )}
                    {isAnonymous ? "Anonim" : "Pakai Nama"}
                  </button>
                  <span className="text-xs text-neutral-600 hidden sm:inline">
                    {isAnonymous
                      ? "Identitasmu tersembunyi"
                      : "Nama akan ditampilkan"}
                  </span>
                </div>

                {/* Keyboard toggle - only visible on desktop */}
                {!isMobile && (
                  <button
                    type="button"
                    onClick={() => setShowKeyboard(!showKeyboard)}
                    className={`
                      flex items-center gap-1.5 rounded-xl px-3 py-2.5 text-xs font-medium
                      transition-all duration-300 border
                      ${
                        showKeyboard
                          ? "bg-cyan-500/15 border-cyan-500/30 text-cyan-300"
                          : "bg-white/[0.04] border-white/[0.08] text-neutral-500 hover:border-white/20 hover:text-neutral-300"
                      }
                    `}
                  >
                    {showKeyboard ? (
                      <IconKeyboardOff className="w-3.5 h-3.5" />
                    ) : (
                      <IconKeyboard className="w-3.5 h-3.5" />
                    )}
                    {showKeyboard ? "Sembunyikan" : "Keyboard"}
                  </button>
                )}
              </div>

              {/* Name Field (visible when not anonymous) */}
              <AnimatePresence>
                {!isAnonymous && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: 0 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-neutral-300 mb-2"
                    >
                      Nama Pengirim
                    </label>
                    <input
                      id="name"
                      ref={nameInputRef}
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onFocus={() => setActiveField("name")}
                      placeholder="Masukkan namamu..."
                      className={`w-full px-4 py-3 rounded-xl bg-black/40 border text-white placeholder:text-neutral-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all text-sm ${
                        activeField === "name" && showKeyboard
                          ? "border-cyan-500/40"
                          : "border-white/[0.08]"
                      }`}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-neutral-300 mb-2"
                >
                  Pesan / Pertanyaan
                </label>
                <textarea
                  id="message"
                  ref={messageInputRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onFocus={() => setActiveField("message")}
                  placeholder="Tulis pertanyaan anonim kamu di sini..."
                  rows={4}
                  className={`w-full px-4 py-3 rounded-xl bg-black/40 border text-white placeholder:text-neutral-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all text-sm resize-none leading-relaxed ${
                    activeField === "message" && showKeyboard
                      ? "border-cyan-500/40"
                      : "border-white/[0.08]"
                  }`}
                />
                <div className="mt-1.5 text-right">
                  <span
                    className={`text-xs ${
                      message.length >= 5
                        ? "text-cyan-500/60"
                        : "text-neutral-600"
                    }`}
                  >
                    {message.length} / 500
                  </span>
                </div>
              </div>

              {/* Platform Selector */}
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-3">
                  Kirim via Platform
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPlatform("whatsapp")}
                    className={`
                      flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium
                      transition-all duration-300 border
                      ${
                        platform === "whatsapp"
                          ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300 shadow-lg shadow-emerald-500/10"
                          : "bg-white/[0.03] border-white/[0.08] text-neutral-500 hover:border-white/20 hover:text-neutral-300"
                      }
                    `}
                  >
                    <IconBrandWhatsapp className="w-5 h-5" />
                    WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={() => setPlatform("telegram")}
                    className={`
                      flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium
                      transition-all duration-300 border
                      ${
                        platform === "telegram"
                          ? "bg-sky-500/15 border-sky-500/40 text-sky-300 shadow-lg shadow-sky-500/10"
                          : "bg-white/[0.03] border-white/[0.08] text-neutral-500 hover:border-white/20 hover:text-neutral-300"
                      }
                    `}
                  >
                    <IconBrandTelegram className="w-5 h-5" />
                    Telegram
                  </button>
                </div>
              </div>

              {/* Error / Success */}
              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2.5"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="flex items-center gap-2 text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-2.5"
                  >
                    <IconCheck className="w-4 h-4" />
                    Pertanyaan berhasil terkirim!
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit with StatefulButton */}
              <StatefulButton onClick={handleSubmit} className="w-full">
                <IconSend className="w-4 h-4" />
                Kirim Pertanyaan
              </StatefulButton>
            </div>
          </form>
        </motion.div>

        {/* Virtual Keyboard - desktop only */}
        {!isMobile && (
          <AnimatePresence>
            {showKeyboard && (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.95 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="mt-6"
              >
                <div className="text-center mb-3">
                  <span className="text-xs text-neutral-600">
                    {activeField === "name"
                      ? "Mengetik di: Nama Pengirim"
                      : activeField === "message"
                      ? "Mengetik di: Pesan / Pertanyaan"
                      : "Klik field di atas untuk mulai mengetik"}
                  </span>
                </div>
                <Keyboard
                  onKeyPress={handleKeyPress}
                  enableSound
                  showPreview
                />
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
