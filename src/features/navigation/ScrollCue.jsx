export function ScrollCue({
  show,
  label = "Scroll to explore",
}) {
  return (
    <div
      id="cue"
      className={show ? "show" : ""}
      aria-hidden={!show}
    >
      <span>{label}</span>

      <span
        className="scroll-track"
        aria-hidden="true"
      >
        <span className="scroll-thumb" />
      </span>
    </div>
  );
}
