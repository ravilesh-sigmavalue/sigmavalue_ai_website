import { FiArrowUpRight } from "react-icons/fi";
import { CHAPTERS } from "../experience/data/chapters";

export function FloatingDemoButton({ go }) {
  return <button className="floating-demo-pill" type="button" onClick={() => go && go(CHAPTERS.length - 1)}><span>Request a Demo</span><FiArrowUpRight /></button>;
}
