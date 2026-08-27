import { useEffect, useState } from "react";

export function Loader() {
  const [hidden, setHidden] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((current) => {
        const next = Math.min(100, current + Math.random() * 28);
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => setHidden(true), 280);
          return 100;
        }
        return next;
      });
    }, 80);
    return () => clearInterval(timer);
  }, []);

  if (hidden) return null;

  return (
    <div id="loader" className={hidden ? "hide" : ""}>
      <div className="loader-box">
        <div className="loader-logo-ring"><img className="loader-logo-img" src="/branding/logo.png" alt="Sigma Value" /></div>
        <div className="loader-mark">SIGMAVALUE</div>
        <div className="loader-sub">Real Estate Intelligence Platform</div>
        <div className="loader-bar-wrap"><div className="loader-bar-fill" style={{ width: `${progress}%` }} /></div>
      </div>
    </div>
  );
}
