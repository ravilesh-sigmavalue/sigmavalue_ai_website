import { useState, useCallback } from "react";
import "./SceneSettingsPanel.css";

// ── Default settings ──────────────────────────────────────────────────────────
export const DEFAULT_SCENE_SETTINGS = {
  treeScale: 1.40,        // sprite scale multiplier (applied to base scale)
  treeCount: 9,           // desktop default
  grassCount: 14,         // desktop default
  windSpeed: 1.0,         // multiplier: 0 = no wind, 2 = fast
  particleSize: 1.0,      // multiplier relative to theme default
  buildingSpeed: 1.0,     // multiplier relative to default rotation speed
};

// ── Mobile-safe caps ─────────────────────────────────────────────────────────
function getMobileCaps() {
  const w = window.innerWidth;
  if (w < 760)  return { maxTrees: 6,  maxGrass: 8 };
  if (w < 1100) return { maxTrees: 9,  maxGrass: 12 };
  return           { maxTrees: 12, maxGrass: 18 };
}

// ── Slider row component ──────────────────────────────────────────────────────
function SliderRow({ icon, label, value, min, max, step = 0.01, displayFn, onChange }) {
  const display = displayFn ? displayFn(value) : value.toFixed(step < 0.1 ? 2 : 0);
  return (
    <div className="scene-settings-row">
      <div className="scene-settings-row-header">
        <span className="scene-settings-row-name">
          <span className="scene-settings-row-icon">{icon}</span>
          {label}
        </span>
        <span className="scene-settings-row-value">{display}</span>
      </div>
      <input
        type="range"
        className="scene-settings-slider"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
      />
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export function SceneSettingsPanel({ settingsRef }) {
  const [open, setOpen] = useState(false);
  const caps = getMobileCaps();

  // Local UI state mirrors what's in settingsRef
  const [vals, setVals] = useState({ ...DEFAULT_SCENE_SETTINGS });

  const update = useCallback((key, value) => {
    const next = { ...settingsRef.current, [key]: value };
    settingsRef.current = next;
    setVals({ ...next });
  }, [settingsRef]);

  const reset = useCallback(() => {
    settingsRef.current = { ...DEFAULT_SCENE_SETTINGS };
    setVals({ ...DEFAULT_SCENE_SETTINGS });
  }, [settingsRef]);

  const toggle = () => setOpen((o) => !o);
  const close  = () => setOpen(false);

  return (
    <>
      {/* Mobile backdrop */}
      <div
        className={`scene-settings-backdrop${open ? " visible" : ""}`}
        onClick={close}
        aria-hidden="true"
      />

      {/* Toggle button */}
      <button
        id="scene-settings-toggle-btn"
        className={`scene-settings-toggle${open ? " open" : ""}`}
        onClick={toggle}
        aria-label="Toggle scene settings"
        title="Scene Settings"
      >
        ⚙
      </button>

      {/* Panel */}
      <div
        id="scene-settings-panel"
        className={`scene-settings-panel${open ? " open" : ""}`}
        role="dialog"
        aria-label="Scene Settings"
      >
        {/* Mobile drag handle */}
        <div className="scene-settings-drag-handle" />

        {/* Header */}
        <div className="scene-settings-header">
          <span className="scene-settings-title">
            <span className="scene-settings-title-dot" />
            Scene Controls
          </span>
          <button className="scene-settings-reset" onClick={reset}>
            Reset
          </button>
        </div>

        {/* Scrollable body */}
        <div className="scene-settings-body">

          {/* Trees section */}
          <div className="scene-settings-section">
            <div className="scene-settings-section-label">🌳 Trees</div>

            <SliderRow
              icon="📐"
              label="Tree Size"
              value={vals.treeScale}
              min={0.6}
              max={3.0}
              step={0.05}
              displayFn={(v) => `${v.toFixed(2)}×`}
              onChange={(v) => update("treeScale", v)}
            />

            <SliderRow
              icon="🔢"
              label="Tree Count"
              value={vals.treeCount}
              min={2}
              max={caps.maxTrees}
              step={1}
              displayFn={(v) => `${Math.round(v)}`}
              onChange={(v) => update("treeCount", Math.round(v))}
            />

            <SliderRow
              icon="🌿"
              label="Grass Count"
              value={vals.grassCount}
              min={2}
              max={caps.maxGrass}
              step={1}
              displayFn={(v) => `${Math.round(v)}`}
              onChange={(v) => update("grassCount", Math.round(v))}
            />

            <SliderRow
              icon="💨"
              label="Wind Speed"
              value={vals.windSpeed}
              min={0}
              max={3.0}
              step={0.05}
              displayFn={(v) => `${v.toFixed(2)}×`}
              onChange={(v) => update("windSpeed", v)}
            />
          </div>

          {/* Particles section */}
          <div className="scene-settings-section">
            <div className="scene-settings-section-label">✨ Particles</div>

            <SliderRow
              icon="🔘"
              label="Particle Size"
              value={vals.particleSize}
              min={0.2}
              max={3.0}
              step={0.05}
              displayFn={(v) => `${v.toFixed(2)}×`}
              onChange={(v) => update("particleSize", v)}
            />
          </div>

          {/* Building section */}
          <div className="scene-settings-section">
            <div className="scene-settings-section-label">🏢 Building</div>

            <SliderRow
              icon="🔄"
              label="Rotation Speed"
              value={vals.buildingSpeed}
              min={0}
              max={4.0}
              step={0.05}
              displayFn={(v) => v === 0 ? "Off" : `${v.toFixed(2)}×`}
              onChange={(v) => update("buildingSpeed", v)}
            />
          </div>

        </div>
      </div>
    </>
  );
}
