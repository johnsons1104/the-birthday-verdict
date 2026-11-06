import React, { useState } from "react";
import "./CollegeMemories.css";

const COLLEGE_PASSWORD = "COLLEGE143";

const collegePhotos = [
  {
    id: 1,
    image: "/college1.jpeg",
    title: "Our College Days 🎓",
    caption: " அந்த நாட்கள் திரும்ப வருமா... ❤️",
  },
  {
    id: 2,
    image: "/college2.jpeg",
    title: "Beautiful Memories ✨",
    caption: "Every little moment with you is special.",
  },
  {
    id: 3,
    image: "/college3.jpeg",
    title: "Our Friendship 💕",
    caption: "College gave me memories, but you made them beautiful.",
  },
  {
    id: 4,
    image: "/college4.jpeg",
    title: "Unforgettable Days 🌸",
    caption: "Some memories stay forever in my heart.",
  },
  {
    id: 5,
    image: "/college5.jpeg",
    title: "Our Crazy Moments 🥹",
    caption: "நம்மளோட அந்த silly moments எல்லாம் priceless.",
  },
  {
    id: 6,
    image: "/college6.jpeg",
    title: "Forever Memories 💌",
    caption: "One college life. Countless memories. One special person.",
  },
];

const CollegeMemories = () => {
  const [isFolderOpen, setIsFolderOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handleUnlock = (e) => {
    e.preventDefault();

    if (password === COLLEGE_PASSWORD) {
      setIsUnlocked(true);
      setError("");
      setPassword("");
    } else {
      setError("Wrong password! Try again, secret keeper 🔐");
    }
  };

  const closeFolder = () => {
    setIsFolderOpen(false);
    setIsUnlocked(false);
    setPassword("");
    setError("");
    setSelectedPhoto(null);
  };

  return (
    <section className="college-memory-section">
      <div className="college-memory-container">
        <div className="college-memory-heading">
          <span className="college-memory-tag">
            CLASSIFIED MEMORIES
          </span>

          <h2>
            Our Secret <span>College Folder</span>
          </h2>

          <p>
            Some memories are too precious to be public...
            <br />
            Only you can unlock this little world of ours. ❤️
          </p>
        </div>

        {!isFolderOpen && (
          <div className="secret-folder-card">
            <div className="folder-icon">📁</div>

            <h3>College Memories</h3>

            <p>
              A folder filled with our unforgettable college moments.
            </p>

            <button
              className="open-secret-folder-btn"
              onClick={() => setIsFolderOpen(true)}
            >
              🔐 Open Secret Folder
            </button>
          </div>
        )}

        {isFolderOpen && !isUnlocked && (
          <div className="college-password-card">
            <div className="lock-icon">🔒</div>

            <h3>Folder Locked!</h3>

            <p>
              Enter the secret password to unlock our memories.
            </p>

            <form onSubmit={handleUnlock}>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="Enter secret password..."
                autoComplete="off"
              />

              {error && (
                <p className="college-password-error">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="unlock-folder-btn"
              >
                Unlock Memories ❤️
              </button>
            </form>

            <button
              className="close-folder-btn"
              onClick={closeFolder}
            >
              ← Close Folder
            </button>
          </div>
        )}

        {isFolderOpen && isUnlocked && (
          <div className="college-gallery-wrapper">
            <div className="college-gallery-top">
              <div>
                <span className="unlocked-label">
                  🔓 ACCESS GRANTED
                </span>

                <h3>Our College Memories ❤️</h3>

                <p>
                  Every picture holds a story.
                </p>
              </div>

              <button
                className="lock-folder-again-btn"
                onClick={closeFolder}
              >
                🔒 Lock Folder
              </button>
            </div>

            <div className="college-photo-grid">
              {collegePhotos.map((photo) => (
                <div
                  className="college-photo-card"
                  key={photo.id}
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <div className="college-photo-image">
                    <img
                      src={photo.image}
                      alt={photo.title}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />

                    <div className="college-photo-overlay">
                      <span>❤️ View Memory</span>
                    </div>
                  </div>

                  <div className="college-photo-details">
                    <h4>{photo.title}</h4>
                    <p>{photo.caption}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="college-memory-footer">
              <span>Made with love ❤️</span>
              <p>
                Our college memories will always have a special place
                in my heart.
              </p>
            </div>
          </div>
        )}
      </div>

      {selectedPhoto && (
        <div
          className="college-photo-modal"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            className="college-modal-close"
            onClick={() => setSelectedPhoto(null)}
          >
            ×
          </button>

          <div
            className="college-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedPhoto.image}
              alt={selectedPhoto.title}
            />

            <h3>{selectedPhoto.title}</h3>
            <p>{selectedPhoto.caption}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default CollegeMemories;