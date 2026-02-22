"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { censorMessage } from "@/lib/moderation";

type Question = {
  id: string;
  name: string;
  message: string;
  createdAt: string;
};

export default function QuestionTable() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchQuestions = useCallback(async () => {
    try {
      const res = await fetch("/api/get-questions");
      if (res.ok) {
        const data = await res.json();
        setQuestions(data.questions || []);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuestions();
    const interval = setInterval(fetchQuestions, 30000);
    return () => clearInterval(interval);
  }, [fetchQuestions]);

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleString("id-ID", {
      timeZone: "Asia/Jakarta",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <section className="relative py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight text-balance">
            Pertanyaan Masuk
          </h2>
          <p className="text-neutral-500 text-base leading-relaxed">
            Daftar pertanyaan yang sudah dikirimkan
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
              <p className="text-neutral-500 text-sm mt-4">
                Memuat pertanyaan...
              </p>
            </div>
          ) : questions.length === 0 ? (
            <div className="text-center py-16 rounded-3xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm">
              <svg
                className="w-16 h-16 mx-auto text-neutral-700 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              <p className="text-neutral-500 text-sm">
                Belum ada pertanyaan masuk
              </p>
              <p className="text-neutral-600 text-xs mt-1">
                Jadilah yang pertama mengirim pertanyaan!
              </p>
            </div>
          ) : (
            <div className="rounded-3xl border border-white/[0.06] overflow-hidden bg-white/[0.02] backdrop-blur-sm">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="border-b border-white/[0.06]">
                      <th className="px-5 py-4 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        No
                      </th>
                      <th className="px-5 py-4 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Penerima
                      </th>
                      <th className="px-5 py-4 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Pesan
                      </th>
                      <th className="px-5 py-4 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Pengirim
                      </th>
                      <th className="px-5 py-4 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Waktu
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {questions.map((q, idx) => (
                      <tr
                        key={q.id}
                        className="border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors duration-200"
                      >
                        <td className="px-5 py-4 text-sm text-neutral-500">
                          {idx + 1}
                        </td>
                        <td className="px-5 py-4 text-sm text-white font-medium">
                          {q.name}
                        </td>
                        <td className="px-5 py-4 text-sm text-neutral-300 max-w-[250px] truncate">
                          {censorMessage(q.message)}
                        </td>
                        <td className="px-5 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-cyan-500/15 text-cyan-300 uppercase tracking-wider border border-cyan-500/20">
                            Anonim
                          </span>
                        </td>
                        <td className="px-5 py-4 text-xs text-neutral-500">
                          {formatDate(q.createdAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
