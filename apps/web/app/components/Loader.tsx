"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Loader() {
  const [loading, setLoading] = useState(true);

  if (!loading) return null;

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: "#f4f4f4ff" }}
      initial={{ y: 0 }}
      animate={{ y: "-100%" }}
      transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1], delay: 1 }}
      onAnimationComplete={() => setLoading(false)}
    >
      <motion.h1
        className="text-black text-5xl font-bold"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        Minha Empresa
      </motion.h1>
    </motion.div>
  );
}
