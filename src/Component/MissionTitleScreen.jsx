import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Play, Sparkles } from "lucide-react";
import "./MissionTitleScreen.css";

const MissionTitleScreen = ({ onStartMission }) => {
  return (
    <motion.section
      className="mission-screen"
      initial={{ opacity: 0, scale: 0.75, rotateY: 25 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      exit={{ opacity: 0, scale: 0.7, y: -40 }}
      transition={{ duration: 0.8, type: "spring" }}
    >
      <motion.div
        className="mission-icon"
        animate={{
          scale: [1, 1.12, 1],
          rotate: [0, -8, 8, 0],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        🕶️
      </motion.div>

      <div className="mission-tag">
        <ShieldCheck size={16} />
        CLASSIFIED MISSION UNLOCKED
      </div>

      <h2 className="mission-case-number">
        CASE <span>NO.143</span>
      </h2>

      <div className="mission-title-art">
        <div className="mission-stars">✦ ✧ ★ ✧ ✦</div>

        <h1>SUPERSTAR</h1>

        <h2>SECRET MISSION</h2>

        <div className="mission-subtitle">⚡ THE THALAIVAR SURPRISE ⚡</div>
      </div>

      <p className="mission-description">
        Detective, your access has been granted.
        <br />
        One final mission awaits you...
      </p>

      <div className="mission-info-card">
        <p>
          🎯 <strong>MISSION:</strong> Unlock the Thalaivar Surprise
        </p>

        <p>
          ❤️ <strong>LEVEL:</strong> 143 — Special Edition
        </p>

        <p>
          🔓 <strong>STATUS:</strong> Ready to launch
        </p>
      </div>

      <motion.button
        type="button"
        className="mission-start-button"
        onClick={onStartMission}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
      >
        <Play size={20} fill="currentColor" />
        START MISSION
        <Sparkles size={18} />
      </motion.button>

      <p className="mission-footer">
        PRESS START TO REVEAL YOUR SECRET EVIDENCE 💗
      </p>
    </motion.section>
  );
};

export default MissionTitleScreen;
