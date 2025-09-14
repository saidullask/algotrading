import React from "react";
import { motion } from "framer-motion";

export default function WaveAnimation() {
  return (
    <div className="overflow-hidden mt-8 select-none pointer-events-none">
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 100"
        className="w-full h-16"
        initial={{ x: 0 }}
        animate={{ x: -360 }}
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
      >
        <path
          fill="#0f766e"
          fillOpacity="0.3"
          d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,53.3C672,53,768,75,864,80C960,85,1056,75,1152,85.3C1248,96,1344,128,1392,144L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        />
        <path
          fill="#14b8a6"
          fillOpacity="0.5"
          d="M0,32L48,48C96,64,192,96,288,90.7C384,85,480,43,576,42.7C672,43,768,85,864,101.3C960,117,1056,107,1152,96C1248,85,1344,75,1392,69.3L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        />
      </motion.svg>
    </div>
  );
}
