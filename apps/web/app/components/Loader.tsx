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
      transition={{ duration: 1, ease: [0.77, 0, 0.175, 1], delay: 1.5 }}
      onAnimationComplete={() => setLoading(false)}
    >
      <h1 className="text-black text-8xl font-bold">
        Minha <br /> Empresa
      </h1>
      <motion.div
        className="fixed inset-0 flex items-center justify-center z-80"
        style={{ backgroundColor: "#f4f4f4ff" }}
        initial={{ y: "100%" }}
        animate={{ y: "0" }}
        transition={{ duration: 2, ease: [0.77, 0, 0.175, 1], delay: 0.5 }}
      ></motion.div>
    </motion.div>
  );
}
