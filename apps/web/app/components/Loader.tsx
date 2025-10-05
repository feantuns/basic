"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const easings: Record<string, any[]> = {
  power: [0.83, 0, 0.17, 1], // bad
  luxury: [0.65, 0, 0.35, 1], // good
  sharp: [0.85, 0, 0.15, 1],
  expo: [0.9, 0.1, 0.1, 0.9], // bad
  soft: [0.77, 0, 0.175, 1],
};

export default function Loader() {
  const [loading, setLoading] = useState(true);

  if (!loading) return null;

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: "#f4f4f4ff" }}
      initial={{ y: 0 }}
      animate={{ y: "-100%" }}
      transition={{ duration: 1, ease: easings.luxury, delay: 1.3 }}
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
        transition={{ duration: 2.2, ease: easings.luxury, delay: 0.3 }}
      ></motion.div>
    </motion.div>
  );
}
