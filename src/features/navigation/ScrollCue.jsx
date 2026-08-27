export function ScrollCue({ show }) {
  return <div id="cue" className={show ? "show" : ""}><span>Scroll to explore</span><div className="scroll-track"><div className="scroll-thumb" /></div></div>;
}
