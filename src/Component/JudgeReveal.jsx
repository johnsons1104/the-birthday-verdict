
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Gavel,
  Sparkles,
  Heart,
  ArrowRight,
  Crown,
} from "lucide-react";
import "./JudgeReveal.css";

const JudgeReveal = ({ onContinue, theriAudioRef }) => {
  const [vijaySelected, setVijaySelected] = useState(false);

  const [rajiniPosition, setRajiniPosition] = useState({
    x: 0,
    y: 0,
  });

  const [attempts, setAttempts] = useState(0);

  const thalapathyAudioRef = useRef(null);

  // Stop Theri BGM
  const stopTheriAudio = () => {
    if (theriAudioRef?.current) {
      theriAudioRef.current.pause();
      theriAudioRef.current.currentTime = 0;
    }
  };

  // Stop Thalapathy BGM
  const stopThalapathyAudio = () => {
    if (thalapathyAudioRef.current) {
      thalapathyAudioRef.current.pause();
      thalapathyAudioRef.current.currentTime = 0;
    }
  };

  // Vijay select pannumbothu Theri BGM stop
  // Thalapathy BGM play
  const handleVijaySelect = async () => {
    stopTheriAudio();

    setVijaySelected(true);

    if (thalapathyAudioRef.current) {
      thalapathyAudioRef.current.currentTime = 0;
      thalapathyAudioRef.current.volume = 0.8;

      try {
        await thalapathyAudioRef.current.play();
      } catch (error) {
        console.log(
          "Thalapathy BGM playback failed:",
          error
        );
      }
    }
  };

  // Stop Thalapathy BGM and open next case
  const handleContinue = () => {
    stopThalapathyAudio();

    if (typeof onContinue === "function") {
      onContinue();
    }
  };

  // Rajini button escape animation
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
      {/* Thalapathy BGM */}
      <audio
        ref={thalapathyAudioRef}
        src="/thalaver.mp3"
        preload="auto"
        loop
      />

      <AnimatePresence mode="wait">
        {!vijaySelected ? (
          /* JUDGE QUESTION SCREEN */
          <motion.div
            key="judge-question"
            className="judge-question-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <div className="judge-tag">
              <Gavel size={17} />

              <span>
                🔥 RAJINI FAN vs THALAPATHY FAN 🔥
              </span>

              <Sparkles size={17} />
            </div>

            <div className="judge-main-icon">
              ⚖️
            </div>

            <h1>
              THE GREAT FAN WAR!
              <br />
              <span>
                Indha Case-la Judge Naan Dhaan!
              </span>{" "}
              😎
            </h1>

            <p className="judge-description">
              Attention, Madam Advocate! 👩🏻‍⚖️💗
              <br />

              Innaiku court-la oru mass-aana fan war!
              <br />
              <br />

              Enakku Superstar Rajinikanth pudikkum...
              <br />

              Unakku Thalapathy Vijay pudikkum! 🔥
              <br />
              <br />

              <strong>
                Rendu perum mass...
                <br />
                Rendu perum legends...
                <br />
                Aana indha court-la winner yaaru? 😂
                <br />
                <br />

                Ippo sollu, madam advocate...
                <br />
                Un heart-oda favourite hero yaaru? 👀
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
                ❤️ SUPERSTAR RAJINI
              </motion.button>

              <motion.button
                type="button"
                className="vijay-choice-btn"
                onClick={handleVijaySelect}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.9 }}
              >
                🔥 THALAPATHY VIJAY
              </motion.button>
            </div>

            <motion.p
              className="rajini-funny-message"
              key={attempts}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {attempts === 0
                ? "Rajini button-a click panni paaru, madam! 😏"
                : attempts < 3
                  ? "Aiyayo! Rajini escape aagittaru! 😂"
                  : attempts < 6
                    ? "Rajini kooda unakku click aaga maataaru! 🤭🤣"
                    : "Thalapathy button dhaan un destiny! 🥱😎🔥"}
            </motion.p>

            <div className="judge-bottom-note">
              <Heart size={15} fill="#ff4d88" />

              Choose wisely, my dear advocate...

              <Heart size={15} fill="#ff4d88" />
            </div>

            <p className="judge-final-tease">
              ⚖️ Judge is watching you!
              <br />

              <span>
                Thalapathy-ku vote pannina special
                birthday bonus irukku! 🎂💗
              </span>
            </p>
          </motion.div>
        ) : (
          /* VIJAY FINAL VERDICT SCREEN */
          <motion.div
            key="vijay-verdict"
            className="vijay-verdict-screen"
            initial={{
              opacity: 0,
              scale: 0.5,
              rotateY: 90,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotateY: 0,
            }}
            transition={{
              duration: 0.8,
              type: "spring",
            }}
          >
            <div className="vijay-verdict-tag">
              <Crown size={18} />

              <span>
                OFFICIAL FAN GIRL VERDICT
              </span>

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

                <span>
                  THE ONE &amp; ONLY THALAPATHY 🔥
                </span>
              </div>
            </div>

            <h1>
              Endraikkum
              <br />

              <span>
                Oru Thalapathy! 😎🔥
              </span>
            </h1>

            <p className="vijay-verdict-message">
              Rajini sir-ku respect...
              <br />

              Avar style-ku thani level! 😎
              <br />
              <br />

              <strong>
                Aana Bettina madam-oda heart-la...
                <br />

                Thalapathy Vijay dhaan ippo permanent! ❤️‍🔥
              </strong>

              <br />
              <br />

              Innaiku varaikkum Rajini fan girl-ah irundha...
              <br />

              <strong>
                Ippo officially Thalapathy fan girl aagitta! 😂🔥
              </strong>

              <br />
              <br />

              Enna advocate madam...
              <br />

              <strong>
                Idhu fan change-ah?
                Illa love effect-ah? 🤭❤️
              </strong>

              <br />
              <br />

              <strong>
                FAN GIRL PROMOTION APPROVED! 💥
              </strong>

              <br />

              Rajini Fan Girl → Thalapathy Fan Girl

              <br />
              <br />

              <strong>
                Case mudinjiduchu!
                <br />

                Appeal panna chance ZERO! 😂⚖️
              </strong>
            </p>

            <div className="vijay-love-footer">

              😍🔥 FINALLY, MY GIRL. MY THALAPATHY FAN GIRL. 🫶🏻❤️
            </div>

            <motion.button
              type="button"
              className="judge-continue-btn"
              onClick={handleContinue}
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
