"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Loader() {
  const [loading, setLoading] = useState(true);

  if (!loading) return null;

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black z-50"
      initial={{ y: 0 }}
      animate={{ y: "-100%" }}
      transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1], delay: 1 }}
      onAnimationComplete={() => setLoading(false)}
    >
      <motion.h1
        className="text-white text-5xl font-bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Minha Empresa
      </motion.h1>
    </motion.div>
  );
}
