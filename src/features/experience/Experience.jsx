import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CHAPTERS } from "./data/chapters";
import { useChapterScroll } from "./hooks/useChapterScroll";
import { WebGLBackground } from "../scene/WebGLBackground";
import { ChapterStage } from "./ChapterStage";
import { TerrainContactChapter as ContactChapter } from "../contact/TerrainContactChapter";
import { AskBar } from "../navigation/AskBar";
import { FloatingDemoButton } from "../navigation/FloatingDemoButton";
import { LeftCategoryNav } from "../navigation/LeftCategoryNav";
import { LiveSiteBadge } from "../navigation/LiveSiteBadge";
import { Loader } from "../navigation/Loader";
import { ScrollCue } from "../navigation/ScrollCue";
import { Header } from "../navigation/Header";
import { SiteDrawer } from "../navigation/SiteDrawer";
import { MobileExperience } from "../mobile/MobileExperience";
import { SceneSettingsPanel, DEFAULT_SCENE_SETTINGS } from "../scene/SceneSettingsPanel";
import { RequestDemoModal } from "../request-demo/RequestDemoModal";
import { AboutUsPage } from "../about/AboutUsPage";
import "../../shared/components/modal/modal.css";

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

export function Experience() {
  const { active, goToChapter } = useChapterScroll(CHAPTERS.length);
  const [drawer, setDrawer] = useState(false);
  const [requestDemoOpen, setRequestDemoOpen] = useState(false);
  const [aboutUsOpen, setAboutUsOpen] = useState(false);
  const [aboutUsTab, setAboutUsTab] = useState("team");
  // Dark theme is the only active desktop/mobile theme for now.
  // Light-theme preference and switching remain disabled with the UI toggles.
  const theme = "dark";
  const mobile = useMobileLayout();
  // Shared ref: written by SceneSettingsPanel, read every frame by WebGLBackground
  const settingsRef = useRef({ ...DEFAULT_SCENE_SETTINGS });
  useEffect(() => {
    document.documentElement.dataset.theme = "dark";
    localStorage.setItem("sv-theme", "dark");
  }, []);
  const chapter = CHAPTERS[active];
  if (mobile) return <MobileExperience theme={theme} onTheme={() => {}} />;
  if (aboutUsOpen) {
    const navigateFromAbout = (index) => {
      setAboutUsOpen(false);
      requestAnimationFrame(() => goToChapter(index));
    };
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="about-us"
          style={{ position: "fixed", inset: 0, zIndex: 999, overflow: "auto" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Header
            go={navigateFromAbout}
            onMenu={() => setDrawer(true)}
            onRequestDemo={() => setRequestDemoOpen(true)}
            onAboutUs={(tab) => setAboutUsTab(tab)}
            theme={theme}
            onTheme={() => {}}
          />
          <AboutUsPage
            initialTab={aboutUsTab}
            onRequestDemo={() => setRequestDemoOpen(true)}
            onExplore={() => navigateFromAbout(1)}
          />
          <RequestDemoModal open={requestDemoOpen} onClose={() => setRequestDemoOpen(false)} />
        </motion.div>
      </AnimatePresence>
    );
  }
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
          onAboutUs={(tab) => {
            setAboutUsTab(tab);
            setAboutUsOpen(true);
          }}
          theme={theme}
          onTheme={() => {}}
        />
        <LeftCategoryNav active={active} go={goToChapter} />
        <AskBar show={active > 0} />
        <ChapterStage chapters={CHAPTERS} active={active} theme={theme} />
        <ContactChapter show={chapter.key === "contact"} title={chapter.title} onClose={() => goToChapter(0)} />
        {/* ── KEY BENEFITS & WHAT WE OFFER ── */}
        <FloatingDemoButton go={goToChapter} />
        <SiteDrawer open={drawer} setOpen={setDrawer} go={goToChapter} theme={theme} />
        <ScrollCue show={active === 0} />
        <SceneSettingsPanel settingsRef={settingsRef} />
      </div>
      <RequestDemoModal open={requestDemoOpen} onClose={() => setRequestDemoOpen(false)} />
    </>
  );
}
