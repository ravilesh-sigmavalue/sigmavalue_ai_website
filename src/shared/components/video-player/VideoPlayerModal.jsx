import { useCallback, useEffect, useRef, useState } from "react";
import { Modal, Badge, Button } from "react-bootstrap";
import {
  FiX,
  FiPlay,
  FiPause,
  FiVolume2,
  FiVolumeX,
  FiMaximize,
  FiMinimize,
  FiRotateCcw,
  FiExternalLink,
  FiFilm,
} from "react-icons/fi";
import "./video-player.css";

const DEFAULT_VIDEO_URL =
  "https://sigmavalue-all-media.s3.ap-south-1.amazonaws.com/valuation+landing+page+assets/Valuation_vercel.mp4";

export function VideoPlayerModal({
  show,
  onHide,
  videoSrc = DEFAULT_VIDEO_URL,
  title = "Valuation B2C",
  subtitle = "Consumer-focused property valuation providing quick, accessible estimates of residential property value.",
  badge = "MEDIA PLAYER · VALUATION B2C",
  externalLink = "https://sigmavalue.ai/valuation/",
  theme,
}) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.9);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Detect current theme (light or dark)
  const isLight =
    theme === "light" ||
    (typeof document !== "undefined" && document.documentElement.dataset.theme === "light");

  // Play / Pause toggle
  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused || video.ended) {
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Autoplay policy might require mute
          video.muted = true;
          setIsMuted(true);
          video.play().then(() => setIsPlaying(true)).catch(() => {});
        });
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, []);

  // Handle Autoplay & Cleanup on Modal show/hide
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (show) {
      setIsLoading(true);
      video.currentTime = 0;
      setCurrentTime(0);
      video.volume = volume;
      video.muted = isMuted;

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setIsLoading(false);
          })
          .catch(() => {
            // If browser blocks unmuted autoplay, try muted autoplay
            video.muted = true;
            setIsMuted(true);
            video
              .play()
              .then(() => {
                setIsPlaying(true);
                setIsLoading(false);
              })
              .catch(() => {
                setIsPlaying(false);
                setIsLoading(false);
              });
          });
      }
    } else {
      video.pause();
      setIsPlaying(false);
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    }
  }, [show]);

  // Video event handlers
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration || 0);
      setIsLoading(false);
    }
  };

  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    setCurrentTime(seekTime);
    if (videoRef.current) {
      videoRef.current.currentTime = seekTime;
    }
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (videoRef.current) {
      videoRef.current.volume = newVol;
      videoRef.current.muted = newVol === 0;
      setIsMuted(newVol === 0);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
    if (!nextMuted && volume === 0) {
      setVolume(0.5);
      videoRef.current.volume = 0.5;
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current
        .requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch((err) => console.error("Fullscreen error:", err));
    } else {
      document
        .exitFullscreen()
        .then(() => setIsFullscreen(false))
        .catch((err) => console.error("Exit fullscreen error:", err));
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const handleRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePlaybackSpeedChange = () => {
    const speeds = [1, 1.25, 1.5, 2];
    const nextIndex = (speeds.indexOf(playbackRate) + 1) % speeds.length;
    const nextRate = speeds[nextIndex];
    setPlaybackRate(nextRate);
    if (videoRef.current) {
      videoRef.current.playbackRate = nextRate;
    }
  };

  // Auto-hide controls when mouse is inactive during playback
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2500);
    }
  };

  // Keyboard shortcut listener (Space = play/pause, M = mute, F = fullscreen, Esc = close)
  useEffect(() => {
    if (!show) return undefined;

    const handleKeyDown = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
      } else if (e.code === "KeyM") {
        e.preventDefault();
        toggleMute();
      } else if (e.code === "KeyF") {
        e.preventDefault();
        toggleFullscreen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [show, togglePlay, toggleMute]);

  // Format time (mm:ss)
  const formatTime = (secs) => {
    if (isNaN(secs) || secs < 0) return "00:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="xl"
      dialogClassName="video-player-modal-dialog"
      contentClassName={`video-player-modal-content ${isLight ? "light-mode" : "dark-mode"}`}
      backdropClassName="video-player-backdrop"
    >
      <Modal.Header className="video-player-header">
        <div className="video-player-header-left">
          <div className="video-player-badge-wrap">
            <Badge className="video-player-badge">
              <FiFilm className="badge-icon" /> {badge}
            </Badge>
            <span className="video-player-live-indicator">
              <span className="live-dot" /> LIVE PREVIEW
            </span>
          </div>
          <Modal.Title className="video-player-title">{title}</Modal.Title>
          <p className="video-player-subtitle">{subtitle}</p>
        </div>
        <div className="video-player-header-right">
          {externalLink && (
            <a
              href={externalLink}
              target="_blank"
              rel="noreferrer"
              className="video-player-action-btn launch-btn"
              title="Open full Valuation B2C application"
            >
              <span>Visit Platform</span>
              <FiExternalLink />
            </a>
          )}
          <Button
            variant="link"
            onClick={onHide}
            className="video-player-close-btn"
            aria-label="Close video player"
          >
            <FiX />
          </Button>
        </div>
      </Modal.Header>

      <Modal.Body className="video-player-body">
        <div
          ref={containerRef}
          className={`video-player-container ${!showControls && isPlaying ? "hide-controls" : ""}`}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => isPlaying && setShowControls(false)}
        >
          {/* Ambient Video Glow */}
          <div className="video-ambient-glow" />

          {/* HTML5 Video Element */}
          <video
            ref={videoRef}
            src={videoSrc}
            className="video-player-element"
            playsInline
            onClick={togglePlay}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onWaiting={() => setIsLoading(true)}
            onPlaying={() => {
              setIsLoading(false);
              setIsPlaying(true);
            }}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
          />

          {/* Buffering / Loading Spinner */}
          {isLoading && (
            <div className="video-loading-overlay">
              <div className="video-spinner" />
              <span>Buffering stream...</span>
            </div>
          )}

          {/* Big Center Play Button Overlay when paused */}
          {!isPlaying && !isLoading && (
            <button
              type="button"
              className="video-center-play-btn"
              onClick={togglePlay}
              aria-label="Play video"
            >
              <FiPlay />
            </button>
          )}

          {/* Custom Controls Bar Overlay */}
          <div className="video-controls-overlay">
            {/* Progress Bar Scrubber */}
            <div className="video-progress-bar-container">
              <input
                type="range"
                min="0"
                max={duration || 100}
                step="0.1"
                value={currentTime}
                onChange={handleSeek}
                className="video-progress-scrubber"
                style={{
                  "--progress-percent": `${duration ? (currentTime / duration) * 100 : 0}%`,
                }}
                aria-label="Video scrubber"
              />
            </div>

            {/* Bottom Controls Row */}
            <div className="video-controls-row">
              <div className="video-controls-left">
                {/* Play/Pause */}
                <button
                  type="button"
                  className="control-icon-btn play-pause-btn"
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pause" : "Play"}
                  title={isPlaying ? "Pause (Space)" : "Play (Space)"}
                >
                  {isPlaying ? <FiPause /> : <FiPlay />}
                </button>

                {/* Restart */}
                <button
                  type="button"
                  className="control-icon-btn"
                  onClick={handleRestart}
                  aria-label="Restart video"
                  title="Restart"
                >
                  <FiRotateCcw />
                </button>

                {/* Volume & Mute */}
                <div className="video-volume-group">
                  <button
                    type="button"
                    className="control-icon-btn"
                    onClick={toggleMute}
                    aria-label={isMuted ? "Unmute" : "Mute"}
                    title={isMuted ? "Unmute (M)" : "Mute (M)"}
                  >
                    {isMuted || volume === 0 ? <FiVolumeX /> : <FiVolume2 />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="volume-slider"
                    style={{
                      "--vol-percent": `${(isMuted ? 0 : volume) * 100}%`,
                    }}
                    aria-label="Volume slider"
                  />
                </div>

                {/* Timestamp Display */}
                <div className="video-timestamp">
                  <span>{formatTime(currentTime)}</span>
                  <span className="timestamp-divider">/</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              <div className="video-controls-right">
                {/* Playback Speed */}
                <button
                  type="button"
                  className="control-text-btn speed-btn"
                  onClick={handlePlaybackSpeedChange}
                  title="Playback Speed"
                >
                  {playbackRate}x
                </button>

                {/* Fullscreen */}
                <button
                  type="button"
                  className="control-icon-btn"
                  onClick={toggleFullscreen}
                  aria-label={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                  title={isFullscreen ? "Exit Fullscreen (F)" : "Fullscreen (F)"}
                >
                  {isFullscreen ? <FiMinimize /> : <FiMaximize />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
