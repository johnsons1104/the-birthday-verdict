import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import "./SecretCaseFile.css";

const CASE_PASSWORD = "THERIMUMBAI21";

const evidenceList = [
    {
        id: 1,
        image: "/polar_ice.jpeg",
        title: "EXHIBIT A — The Moments That Started It All ❤️",
        caption:
            "Some moments become memories. Some memories become a part of my heart.",
    },
    {
        id: 2,
        image: "/pet_tansi.jpeg",
        title: "EXHIBIT B — Smiles Worth a Thousand Words 🥹",
        caption:
            "Your smile is the sweetest evidence my heart has ever collected.",
    },
    {
        id: 3,
        image: "/pet_ecr.jpeg",
        title: "EXHIBIT C — Our Little World 💌",
        caption:
            "A world full of memories, laughter, and a bond that means everything.",
    },
    {
        id: 4,
        image: "/pvr.jpeg",
        title: "EXHIBIT D — An Endless Bond ✨",
        caption:
            "No matter where life takes us, these moments will always stay with me.",
    },
    {
        id: 5,
        image: "/pet_home.jpeg",
        title: "EXHIBIT E — The Unspoken Feelings 💕",
        caption:
            "Some feelings are too beautiful to explain, but impossible to forget.",
    },
    {
        id: 6,
        image: "/pet_room.jpeg",
        title: "EXHIBIT F — Forever Evidence ❤️",
        caption:
            "The best part of this story is that my heart still chooses you.",
    },
];

