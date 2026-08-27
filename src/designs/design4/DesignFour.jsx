import { useEffect, useRef, useState } from "react";
import { CHAPTERS } from "./data/chapters";
import { useChapterScroll } from "./hooks/useChapterScroll";
import { WebGLBackground } from "./components/WebGLBackground";
import { ChapterStage, ContactChapter } from "./components/ChapterStage";
import { AskBar, FloatingDemoButton, LeftCategoryNav, LiveSiteBadge, Loader, ScrollCue } from "./components/Chrome";
import { Header } from "./components/Header";
import { SiteDrawer } from "./components/SiteDrawer";
import { MobileExperience } from "./components/MobileExperience";
import { SceneSettingsPanel, DEFAULT_SCENE_SETTINGS } from "./components/SceneSettingsPanel";
import { RequestDemoModal } from "./components/RequestDemoModal";
import "./ServiceModals.css";

function useMobileLayout() {
  const [mobile, setMobile] = useState(() => window.matchMedia("(max-width: 768px)").matches);
  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const sync = () => setMobile(media.matches);
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);
  return mobile;
}

export function DesignFour() {
  const { active, goToChapter } = useChapterScroll(CHAPTERS.length);
  const [drawer, setDrawer] = useState(false);
  const [requestDemoOpen, setRequestDemoOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem("sv-theme") === "light" ? "light" : "dark");
  const mobile = useMobileLayout();
  // Shared ref: written by SceneSettingsPanel, read every frame by WebGLBackground
  const settingsRef = useRef({ ...DEFAULT_SCENE_SETTINGS });
  useEffect(() => { document.documentElement.dataset.theme = theme; localStorage.setItem("sv-theme", theme); }, [theme]);
  const chapter = CHAPTERS[active];
  if (mobile) return <MobileExperience theme={theme} onTheme={() => setTheme((t) => t === "dark" ? "light" : "dark")} />;
  return (
    <>
      <Loader />
      <div id="scroll-spacer" style={{ height: `${CHAPTERS.length * 100}vh` }} />
      <div id="stage">
        <WebGLBackground chapters={CHAPTERS} active={active} theme={theme} settingsRef={settingsRef} />
        <LiveSiteBadge />
        <Header
          go={goToChapter}
          onMenu={() => setDrawer(true)}
          onRequestDemo={() => setRequestDemoOpen(true)}
          theme={theme}
          onTheme={() => setTheme((t) => t === "dark" ? "light" : "dark")}
        />
        <LeftCategoryNav active={active} go={goToChapter} />
        <AskBar show={active > 0} />
        <ChapterStage chapters={CHAPTERS} active={active} theme={theme} />
        <ContactChapter show={chapter.key === "contact"} title={chapter.title} onClose={() => goToChapter(0)} />
        <FloatingDemoButton go={goToChapter} />
        <SiteDrawer open={drawer} setOpen={setDrawer} go={goToChapter} theme={theme} />
        <ScrollCue show={active === 0} />
        <SceneSettingsPanel settingsRef={settingsRef} />
      </div>
      <RequestDemoModal open={requestDemoOpen} onClose={() => setRequestDemoOpen(false)} />
    </>
  );
}
