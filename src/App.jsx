/* =====================================================
   BIRTHDAY SURPRISE — FLOW

   1. question  → "Do you like me?"  (NO button runs away)
   2. success   → funny court text + Love Letter popup
   3. password  → enter CASE143
   4. decrypt   → 5 second loading screen
   5. reveal    → photo + Theri BGM starts here, then scrolling:
                  gallery → birthday card → letter → music →
                  courtroom game → Rajini vs Vijay →
                  Secret Case File → final message
===================================================== */

import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";
import {
  LockKeyhole,
  Scale,
  Heart,
  ShieldCheck,
  Fingerprint,
  ArrowLeft,
  Sparkles,
  Music,
  Play,
  Pause,
  CheckCircle,
  FolderLock,
  Gavel,
  Mail,
  Star,
} from "lucide-react";
import "./App.css";
import Courtroom from "./Component/Courtroom";
import JudgeReveal from "./Component/JudgeReveal";
import SecretCaseFile from "./Component/SecretCaseFile";
import LoveLetterModal from "./Component/Lovelettermodal";

/* ---------------- SETTINGS ---------------- */

const SECRET_PASSWORD = "CASE143";
const DECRYPT_DURATION = 5000;
const HEART_ICONS = ["💗", "💕", "💖", "✨", "💘"];
const CONFETTI_COLORS = ["#ff4d88", "#ffd700", "#ffffff", "#c084fc"];

const photoCards = [
  {
    image: "/polar_ice.jpeg",
    title: "The Beginning of Something Beautiful",
    description:
      "Some memories never fade, some moments stay forever, and some people quietly become a beautiful part of our hearts. You are one of those memories I will always cherish. 💗",
  },
  {
    image: "/pet_zudio.jpeg",
    title: "You Mean More Than Words",
    description:
      "I may not always express what I feel, but your presence means more than you could ever imagine. Even the smallest moments with you become memories my heart never wants to forget. ✨",
  },
  {
    image: "/pet_chruch.jpeg",
    title: "A Bond My Heart Will Always Treasure",
    description:
      "No matter where life takes us, a special place in my heart will always belong to you. Some connections are too beautiful to explain, too precious to forget, and too deep to put into words. 💌",
  },
];

const noMessages = [
  "Objection! Your Honour, ivanga poi solraanga! 😂",
  "Un heart YES solludhu, nee mattum NO solriya? 😏❤️",
  "NO sollura courage irukku... YES sollura courage illaya? 🤣",
  "Love court-ku repeated visit panra madam! ⚖️",
  "NO button-ku ivlo effort... YES sollirundha 2 seconds-la mudinjirukkum! 😂❤️",
];

/* Generated once, so positions don't change on every re-render */
const stars = Array.from({ length: 35 }, () => ({
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  duration: 2 + Math.random() * 3,
  delay: Math.random() * 2,
}));

const hearts = Array.from({ length: 15 }, (_, index) => ({
  x: `${Math.random() * 90}vw`,
  duration: 8 + Math.random() * 8,
  delay: Math.random() * 5,
  icon: HEART_ICONS[index % HEART_ICONS.length],
}));

const celebrate = () => {
  confetti({
    particleCount: 180,
    spread: 100,
    origin: { y: 0.6 },
    colors: CONFETTI_COLORS,
  });
  confetti({ particleCount: 80, spread: 120, origin: { x: 0.2, y: 0.5 } });
  confetti({ particleCount: 80, spread: 120, origin: { x: 0.8, y: 0.5 } });
};

/* ---------------- SMALL COMPONENTS ---------------- */

const SecretSection = ({ children }) => (
  <motion.section
    className="secret-file-section"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    {children}
  </motion.section>
);

/* Falling stars + floating hearts behind everything */
const Backdrop = () => (
  <>
    <div className="stars-container">
      {stars.map((star, index) => (
        <motion.span
          key={index}
          className="background-star"
          style={{ left: star.left, top: star.top }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.7, 1.3, 0.7] }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
          }}
        >
          ✦
        </motion.span>
      ))}
    </div>

    <div className="floating-hearts">
      {hearts.map((heart, index) => (
        <motion.span
          key={index}
          className="floating-heart"
          initial={{ y: "100vh", opacity: 0, x: heart.x }}
          animate={{
            y: "-10vh",
            opacity: [0, 0.8, 0],
            rotate: [0, 20, -20, 0],
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
          }}
        >
          {heart.icon}
        </motion.span>
      ))}
    </div>
  </>
);

