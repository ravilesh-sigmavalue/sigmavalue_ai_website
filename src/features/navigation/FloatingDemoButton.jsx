import { FiArrowUpRight } from "react-icons/fi";
import { CHAPTERS } from "../experience/data/chapters";

export function FloatingDemoButton({
  go,
  onRequestDemo,
  show = true,
}) {
  if (!show) {
    return null;
  }

  const handleClick = () => {
    if (onRequestDemo) {
      onRequestDemo();
      return;
    }

    go?.(CHAPTERS.length - 1);
  };

  return (
    <button
      className="floating-demo-pill"
      type="button"
      onClick={handleClick}
      aria-label="Request a personalized SigmaValue demo"
    >
      <span>Request a Demo</span>

      <FiArrowUpRight
        aria-hidden="true"
      />
    </button>
  );
}
