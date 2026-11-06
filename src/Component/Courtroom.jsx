import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Scale,
  Gavel,
  ShieldCheck,
  Fingerprint,
  Star,
  Heart,
  ArrowLeft,
  Play,
  CheckCircle,
  Sparkles,
  X,
} from "lucide-react";
import "./Courtroom.css";

const questions = [
  {
    question: "What makes a person truly special?",
    subtitle: "Your Honour, choose the most valuable quality.",
    options: [
      { label: "A Beautiful Heart", emoji: "💗" },
      { label: "Expensive Gifts", emoji: "🎁" },
      { label: "Perfect Appearance", emoji: "✨" },
    ],
  },
  {
    question: "What is the most valuable thing in a bond?",
    subtitle: "The court is waiting for your answer.",
    options: [
      { label: "Trust & Understanding", emoji: "💖" },
      { label: "Only Fun Moments", emoji: "🎉" },
      { label: "Being Right Always", emoji: "😎" },
    ],
  },
  {
    question: "What is your final birthday verdict?",
    subtitle: "Advocate, deliver your final judgment!",
    options: [
      { label: "Forever Special Bond", emoji: "💌" },
      { label: "Case Dismissed", emoji: "😂" },
      { label: "Need More Evidence", emoji: "🔍" },
    ],
  },
];

const celebrate = () => {
  confetti({
    particleCount: 180,
    spread: 100,
    origin: { y: 0.6 },
    colors: ["#ff4d88", "#ffd700", "#ffffff", "#c084fc"],
  });
  confetti({ particleCount: 80, spread: 120, origin: { x: 0.2, y: 0.5 } });
  confetti({ particleCount: 80, spread: 120, origin: { x: 0.8, y: 0.5 } });
};

const Courtroom = ({ onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showVerdict, setShowVerdict] = useState(false);

  const handleAnswer = (option) => {
    setAnswers((prev) => {
      const updated = [...prev];
      updated[currentQuestion] = option;
      return updated;
    });

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setShowVerdict(true);
      celebrate();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) setCurrentQuestion((prev) => prev - 1);
  };

  const handleReplay = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowVerdict(false);
  };

  return (
    <motion.div
      className="courtroom-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="courtroom-game-container"
        initial={{ opacity: 0, scale: 0.7, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.7, y: 50 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      >
        {/* HEADER */}
        <div className="courtroom-game-header">
          <div className="courtroom-game-brand">
            <Scale size={26} />
            <div>
              <span>LOVE & FRIENDSHIP COURT</span>
              <h2>Birthday Courtroom</h2>
            </div>
          </div>

          <button
            type="button"
            className="courtroom-close-button"
            onClick={onClose}
            aria-label="Close courtroom"
          >
            <X size={22} />
          </button>
        </div>

        <div className="courtroom-case-label">
          <Fingerprint size={15} />
          CASE NO. 001/2026
        </div>

        <AnimatePresence mode="wait">
          {!showVerdict ? (
            <motion.div
              key={currentQuestion}
              className="courtroom-question-area"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              <div className="courtroom-progress">
                <span>
                  QUESTION {currentQuestion + 1} OF {questions.length}
                </span>

                <div className="courtroom-progress-track">
                  <motion.div
                    className="courtroom-progress-fill"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              <motion.div
                className="courtroom-gavel-icon"
                animate={{ rotate: [0, -8, 8, 0], scale: [1, 1.08, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ⚖️
              </motion.div>

              <div className="courtroom-question-tag">
                <Sparkles size={16} />
                CROSS EXAMINATION
              </div>

              <h2>{questions[currentQuestion].question}</h2>

              <p className="courtroom-question-subtitle">
                {questions[currentQuestion].subtitle}
              </p>

              <div className="courtroom-options">
                {questions[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={option.label}
                    type="button"
                    className="courtroom-option-button"
                    onClick={() => handleAnswer(option)}
                    whileHover={{ scale: 1.03, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="courtroom-option-number">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="courtroom-option-emoji">
                      {option.emoji}
                    </span>
                    <span className="courtroom-option-text">
                      {option.label}
                    </span>
                    <ArrowLeft size={17} className="courtroom-option-arrow" />
                  </motion.button>
                ))}
              </div>

              {currentQuestion > 0 && (
                <motion.button
                  type="button"
                  className="courtroom-back-button"
                  onClick={handlePrevious}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowLeft size={16} />
                  Previous Question
                </motion.button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="verdict"
              className="courtroom-verdict"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 12 }}
            >
              <motion.div
                className="courtroom-verdict-stamp"
                initial={{ scale: 3, rotate: -30, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                APPROVED
              </motion.div>

              <motion.div
                className="courtroom-verdict-icon"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                👩‍⚖️
              </motion.div>

              <div className="courtroom-verdict-tag">
                <Gavel size={16} />
                FINAL JUDGMENT
              </div>

              <h2>
                Case <span>Closed!</span>
              </h2>

              <p>
                The court has officially declared you the most special advocate
                of all time.
              </p>

              <motion.div
                className="courtroom-verdict-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Star size={28} fill="#ffd700" color="#ffd700" />

                <h3>VERDICT: FOREVER SPECIAL 💖</h3>

                <p>
                  Your birthday is a reminder that the world became a little
                  more beautiful because you were born.
                </p>

                <div className="courtroom-verdict-footer">
                  Signed by the Court of Love
                  <br />
                  Case No. 001/2026
                </div>
              </motion.div>

              <div className="courtroom-answer-summary">
                <h3>Your Court Decisions</h3>

                {answers.map((answer, index) => (
                  <div className="courtroom-answer-item" key={index}>
                    <CheckCircle size={16} />
                    <span>
                      Question {index + 1}: {answer.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="courtroom-verdict-buttons">
                <motion.button
                  type="button"
                  className="courtroom-replay-button"
                  onClick={handleReplay}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play size={17} />
                  Play Again
                </motion.button>

                <motion.button
                  type="button"
                  className="courtroom-finish-button"
                  onClick={onClose}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Heart size={17} fill="currentColor" />
                  Back to Birthday Surprise
                </motion.button>
              </div>

              <div className="courtroom-final-message">
                Made with love, just for you 💗
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FOOTER */}
        <div className="courtroom-game-footer">
          <span>
            <ShieldCheck size={14} />
            CONFIDENTIAL LOVE CASE
          </span>
          <span>© 2026 LOVE COURT</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Courtroom;