/* Big photo popup (opens when a gallery photo is tapped) */
const PhotoLightbox = ({ photo, onClose }) => (
  <motion.div
    className="photo-lightbox"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
  >
    <motion.div
      className="lightbox-card"
      initial={{ scale: 0.5, rotateY: 90 }}
      animate={{ scale: 1, rotateY: 0 }}
      exit={{ scale: 0.5, rotateY: -90 }}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        className="lightbox-close"
        onClick={onClose}
        aria-label="Close photo"
      >
        ✕
      </button>

      <img src={photo.image} alt={photo.title} />
      <h2>{photo.title}</h2>
      <p>{photo.description}</p>
      <div className="lightbox-heart">💗</div>
    </motion.div>
  </motion.div>
);

/* ===================================================== */

function App() {
  const [screen, setScreen] = useState("question");

  // step 1
  const [noAttempts, setNoAttempts] = useState(0);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });

  // step 2
  const [showLetter, setShowLetter] = useState(false);

  // step 3 + 4
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [progress, setProgress] = useState(0);

  // step 5
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [courtOpen, setCourtOpen] = useState(false);
  const [showFinalSections, setShowFinalSections] = useState(false);

  const audioRef = useRef(null); // birthday song
  const theriAudioRef = useRef(null); // Theri BGM

  /* ---------- effects ---------- */

  // Scroll to top whenever the screen changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [screen]);

  // Scroll to the Secret Case File once it opens
  useEffect(() => {
    if (!showFinalSections) return;

    const timer = setTimeout(() => {
      document
        .getElementById("college-secret-folder")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);

    return () => clearTimeout(timer);
  }, [showFinalSections]);

  // Decrypt progress → reveal screen (+ Theri BGM starts here)
  useEffect(() => {
    if (screen !== "decrypt") return;

    setProgress(0);
    const start = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min((elapsed / DECRYPT_DURATION) * 100, 100));

      if (elapsed >= DECRYPT_DURATION) {
        clearInterval(interval);
        setScreen("reveal");

        const theri = theriAudioRef.current;
        if (theri) {
          theri.muted = false;
          theri.currentTime = 0;
          theri.volume = 1;
          theri.play().catch((error) => {
            console.error("Theri BGM playback failed:", error);
          });
        }

        celebrate();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [screen]);

  /* ---------- step 1: question ---------- */

  const handleNoClick = () => {
    // keep the button inside the screen, even on small phones
    const maxX = Math.max(40, Math.min(120, window.innerWidth / 2 - 90));

    setNoAttempts((prev) => prev + 1);
    setNoPosition({
      x: (Math.random() * 2 - 1) * maxX,
      y: (Math.random() * 2 - 1) * 55,
    });
  };

  const handleYes = () => {
    setScreen("success");

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#ff4d88", "#ffd700", "#ffffff"],
    });
  };

  /* ---------- step 3: password ---------- */

  // Phones block audio that starts without a tap. This runs inside the
  // Submit tap, so the audio is "unlocked" and can start by itself later.
  const unlockAudio = () => {
    const theri = theriAudioRef.current;
    if (!theri) return;

    theri.muted = true;
    theri
      .play()
      .then(() => {
        theri.pause();
        theri.currentTime = 0;
        theri.muted = false;
      })
      .catch(() => {
        theri.muted = false;
      });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    if (password.trim().toUpperCase() === SECRET_PASSWORD) {
      setPasswordError("");
      setPassword("");
      setShowFinalSections(false);
      unlockAudio();
      setScreen("decrypt");
    } else {
      setPasswordError("Objection! Incorrect password. Try again, Advocate 💗");
      setPassword("");
    }
  };

  /* ---------- step 5: reveal ---------- */

  const toggleMusic = async () => {
    const song = audioRef.current;
    if (!song) return;

    try {
      if (isPlaying) {
        song.pause();
        setIsPlaying(false);
      } else {
        theriAudioRef.current?.pause(); // birthday song replaces Theri BGM
        await song.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Audio playback failed:", error);
    }
  };

  const resetSurprise = () => {
    [audioRef.current, theriAudioRef.current].forEach((audio) => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    });

    setScreen("question");
    setNoAttempts(0);
    setNoPosition({ x: 0, y: 0 });
    setShowLetter(false);
    setPassword("");
    setPasswordError("");
    setProgress(0);
    setIsPlaying(false);
    setSelectedPhoto(null);
    setCourtOpen(false);
    setShowFinalSections(false);
  };

  /* ---------- render ---------- */

  return (
    <div className="love-page">
      {/* Audio is always mounted, so it can play on any screen */}
      <audio ref={theriAudioRef} src="/theri.mp3" preload="auto" loop />
      <audio ref={audioRef} src="/birthday-song.mp3" preload="auto" loop />

      <div className="background-glow glow-one" />
      <div className="background-glow glow-two" />
      <Backdrop />

      <AnimatePresence mode="wait">
        {/* ============ STEP 1 — QUESTION ============ */}
        {screen === "question" && (
          <motion.div
            key="question"
            className="question-container"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="main-heart"
              animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              💖
            </motion.div>

            <div className="question-tag">
              <Sparkles size={16} />
              A LITTLE SPECIAL QUESTION
              <Sparkles size={16} />
            </div>

            <h1>
              Hey My <span>Favorite</span> Person!
            </h1>

            <p className="question-description">
              I have a very important question for you.
              <br />
              This case is strictly confidential! 💌
            </p>

            <div className="question-card">
              <Sparkles className="card-sparkle" />

              <div className="emoji-row">⚖️ 💗 ⚖️</div>

              <h2>
                Do You <span>Like</span> Me?
              </h2>

              <p>
                The court is waiting for your answer.
                <br />
                Choose wisely, my dear advocate!
              </p>
            </div>

            <div className="button-area">
              {/* YES grows every time NO is clicked */}
              <motion.button
                type="button"
                className="yes-button"
                animate={{ scale: 1 + Math.min(noAttempts * 0.08, 0.4) }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleYes}
              >
                YES 💖
              </motion.button>

              {/* NO runs away and shrinks */}
              <motion.button
                type="button"
                className="no-button"
                animate={{
                  x: noPosition.x,
                  y: noPosition.y,
                  scale: Math.max(1 - noAttempts * 0.05, 0.65),
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                whileTap={{ scale: 0.85 }}
                onClick={handleNoClick}
              >
                NO 🙈
              </motion.button>
            </div>

            <motion.p
              key={noAttempts}
              className="no-message"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {noAttempts === 0
                ? "Your answer will be recorded by the court 💕"
                : noMessages[(noAttempts - 1) % noMessages.length]}
            </motion.p>

            <div className="bottom-message">
              <Heart size={15} fill="#ff4d88" />
              A little surprise made just for you
              <Heart size={15} fill="#ff4d88" />
            </div>
          </motion.div>
        )}

        {/* ============ STEP 2 — SUCCESS ============ */}
        {screen === "success" && (
          <motion.div
            key="success"
            className="success-container"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ type: "spring", stiffness: 100, damping: 12 }}
          >
            <motion.div
              className="success-heart"
              animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              💗
            </motion.div>

            <div className="question-tag">
              <CheckCircle size={16} />
              CASE ACCEPTED
            </div>

            <div className="courtroom-intro">
              <h2>Counsel, Case Visaarikka Ready-ah? 😏⚖️</h2>

              <p>
                Indha case-la correct-ah neethi vaangi kudukkanum...
                <br />
                Evidence ellam unga munnadi dhaan irukku! 👀💗
              </p>

              <p>Aana oru mukkiyamaana kelvi...</p>

              <h3>Neenga eppo summa vida poringa, My Lord? 😂</h3>

              <div className="heart-theft-section">
                <p>Indha Heart Theft Case-la...</p>

                <h3>
                  Heart Theft Section keezha case register panni, sattappadi
                  nadavadikkai edukka vendum! ⚖️🚨
                </h3>

                <p>
                  Bail kidaikkaadhu! 🚫
                  <br />
                  Appeal panna chance-um illa! ⚖️
                </p>
              </div>

              <p>
                Yenna, accused romba cute-ah irukkaanga...
                <br />
                Avanga smile-ku evidence thevaiye illa! 🥹❤️
              </p>

              <h3>So, Advocate Madam...</h3>

              <p>
                Case-ah proceed pannalama?
                <br />
                Neethi vaangi kudukka ready-ah...
              </p>

              <h3>Illa accused-ah paathu neengalum mayangiteengala? 😜⚖️</h3>

              <div className="final-question">
                <h3>Oru final kelvi, My Lord... ⚖️</h3>

                <p>
                  Indha innocent accused-ku eppo jamin vaangi kudukka
                  poreenga? 😂
                  <br />
                  Illa neengalum indha love case-la co-accused aagiteengala?
                  💘
                </p>
              </div>

              <p className="courtroom-warning">
                Warning: Indha case-la judge-um advocate-um love-la vizha
                vaaippu undu! 😂💗
              </p>
            </div>

            <motion.button
              type="button"
              className="letter-button"
              onClick={() => setShowLetter(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail size={18} />
              Open Love Letter
              <Heart size={17} />
            </motion.button>

            <AnimatePresence>
              {showLetter && (
                <LoveLetterModal
                  key="love-letter"
                  onClose={() => setShowLetter(false)}
                />
              )}
            </AnimatePresence>

            <button
              type="button"
              className="secret-open-button"
              onClick={() => setScreen("password")}
            >
              <FolderLock size={20} />
              Open Confidential Case File
              <ArrowLeft size={18} className="arrow-right" />
            </button>

            <div className="final-footer">MADE WITH LOVE 💗</div>
          </motion.div>
        )}

        {/* ============ STEP 3 — PASSWORD ============ */}
        {screen === "password" && (
          <SecretSection key="password">
            <motion.div
              className="password-card"
              initial={{ opacity: 0, rotateY: 90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="case-header">
                <span className="confidential-badge">
                  <ShieldCheck size={14} />
                  HIGH COURT OF LOVE &amp; AFFECTION
                </span>

                <motion.div
                  className="case-icon"
                  animate={{ rotate: [0, -5, 5, 0], scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  ⚖️
                </motion.div>

                <div className="case-number">
                  <span>CASE NO.</span>
                  <strong>143 / LOVE / 2026</strong>
                </div>

                <h2>
                  CONFIDENTIAL
                  <span>HEART THEFT CASE FILE</span>
                </h2>

                <p className="case-description">
                  Some crimes are committed with a smile, and some hearts are
                  stolen without a single word. 💗
                  <br />
                  This confidential case is protected under the Special Love
                  &amp; Affection Act. Access is strictly restricted to the
                  authorized Advocate Madam only.
                </p>
              </div>

              <div className="case-details">
                <div className="case-detail">
                  <span>CASE TYPE</span>
                  <strong>Unlawful Heart Possession 💗</strong>
                </div>

                <div className="case-detail">
                  <span>CASE STATUS</span>
                  <strong>Under Romantic Investigation 🔍</strong>
                </div>

                <div className="case-detail">
                  <span>JURISDICTION</span>
                  <strong>Supreme Court of Love ⚖️</strong>
                </div>
              </div>

              <div className="authorization-section">
                <h3>🔐 ADVOCATE AUTHORIZATION REQUIRED</h3>

                <p>
                  Only the authorized Advocate Madam can access the
                  confidential evidence.
                </p>

                <form
                  className="password-form"
                  onSubmit={handlePasswordSubmit}
                >
                  <label htmlFor="love-password">
                    <Fingerprint size={17} />
                    ENTER YOUR SECRET CASE CODE
                  </label>

                  <input
                    id="love-password"
                    className="love-password-input"
                    type="password"
                    placeholder="Enter secret password..."
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordError("");
                    }}
                    autoComplete="off"
                    autoCapitalize="characters"
                    autoCorrect="off"
                    spellCheck={false}
                  />

                  <AnimatePresence>
                    {passwordError && (
                      <motion.p
                        className="password-error"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        {passwordError}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <motion.button
                    type="submit"
                    className="unlock-button"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <LockKeyhole size={18} />
                    Submit Evidence
                    <Gavel size={18} />
                  </motion.button>
                </form>

                <p className="password-hint">
                  Hint: The special love case number 💗
                  <br />
                  Format: CASE + love case number 🔐
                </p>
              </div>

              <button
                type="button"
                className="password-back-button"
                onClick={() => setScreen("success")}
              >
                <ArrowLeft size={15} />
                Return to previous page
              </button>
            </motion.div>
          </SecretSection>
        )}

        {/* ============ STEP 4 — DECRYPT ============ */}
        {screen === "decrypt" && (
          <SecretSection key="decrypt">
            <motion.div
              className="password-card decrypt-screen"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <motion.div
                className="decrypt-heart"
                animate={{ scale: [1, 1.3, 1], rotate: [0, 360] }}
                transition={{
                  scale: { duration: 1.2, repeat: Infinity },
                  rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                }}
              >
                🔐
              </motion.div>

              <div className="question-tag">
                <Fingerprint size={15} />
                AUTHENTICATING EVIDENCE
              </div>

              <h2>
                Verifying Your
                <span> Love Case...</span>
              </h2>

              <p>
                Checking the confidential evidence.
                <br />
                Please wait, my dear advocate...
              </p>

              <div className="decrypt-progress">
                <div
                  className="decrypt-progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="decrypt-percentage">{Math.round(progress)}%</div>

              <div className="decrypt-text">
                {progress < 25
                  ? "INITIALIZING CASE FILE..."
                  : progress < 50
                    ? "VERIFYING AUTHORIZATION..."
                    : progress < 75
                      ? "ANALYZING HEART EVIDENCE..."
                      : progress < 100
                        ? "PREPARING YOUR SURPRISE..."
                        : "CASE ACCEPTED!"}
              </div>

              <motion.div
                className="decrypt-hearts"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                💗 ⚖️ 💗
              </motion.div>
            </motion.div>
          </SecretSection>
        )}

        {/* ============ STEP 5 — REVEAL ============ */}
        {screen === "reveal" && (
          <SecretSection key="reveal">
            <motion.div
              className="secret-reveal-card"
              initial={{ opacity: 0, scale: 0.2, rotateY: 180 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1.2, type: "spring", stiffness: 80 }}
            >
              <div className="secret-tag">
                <CheckCircle size={16} />
                CASE ACCEPTED
              </div>

              <motion.div
                className="reveal-gavel"
                animate={{ rotate: [0, -15, 0] }}
                transition={{ duration: 1, repeat: 2 }}
              >
                ⚖️
              </motion.div>

              <h2>
                Evidence of
                <span> My Favorite Person!</span>
              </h2>

              <p className="secret-love-message">
                On this very special day, the Court of Love celebrates <br />the birthday of its
                most precious person — Bettina! 🎂
                <br />
                Guilty of stealing my heart and making every moment beautiful. 🥹💖
                <br />Today, the most precious evidence is not found in any law book… <br />it is found
                in my heart. 🥹❤️💖
              </p>

              {/* 5.1 — Special photo */}
              <motion.div
                className="special-photo-card"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="special-photo-label">
                  <Star size={15} fill="#ffd700" />
                  <span>SPECIAL EVIDENCE — EXHIBIT A</span>
                  <Star size={15} fill="#ffd700" />
                </div>

                <div className="photo-glow">
                  <div className="secret-photo-frame">
                    <img
                      src="/Bets_yw_saree.jpeg"
                      alt="Special memory"
                      className="secret-photo"
                    />

                    <div className="photo-overlay">
                      <span>CASE NO. 143</span>
                      <Heart size={18} fill="#ff4d88" />
                    </div>
                  </div>
                </div>

                <h3>My Favorite Memory 💗</h3>

                <p>
                  A beautiful soul. ❤️
                  <br />
                  A precious memory. 🥹
                  <br />
                  A bond my heart will cherish forever. 💖
                </p>
              </motion.div>

              {/* 5.2 — Photo gallery */}
              <div className="photo-gallery-section">
                <div className="gallery-heading">
                  <Sparkles size={17} />
                  <h3>MORE SECRET EVIDENCE</h3>
                  <Sparkles size={17} />
                </div>

                <p className="gallery-description">
                  Every picture has a story.
                  <br />
                  Every memory has a special place. 💌
                </p>

                <div className="individual-photo-gallery">
                  {photoCards.map((photo, index) => (
                    <motion.div
                      key={photo.image}
                      className="individual-photo-card"
                      initial={{
                        opacity: 0,
                        y: 80,
                        rotate: index % 2 === 0 ? -8 : 8,
                      }}
                      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.8, delay: index * 0.2 }}
                      whileHover={{ scale: 1.04, y: -8 }}
                      onClick={() => setSelectedPhoto(photo)}
                    >
                      <div className="individual-photo-label">
                        EXHIBIT {String.fromCharCode(66 + index)}
                      </div>

                      <div className="individual-image-wrapper">
                        <img
                          src={photo.image}
                          alt={photo.title}
                          className="individual-photo"
                        />

                        <div className="individual-photo-overlay">
                          <Heart size={22} fill="#ff4d88" />
                        </div>
                      </div>

                      <h4>{photo.title}</h4>
                      <p>{photo.description}</p>

                      <div className="photo-card-footer">
                        <Scale size={13} />
                        <span>CONFIDENTIAL</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* 5.3 — Birthday message */}

              <motion.div
                className="birthday-message-card"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="birthday-crown">👑</div>

                <div className="birthday-title-tag">
                  <Sparkles size={16} />
                  THE MOST SPECIAL DAY
                </div>

                <h2>
                  Happy Birthday,
                  <span> My Favorite Advocate! 🎂</span>
                </h2>

                <p>
                  Today, the world celebrates your birthday, but my heart
                  celebrates the beautiful blessing that is you. ❤️
                </p>

                <p>
                  May your life be filled with endless happiness, remarkable
                  success, beautiful memories, and countless reasons to smile.
                </p>

                <p>
                  May every dream in your heart come true, every step lead
                  you toward success, and God's blessings always guide your
                  beautiful journey. ✝️💗
                </p>

                <div className="birthday-wishes">
                  <span>💗 Endless Happiness</span>
                  <span>✨ Beautiful Success</span>
                  <span>🎂 Forever Love</span>
                </div>

                <div className="birthday-footer">
                  Wishing you a lifetime of happiness, love, and unforgettable
                  moments, my dear Bettina. 🥹❤️

                  <br />

                  <strong>
                    Forever my favorite person, my sweetest blessing,
                    and my favorite advocate. ⚖️🫶🏻
                  </strong>
                </div>
              </motion.div>


              {/* 5.4 — Emotional letter */}

              <motion.div
                className="emotional-letter-card"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="emotional-letter-icon">💌</div>

                <div className="letter-heading">
                  <Heart size={17} fill="#ff4d88" />
                  A LETTER FROM MY HEART
                  <Heart size={17} fill="#ff4d88" />
                </div>

                <h2>To Someone Truly Special...</h2>

                <p>
                  Some people enter our lives and quietly become important in ways
                  we never expected. And nee appadi en life-la vandha oru
                  special person. ❤️
                </p>

                <p>
                  Un presence, un smile, and namma share panra chinna chinna
                  moments ellame enakku romba special. Sometimes, words-la
                  explain panna mudiyadha alavukku nee enakku important.
                </p>

                <p>
                  I may not always find the right words to express what I feel,
                  but I hope this little surprise reminds you of how much you
                  are appreciated. Un smile paatha en day eh konjam better
                  aagidum. 🫶🏻
                </p>

                <p>
                  On your birthday, I wish you peace in your heart, courage
                  in your dreams, and happiness in every little thing you do.
                  Un dreams ellame nalla achieve pannanum, life-la nee nenacha
                  ellame beautiful-ah nadakkanum.
                </p>

                <p>
                  May God always guide you, protect you, and bless you with
                  endless happiness. ✨
                </p>

                <p className="emotional-highlight">
                  No matter where life takes you, I hope you always remember
                  how special you are. Nee eppovume happy-ah irukkanum,
                  and un smile eppovume ippadiye irukkanum. 💗
                </p>

                <div className="emotional-letter-signature">
                  With all my heart,
                  <br />
                  Someone who cares about you more than words can say 💖
                </div>
              </motion.div>


              {/* 5.5 — Birthday song player */}
              <motion.div
                className="birthday-music-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="music-icon">
                  <Music size={24} />
                </div>

                <div className="music-details">
                  <h3>A Little Birthday Melody 🎶</h3>
                  <p>A special song for a special person.</p>
                </div>

                <motion.button
                  type="button"
                  className="music-control-button"
                  onClick={toggleMusic}
                  aria-label={isPlaying ? "Pause song" : "Play song"}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isPlaying ? <Pause size={22} /> : <Play size={22} />}
                </motion.button>
              </motion.div>

              {/* 5.6 — Courtroom game entry */}

              <motion.div
                className="advocate-challenge"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="challenge-badge">
                  <Gavel size={14} />
                  SPECIAL ADVOCATE CHALLENGE
                </span>

                <h2>
                  Welcome to the
                  <span> Birthday Courtroom ⚖️</span>
                </h2>

                <div className="challenge-description">
                  <p>
                    Attention, Advocate Madam! 👩🏻‍⚖️💗
                  </p>

                  <p>
                    An extraordinary case has officially been filed
                    in the Birthday Court against a very special person...
                  </p>

                  <p>
                    The accused stands before the court, charged with
                    the following adorable crimes:
                  </p>

                  <p className="challenge-charge">
                    💗 Count 1: Stealing Hearts Without Permission!
                    <br />
                    ✨ Count 2: Spreading Smiles Everywhere!
                    <br />
                    🫶🏻 Count 3: Being Unbelievably Cute &amp; Irresistible!
                    <br />
                    🎂 Count 4: Making Someone's World a Little More Beautiful!
                  </p>

                  <p>
                    The evidence has been carefully collected,
                    the feelings are undeniable, and the case is
                    officially ready for trial! 💌
                  </p>

                  <p>
                    <strong>Your mission, Advocate Madam:</strong>
                  </p>

                  <p>
                    Investigate the evidence, uncover the sweetest
                    truths, and deliver a Birthday Verdict that will
                    make this special day truly unforgettable! 🎂
                  </p>
                </div>

                <div className="challenge-meta">
                  <span>
                    <Fingerprint size={13} />
                    CASE NO. 143 / 2026
                  </span>

                  <span>
                    <ShieldCheck size={13} />
                    TOP SECRET
                  </span>
                </div>

                <motion.button
                  type="button"
                  className="courtroom-button"
                  onClick={() => setCourtOpen(true)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <Gavel size={18} />
                  <span>ACCEPT THE CASE 💗</span>
                  <ArrowLeft size={18} className="arrow-right" />
                </motion.button>
              </motion.div>


              {/* 5.7 — Rajini vs Vijay (button opens the Secret Case File) */}
              <JudgeReveal
                onContinue={() => setShowFinalSections(true)}
                theriAudioRef={theriAudioRef}
              />

              {/* 5.8 — Secret Case File */}
              {showFinalSections && (
                <div id="college-secret-folder" className="final-sections">
                  <SecretCaseFile />
                </div>
              )}

              {/* 5.9 — Final message + replay */}
              <motion.div
                className="final-love-message"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <div className="final-love-hearts">💗 ✨ 💗</div>

                <h2>⚖️ ONE LAST TIME…</h2>

                <p>
                  In every lifetime, my choice will always be you. ❤️
                </p>

                <h3>
                  You are my love, my happiness, my forever. 🫶🏻
                </h3>

                <div className="verdict-sentence">
                  <span>🎂 HAPPY BIRTHDAY, MY LOVE!</span>

                  <p>
                    Today, tomorrow, and forever…
                    <br />
                    I’ll always love you. 🫶🏻💌
                  </p>
                </div>

                <h3>
                  💗 You Will Always Be
                  <span> Someone Special ✨</span>
                </h3>

                <p>
                  Happy Birthday once again!
                  <br />
                  Keep smiling, keep shining,
                  <br />
                  and keep being you. 💖
                </p>

                <h4>
                  YOU ARE MY FOREVER.
                  <br />
                  MY LOVE. MY HAPPINESS. MY EVERYTHING. ❤️🔐
                </h4>

                <div className="final-love-hearts">
                  Pets chelooo😘😘😘😘
                  <br />
                  <span>My cutest girl, my forever love. 😘❤️</span>
                </div>

                <button
                  type="button"
                  className="reset-surprise-button"
                  onClick={resetSurprise}
                >
                  <Heart size={17} fill="#ff4d88" />
                  Replay the Surprise
                </button>
              </motion.div>
            </motion.div>
          </SecretSection>
        )}
      </AnimatePresence>

      {/* Popups */}
      <AnimatePresence>
        {selectedPhoto && (
          <PhotoLightbox
            key="photo-lightbox"
            photo={selectedPhoto}
            onClose={() => setSelectedPhoto(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {courtOpen && <Courtroom onClose={() => setCourtOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}

export default App;