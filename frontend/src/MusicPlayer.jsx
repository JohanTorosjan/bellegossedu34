import { useState, useRef, useEffect, useCallback } from "react";

// 🎵 Place tes fichiers audio dans /public/music/
// puis liste-les ici :
const MUSIC_FILES = [
  "/music/boss.mp3",
  "/music/ciel.mp3",
    "/music/copines.mp3",

      "/music/gledemon.mp3",

        "/music/monbb.mp3",

          "/music/zoutramzou.mp3",

  // Ajoute autant de pistes que tu veux...
];

function getRandomTrack(exclude = null) {
  const available = MUSIC_FILES.filter((f) => f !== exclude);
  if (available.length === 0) return MUSIC_FILES[0];
  return available[Math.floor(Math.random() * available.length)];
}

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [ripple, setRipple] = useState(false);
  const audioRef = useRef(null);

  // Quand la piste se termine, on en lance une nouvelle aléatoire
  const handleEnded = useCallback(() => {
    const next = getRandomTrack(currentTrack);
    setCurrentTrack(next);
  }, [currentTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, [handleEnded]);

  // Lance une nouvelle piste quand currentTrack change (et qu'on joue)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;
    audio.src = currentTrack;
    if (isPlaying) {
      audio.play().catch(console.error);
    }
  }, [currentTrack]); // eslint-disable-line

  const handleClick = () => {
    // Animation ripple
    setRipple(true);
    setTimeout(() => setRipple(false), 600);

    const audio = audioRef.current;

    if (isPlaying) {
      // Pause
      audio.pause();
      setIsPlaying(false);
    } else {
      // Lance une piste aléatoire (différente de la précédente)
      const next = getRandomTrack(currentTrack);
      setCurrentTrack(next);
      setIsPlaying(true);
      // La lecture démarre via le useEffect ci-dessus
    }
  };

  return (
    <>
      <audio ref={audioRef} />

      <button
        onClick={handleClick}
        aria-label={isPlaying ? "Pause la musique" : "Lancer une musique aléatoire"}
        style={{
          position: "fixed",
          bottom: "4dvh",
          right: "4dvw",
          zIndex: 9999,
          width: "10dvw",
          height: "10dvw",
          borderRadius: "50%",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: isPlaying
            ? "linear-gradient(135deg, #c8a2c8, #aa3bff)"
            : "linear-gradient(135deg, #c8a2c8, #ff2e93)",
          boxShadow: isPlaying
            ? "0 0 0 4px rgba(249,115,22,0.25), 0 4px 20px rgba(239,68,68,0.4)"
            : "0 4px 20px rgba(99,102,241,0.4)",
          transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
          transform: ripple ? "scale(0.92)" : "scale(1)",
          overflow: "hidden",
        }}
      >
        {/* Icône Play / Pause en SVG pur */}
        {isPlaying ? (
          // Icône Pause
          <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
            <rect x="6" y="5" width="4" height="14" rx="1" />
            <rect x="14" y="5" width="4" height="14" rx="1" />
          </svg>
        ) : (
          // Icône Play
          <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
            <polygon points="6,4 20,12 6,20" />
          </svg>
        )}

        {/* Pulse animé quand lecture en cours */}
        {isPlaying && (
          <span
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.15)",
              animation: "musicPulse 1.5s ease-in-out infinite",
            }}
          />
        )}
      </button>

      {/* Keyframes injectés en JS pour ne pas dépendre d'un fichier CSS global */}
      <style>{`
        @keyframes musicPulse {
          0%   { transform: scale(1);   opacity: 0.6; }
          50%  { transform: scale(1.5); opacity: 0;   }
          100% { transform: scale(1);   opacity: 0;   }
        }
      `}</style>
    </>
  );
}