const SecretCaseFile = () => {
    const [folderOpened, setFolderOpened] = useState(false);
    const [password, setPassword] = useState("");
    const [unlocked, setUnlocked] = useState(false);
    const [error, setError] = useState("");
    const [selectedEvidence, setSelectedEvidence] = useState(null);

    // Lock page scroll + close on Escape while the photo popup is open
    useEffect(() => {
        if (!selectedEvidence) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const onKeyDown = (e) => {
            if (e.key === "Escape") setSelectedEvidence(null);
        };
        window.addEventListener("keydown", onKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [selectedEvidence]);

    const handleUnlock = (e) => {
        e.preventDefault();

        if (password.trim().toUpperCase() === CASE_PASSWORD) {
            setUnlocked(true);
            setError("");
            setPassword("");
        } else {
            setError("OBJECTION! Wrong password. Access denied, Your Honor. 🔐");
        }
    };

    const handleCloseFolder = () => {
        setFolderOpened(false);
        setUnlocked(false);
        setPassword("");
        setError("");
        setSelectedEvidence(null);
    };

    return (
        <section className="secret-case-section">
            <div className="secret-case-container">
                {/* CASE HEADER */}
                <div className="secret-case-header">
                    <div className="case-stamp">CLASSIFIED • CONFIDENTIAL</div>

                    <div className="case-emblem">⚖️</div>

                    <h2>
                        THE <span>SECRET CASE FILE</span>
                    </h2>

                    <div className="scf-case-number">CASE NO. LOVE-143</div>

                    <p className="scf-intro">
                        Every smile is a piece of evidence. Every moment is a beautiful
                        testimony. And every memory is proof of a bond that words can
                        never explain.
                    </p>

                    <div className="case-declaration">
                        <span>THE ADVOCATE'S DECLARATION</span>

                        <p>This file contains the most precious evidence of my heart.</p>

                        <p>Access is strictly limited to one special person.</p>

                        <h4>
                            Your Honor, are you ready to uncover the secrets hidden within
                            this case? ❤️
                        </h4>
                    </div>
                </div>

                {/* LOCKED FOLDER */}
                {!folderOpened && (
                    <div className="case-folder-card">
                        <div className="case-folder-icon">📁</div>

                        <div className="folder-classification">RESTRICTED ACCESS</div>

                        <h3>CONFIDENTIAL EVIDENCE</h3>

                        <p>
                            A collection of memories that only one heart is authorized to
                            access.
                        </p>

                        <button
                            type="button"
                            className="case-open-btn"
                            onClick={() => setFolderOpened(true)}
                        >
                            ⚖️ Unlock Classified Evidence
                        </button>
                    </div>
                )}

                {/* PASSWORD SCREEN */}
                {folderOpened && !unlocked && (
                    <div className="case-password-card">
                        <div className="case-lock-icon">🔐</div>

                        <div className="case-status">AUTHORIZATION REQUIRED</div>

                        <h3>OBJECTION! ACCESS DENIED.</h3>

                        <p>
                            This file is classified. Only the person who holds the key to
                            these memories is authorized to proceed.
                        </p>

                        {/* PASSWORD HINT */}
                        <div className="case-secret-hint">
                            <div className="hint-heading">
                                🕵️ THE ADVOCATE'S SECRET CLUE
                            </div>

                            <p>Three pieces of evidence are hidden in this case...</p>

                            <div className="hint-clues">
                                <p>🎬 The movie that stole her heart.</p>
                                <p>🌆 The city she loves the most.</p>
                                <p>❤️ The day our beautiful story began.</p>
                            </div>

                            <h4>Put them together, Your Honor...</h4>

                            <span>The secret key is waiting for you. 🔐</span>
                        </div>

                        <form onSubmit={handleUnlock}>
                            <label htmlFor="casePassword">ENTER SECRET PASSWORD</label>

                            <input
                                id="casePassword"
                                type="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setError("");
                                }}
                                placeholder="Enter password..."
                                autoComplete="off"
                                autoCapitalize="characters"
                                autoCorrect="off"
                                spellCheck={false}
                                required
                            />

                            {error && <div className="case-error">{error}</div>}

                            <button type="submit" className="case-unlock-btn">
                                🔓 Proceed, Your Honor
                            </button>
                        </form>

                        <p className="case-password-note">
                            The truth is waiting behind this lock. ❤️
                        </p>

                        <button
                            type="button"
                            className="case-back-btn"
                            onClick={handleCloseFolder}
                        >
                            ← Return to Case File
                        </button>
                    </div>
                )}

                {/* UNLOCKED EVIDENCE */}
                {folderOpened && unlocked && (
                    <div className="case-evidence-wrapper">
                        <div className="case-evidence-header">
                            <div className="case-access-granted">🔓 ACCESS GRANTED</div>

                            <h3>
                                CASE REOPENED:
                                <span>THE MEMORY CHRONICLES</span>
                            </h3>

                            <p>
                                The evidence has been unsealed. Handle these memories with
                                love. ❤️
                            </p>

                            <div className="case-evidence-divider" />
                        </div>

                        <div className="case-evidence-grid">
                            {evidenceList.map((evidence) => (
                                <button
                                    type="button"
                                    className="case-evidence-card"
                                    key={evidence.id}
                                    onClick={() => setSelectedEvidence(evidence)}
                                >
                                    <div className="case-evidence-image">
                                        <img
                                            src={evidence.image}
                                            alt={evidence.title}
                                            loading="lazy"
                                            onError={(e) => {
                                                e.currentTarget.style.display = "none";
                                            }}
                                        />

                                        <div className="case-image-overlay">
                                            <span>🔍 View Evidence</span>
                                        </div>
                                    </div>

                                    <div className="case-evidence-details">
                                        <h4>{evidence.title}</h4>
                                        <p>{evidence.caption}</p>
                                        <span className="evidence-seal">VERIFIED ❤️</span>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* FINAL VERDICT */}
                        <div className="case-final-verdict">
                            <div className="verdict-stamp">FINAL VERDICT</div>

                            <h3>THE COURT FINDS...</h3>

                            <p>
                                After reviewing all the evidence, the court finds that these
                                memories are...
                            </p>

                            <h2>GUILTY OF STEALING MY HEART. ❤️</h2>

                            <div className="verdict-sentence">
                                <span>THE SENTENCE:</span>

                                <p>
                                    A lifetime of love, laughter, and unforgettable memories.
                                </p>
                            </div>

                            <h4>
                                CASE CLOSED? NEVER.
                                <br />
                                THIS STORY HAS NO ENDING. 💌
                            </h4>
                        </div>

                        <button
                            type="button"
                            className="case-lock-again-btn"
                            onClick={handleCloseFolder}
                        >
                            🔒 Lock Classified File
                        </button>
                    </div>
                )}
            </div>

            {/* PHOTO POPUP
          Rendered into document.body so the animated / overflow-hidden
          parent cards can never shrink or clip it. */}
            {selectedEvidence &&
                createPortal(
                    <div
                        className="case-photo-modal"
                        role="dialog"
                        aria-modal="true"
                        onClick={() => setSelectedEvidence(null)}
                    >
                        <button
                            type="button"
                            className="case-modal-close"
                            onClick={() => setSelectedEvidence(null)}
                            aria-label="Close photo"
                        >
                            ×
                        </button>

                        <div
                            className="case-modal-content"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="modal-exhibit-label">⚖️ CLASSIFIED EXHIBIT</div>

                            <img
                                src={selectedEvidence.image}
                                alt={selectedEvidence.title}
                            />

                            <h3>{selectedEvidence.title}</h3>

                            <p>{selectedEvidence.caption}</p>

                            <div className="modal-love-seal">❤️ EVIDENCE OF LOVE ❤️</div>
                        </div>
                    </div>,
                    document.body
                )}
        </section>
    );
};

export default SecretCaseFile;