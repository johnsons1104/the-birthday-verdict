import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gavel, Sparkles, Heart, ArrowRight, Crown } from "lucide-react";
import "./JudgeReveal.css";

const JudgeReveal = ({ onContinue }) => {
  const [vijaySelected, setVijaySelected] = useState(false);
  const [rajiniPosition, setRajiniPosition] = useState({ x: 0, y: 0 });
  const [attempts, setAttempts] = useState(0);

  const moveRajiniButton = () => {
    setRajiniPosition({
      x: Math.random() * 220 - 110,
      y: Math.random() * 100 - 50,
    });

    setAttempts((prev) => prev + 1);
  };

  return (
    <motion.section
      className="judge-reveal"
      initial={{ opacity: 0, y: 45, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.7, type: "spring" }}
    >
      <AnimatePresence mode="wait">
        {!vijaySelected ? (
          <motion.div
            key="judge-question"
            className="judge-question-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <div className="judge-tag">
              <Gavel size={17} />
              <span>RAJINI FAN vs VIJAY FAN</span>
              <Sparkles size={17} />
            </div>

            <div className="judge-main-icon">⚖️</div>

            <h1>
              Indha Case-la
              <br />
              <span>Judge Naan Dhaan!</span> 😎
            </h1>

            <p className="judge-description">
              Unakku Rajini pudikkum...
              <br />
              Enakku Thalapathy Vijay pudikkum! 🔥
              <br />
              <strong>
                Ippo sollu madam advocate...
                <br />
                Unakku yaaru pudikkum?
              </strong>
            </p>

            <div className="judge-choice-area">
              <motion.button
                type="button"
                className="rajini-choice-btn"
                animate={{
                  x: rajiniPosition.x,
                  y: rajiniPosition.y,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                }}
                onPointerEnter={moveRajiniButton}
                onClick={moveRajiniButton}
              >
                ❤️ Rajini
              </motion.button>

              <motion.button
                type="button"
                className="vijay-choice-btn"
                onClick={() => setVijaySelected(true)}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.9 }}
              >
                🔥 Thalapathy Vijay
              </motion.button>
            </div>

            <motion.p
              className="rajini-funny-message"
              key={attempts}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {attempts === 0
                ? "Rajini button-a click panni paaru! 😏"
                : attempts < 3
                  ? "Aiyayo! Rajini escape aagittaru! 😂"
                  : attempts < 6
                    ? "Rajini kooda unakku click aaga maataaru! 🤭🤣"
                    : "Thalapathy button dhaan un destiny! 🥱😎🔥"}
            </motion.p>

            <div className="judge-bottom-note">
              <Heart size={15} fill="#ff4d88" />
              Choose wisely, my dear advocate!
              <Heart size={15} fill="#ff4d88" />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="vijay-verdict"
            className="vijay-verdict-screen"
            initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <div className="vijay-verdict-tag">
              <Crown size={18} />
              <span>FINAL VERDICT</span>
              <Sparkles size={18} />
            </div>

            <div className="vijay-image-frame">
              <img
                src="/vj_sit.jpg"
                alt="Thalapathy Vijay"
                className="vijay-reveal-image"
              />

              <div className="vijay-image-overlay">
                <Crown size={25} />
                <span>THE ONE & ONLY THALAPATHY</span>
              </div>
            </div>

            <h1>
              Endraikkum
              <br />
              <span>Oru Thalapathy! 🔥</span>
            </h1>

            <p className="vijay-verdict-message">
              Rajini sir-ku respect...
              <br />
              Aana en heart-la
              <strong> Thalapathy Vijay dhaan! ❤️‍🔥</strong>
              <br />
              <br />
              <strong>
                Case mudinjiduchu!
                <br />
                Thalapathy fans win! 😂⚖️
              </strong>
            </p>

            <div className="vijay-love-footer">
              <Sparkles size={17} />
              THALAPATHY FOREVER
              <Sparkles size={17} />
            </div>

            <motion.button
              type="button"
              className="judge-continue-btn"
              onClick={onContinue}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
            >
              Open Next Case File
              <ArrowRight size={18} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default JudgeReveal;
