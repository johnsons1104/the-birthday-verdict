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
  "Objection! You cannot reject this case 😏",
  "Your Honour, please reconsider! 💗",
  "The court refuses this decision 😂",
  "One more chance, my dear advocate!",
  "This case is getting interesting! ⚖️",
];

// Generated once, so positions don't change on every re-render
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

  confetti({
    particleCount: 80,
    spread: 120,
    origin: { x: 0.2, y: 0.5 },
  });

  confetti({
    particleCount: 80,
    spread: 120,
    origin: { x: 0.8, y: 0.5 },
  });
};

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

function App() {
  const [screen, setScreen] = useState("question");
  const [noCount, setNoCount] = useState(0);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [progress, setProgress] = useState(0);
  const [showLetter, setShowLetter] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [courtOpen, setCourtOpen] = useState(false);
  const [showFinalSections, setShowFinalSections] = useState(false);

  const audioRef = useRef(null);
  const theriAudioRef = useRef(null);

  // Scroll to top whenever the screen changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [screen]);

  // Scroll to the secret case file once it appears
  useEffect(() => {
    if (!showFinalSections) return;

    const timer = setTimeout(() => {
      document
        .getElementById("college-secret-folder")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);

    return () => clearTimeout(timer);
  }, [showFinalSections]);

  // Decrypt progress -> reveal screen (+ Theri BGM starts here)
  useEffect(() => {
    if (screen !== "decrypt") return;

    setProgress(0);
    const start = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const currentProgress = Math.min(
        (elapsed / DECRYPT_DURATION) * 100,
        100
      );

      setProgress(currentProgress);

      if (elapsed >= DECRYPT_DURATION) {
        clearInterval(interval);
        setProgress(100);

        // Show image reveal screen
        setScreen("reveal");

        // Theri BGM starts exactly when the image reveal starts
        const theriAudio = theriAudioRef.current;

        if (theriAudio) {
          theriAudio.muted = false;
          theriAudio.currentTime = 0;
          theriAudio.volume = 1;

          theriAudio.play().catch((error) => {
            console.error("Theri BGM playback failed:", error);
          });
        }

        celebrate();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [screen]);

  const handleYes = () => {
    setScreen("success");

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#ff4d88", "#ffd700", "#ffffff"],
    });
  };

  // Android / iPhone block audio that starts without a tap.
  // This runs inside the button tap, so the audio gets "unlocked"
  // and can be played automatically later when the reveal starts.
  const unlockAudio = () => {
    const theriAudio = theriAudioRef.current;
    if (!theriAudio) return;

    theriAudio.muted = true;

    theriAudio
      .play()
      .then(() => {
        theriAudio.pause();
        theriAudio.currentTime = 0;
        theriAudio.muted = false;
      })
      .catch(() => {
        theriAudio.muted = false;
      });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    if (password.trim().toUpperCase() === SECRET_PASSWORD) {
      setPasswordError("");
      setPassword("");

      unlockAudio();
      setShowFinalSections(false);
      setScreen("decrypt");
    } else {
      setPasswordError(
        "Objection! Incorrect password. Try again, Advocate 💗"
      );
      setPassword("");
    }
  };

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // Pause Theri BGM when birthday song starts
        if (theriAudioRef.current) theriAudioRef.current.pause();

        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Audio playback failed:", error);
    }
  };

  const handleJudgeContinue = () => {
    setShowFinalSections(true);
  };

  const resetSurprise = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    if (theriAudioRef.current) {
      theriAudioRef.current.pause();
      theriAudioRef.current.currentTime = 0;
    }

    setScreen("question");
    setNoCount(0);
    setPassword("");
    setPasswordError("");
    setProgress(0);
    setIsPlaying(false);
    setShowLetter(false);
    setSelectedPhoto(null);
    setCourtOpen(false);
    setShowFinalSections(false);
  };

  return (
    <div className="love-page">
      {/* AUDIO ALWAYS MOUNTED (outside screens) */}
      <audio ref={theriAudioRef} src="/theri.mp3" preload="auto" loop />
      <audio ref={audioRef} src="/birthday-song.mp3" preload="auto" loop />

      <div className="background-glow glow-one" />
      <div className="background-glow glow-two" />

      {/* BACKGROUND STARS */}
      <div className="stars-container">
        {stars.map((star, index) => (
          <motion.span
            key={index}
            className="background-star"
            style={{ left: star.left, top: star.top }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.7, 1.3, 0.7],
            }}
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

      {/* FLOATING HEARTS */}
      <div className="floating-hearts">
        {hearts.map((heart, index) => (
          <motion.span
            key={index}
            className="floating-heart"
            initial={{
              y: "100vh",
              opacity: 0,
              x: heart.x,
            }}
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

      <AnimatePresence mode="wait">
        {/* QUESTION SCREEN */}
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
              animate={{
                scale: [1, 1.15, 1],
                rotate: [0, 5, -5, 0],
              }}
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

            <motion.div
              className="question-card"
              whileHover={{ scale: 1.02 }}
            >
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
            </motion.div>

            <div className="button-area">
              <motion.button
                type="button"
                className="yes-button"
                onClick={handleYes}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
              >
                YES 💖
              </motion.button>

              <motion.button
                type="button"
                className="no-button"
                onClick={() => setNoCount((prev) => prev + 1)}
                animate={
                  noCount > 0
                    ? {
                        x: [0, -5, 5, -4, 4, 0],
                        rotate: [0, -4, 4, -3, 3, 0],
                      }
                    : { x: 0, rotate: 0 }
                }
                transition={{ duration: 0.45 }}
                whileHover={{ scale: 0.95 }}
                whileTap={{ scale: 0.85, rotate: -8 }}
              >
                NO 🙈
              </motion.button>
            </div>

            <p className="no-message">
              {noCount > 0
                ? noMessages[(noCount - 1) % noMessages.length]
                : "Your answer will be recorded by the court 💕"}
            </p>

            <div className="bottom-message">
              <Heart size={15} fill="#ff4d88" />
              A little surprise made just for you
              <Heart size={15} fill="#ff4d88" />
            </div>
          </motion.div>
        )}

        {/* SUCCESS SCREEN */}
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
                  Heart Theft Section keezha case register panni,
                  <br />
                  sattappadi nadavadikkai edukka vendum! ⚖️🚨
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
                  Illa neengalum indha love case-la co-accused
                  aagiteengala? 💘
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
                <motion.div
                  className="love-letter-modal-overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowLetter(false)}
                >
                  <motion.div
                    className="secret-letter-modal"
                    initial={{ opacity: 0, scale: 0.7, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.7, y: 50 }}
                    transition={{ duration: 0.4 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      className="love-letter-close"
                      onClick={() => setShowLetter(false)}
                      aria-label="Close letter"
                    >
                      ✕
                    </button>

                    <div className="letter-emoji">💌</div>

                    <div className="secret-tag">
                      <Scale size={16} />
                      CONFIDENTIAL LOVE LETTER
                    </div>

                    <h2>Dear My Favorite Advocate, ⚖️💗</h2>

                    <p>
                      If love were a courtroom, you would be the most beautiful
                      case my heart has ever handled.
                    </p>

                    <p>
                      As a law student, you may know how to argue a case,
                      interpret the law, and fight for justice... but I wonder
                      if you know how effortlessly you won a permanent place in
                      my heart. 🥹
                    </p>

                    <p>
                      I hereby submit my heart as Exhibit A, my endless care as
                      Exhibit B, and every little memory of us as Exhibit C.
                    </p>

                    <p>
                      There is no objection to your smile, no appeal against
                      your beautiful presence, and absolutely no intention of
                      withdrawing the feelings I have for you. 💕
                    </p>

                    <p>
                      You don't need to prove your innocence, because the only
                      charge against you is
                      <strong> stealing my heart without permission. </strong>
                    </p>

                    <h3>⚖️ THE FINAL VERDICT ⚖️</h3>

                    <p>
                      After carefully examining every memory, every smile, and
                      every little moment... this court finds you
                      <strong>
                        {" "}
                        GUILTY of being someone truly special to me.{" "}
                      </strong>
                    </p>

                    <p>
                      The sentence? A lifetime of love, care, smiles, beautiful
                      memories, and a special place in my heart. ❤️
                    </p>

                    <h3>Case No. 143 — The Case of My Heart 💗</h3>

                    <div className="letter-signature">
                      With love and endless affection,
                      <br />
                      Your Secret Admirer,
                      <br />
                      The One Who Always Chooses You. 💌
                    </div>
                  </motion.div>
                </motion.div>
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

        {/* PASSWORD SCREEN */}
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
                  &amp; Affection Act.
                  <br />
                  Access is strictly restricted to the authorized Advocate
                  Madam only.
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

        {/* DECRYPT SCREEN */}
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

        {/* REVEAL SCREEN */}
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
                The court has officially declared you as someone truly special.
                <br />
                Here is the most important evidence in this case... 💖
              </p>

              {/* SPECIAL PHOTO */}
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
                  A special person.
                  <br />
                  A beautiful memory.
                  <br />
                  An unforgettable bond.
                </p>
              </motion.div>

              {/* PHOTO GALLERY */}
              <div className="photo-gallery-section" id="photo-gallery">
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

              {/* BIRTHDAY MESSAGE */}
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
                  May your life be filled with happiness, success, beautiful
                  memories, and endless smiles.
                </p>

                <p>
                  May every dream you carry in your heart come true. You
                  deserve all the wonderful things this world has to offer.
                </p>

                <div className="birthday-wishes">
                  <span>💗 Happiness</span>
                  <span>✨ Success</span>
                  <span>🎂 Love</span>
                </div>

                <div className="birthday-footer">
                  Wishing you a lifetime of beautiful moments 💖
                </div>
              </motion.div>

              {/* EMOTIONAL LETTER */}
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
                  Some people enter our lives and quietly become important in
                  ways we never expected.
                </p>

                <p>
                  You are one of those people. Your presence, your smile, and
                  the little moments we share mean more than I can explain.
                </p>

                <p>
                  I may not always find the right words to express what I feel,
                  but I hope this little surprise reminds you that you are
                  appreciated.
                </p>

                <p>
                  On your birthday, I wish you peace in your heart, courage in
                  your dreams, and happiness in every little thing you do.
                </p>

                <p className="emotional-highlight">
                  No matter where life takes you, I hope you always remember
                  how special you are. 💗
                </p>

                <div className="emotional-letter-signature">
                  With all my heart,
                  <br />
                  Someone who cares about you 💖
                </div>
              </motion.div>

              {/* MUSIC PLAYER */}
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

              {/* COURTROOM GAME ENTRY */}
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
                  <span>Birthday Courtroom ⚖️</span>
                </h2>

                <div className="challenge-description">
                  <p>
                    Advocate Madam, an extraordinary case has been filed
                    against a very special person...
                  </p>

                  <p>The accused is charged with:</p>

                  <p className="challenge-charge">
                    Stealing Hearts, Spreading Smiles &amp; Being
                    Irresistibly Cute! 💗
                  </p>

                  <p>
                    Your mission is to investigate the evidence, uncover the
                    truth, and deliver the most unforgettable Birthday
                    Verdict! 🎂
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
                  <span>ACCEPT THE CASE</span>
                  <ArrowLeft size={18} className="arrow-right" />
                </motion.button>
              </motion.div>

              {/* RAJINI vs VIJAY */}
              <JudgeReveal onContinue={handleJudgeContinue} />

              {/* SECRET CASE FILE (opens after the Judge button) */}
              {showFinalSections && (
                <div id="college-secret-folder" className="final-sections">
                  <SecretCaseFile />
                </div>
              )}

              {/* FINAL MESSAGE */}
              <motion.div
                className="final-love-message"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <div className="final-love-hearts">💗 ✨ 💗</div>

                <h2>
                  You Will Always Be
                  <span> Someone Special</span>
                </h2>

                <p>
                  Happy Birthday once again!
                  <br />
                  Keep smiling, keep shining, and keep being you. 💖
                </p>

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

      {/* PHOTO LIGHTBOX */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="photo-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
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
                onClick={() => setSelectedPhoto(null)}
                aria-label="Close photo"
              >
                ✕
              </button>

              <img src={selectedPhoto.image} alt={selectedPhoto.title} />
              <h2>{selectedPhoto.title}</h2>
              <p>{selectedPhoto.description}</p>
              <div className="lightbox-heart">💗</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* COURTROOM GAME */}
      <AnimatePresence>
        {courtOpen && <Courtroom onClose={() => setCourtOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}

export default App;