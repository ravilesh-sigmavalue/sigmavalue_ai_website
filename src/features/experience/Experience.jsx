import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { CHAPTERS } from "./data/chapters";
import { useChapterScroll } from "./hooks/useChapterScroll";

import { WebGLBackground } from "../scene/WebGLBackground";
import { ChapterStage } from "./ChapterStage";

import {
  TerrainContactChapter as ContactChapter,
} from "../contact/TerrainContactChapter";

import { AskBar } from "../navigation/AskBar";
import { FloatingDemoButton } from "../navigation/FloatingDemoButton";
import { LeftCategoryNav } from "../navigation/LeftCategoryNav";
import { LiveSiteBadge } from "../navigation/LiveSiteBadge";
import { Loader } from "../navigation/Loader";
import { ScrollCue } from "../navigation/ScrollCue";
import { Header } from "../navigation/Header";
import { SiteDrawer } from "../navigation/SiteDrawer";

import { MobileExperience } from "../mobile/MobileExperience";

import {
  SceneSettingsPanel,
  DEFAULT_SCENE_SETTINGS,
} from "../scene/SceneSettingsPanel";

import { RequestDemoModal } from "../request-demo/RequestDemoModal";
import { AboutUsPage } from "../about/AboutUsPage";

import {
  TechnologyTransformationModal,
} from "../solutions/TechnologyTransformationModal";

import {
  IntelligenceDecisionMakingModal,
} from "../solutions/IntelligenceDecisionMakingModal";

import {
  StrategicAdvisoryModal,
} from "../solutions/StrategicAdvisoryModal";

import "../../shared/components/modal/modal.css";

const MOBILE_EXPERIENCE_QUERY = "(max-width: 620px)";

function useMobileLayout() {
  const getInitialState = () => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.matchMedia(MOBILE_EXPERIENCE_QUERY).matches;
  };

  const [mobile, setMobile] = useState(getInitialState);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const media = window.matchMedia(MOBILE_EXPERIENCE_QUERY);

    const sync = () => {
      setMobile(media.matches);
    };

    sync();
    media.addEventListener("change", sync);

    return () => {
      media.removeEventListener("change", sync);
    };
  }, []);

  return mobile;
}

export function Experience() {
  const [
    technologyTransformationOpen,
    setTechnologyTransformationOpen,
  ] = useState(false);

  const [
    intelligenceDecisionMakingOpen,
    setIntelligenceDecisionMakingOpen,
  ] = useState(false);

  const [
    strategicAdvisoryOpen,
    setStrategicAdvisoryOpen,
  ] = useState(false);

  const [drawer, setDrawer] = useState(false);
  const [requestDemoOpen, setRequestDemoOpen] = useState(false);
  const [aboutUsOpen, setAboutUsOpen] = useState(false);
  const [aboutUsTab, setAboutUsTab] = useState("team");

  const { active, goToChapter } = useChapterScroll(CHAPTERS.length);

  const theme = "dark";
  const useDedicatedMobileExperience = useMobileLayout();

  const settingsRef = useRef({
    ...DEFAULT_SCENE_SETTINGS,
  });

  useEffect(() => {
    document.documentElement.dataset.theme = "dark";
    localStorage.setItem("sv-theme", "dark");
  }, []);

  useEffect(() => {
    if (!useDedicatedMobileExperience) {
      return;
    }

    setDrawer(false);
    setRequestDemoOpen(false);
    setAboutUsOpen(false);
    setTechnologyTransformationOpen(false);
    setIntelligenceDecisionMakingOpen(false);
    setStrategicAdvisoryOpen(false);
  }, [useDedicatedMobileExperience]);

  const chapter = CHAPTERS[active];

  const openDrawer = () => {
    setDrawer(true);
  };

  const closeDrawer = () => {
    setDrawer(false);
  };

  const closeSolutionScreens = () => {
    setTechnologyTransformationOpen(false);
    setIntelligenceDecisionMakingOpen(false);
    setStrategicAdvisoryOpen(false);
  };

  const openTechnologyTransformation = () => {
    closeDrawer();
    setAboutUsOpen(false);
    setIntelligenceDecisionMakingOpen(false);
    setStrategicAdvisoryOpen(false);
    setTechnologyTransformationOpen(true);
  };

  const openIntelligenceDecisionMaking = () => {
    closeDrawer();
    setAboutUsOpen(false);
    setTechnologyTransformationOpen(false);
    setStrategicAdvisoryOpen(false);
    setIntelligenceDecisionMakingOpen(true);
  };

  const openStrategicAdvisory = () => {
    closeDrawer();
    setAboutUsOpen(false);
    setTechnologyTransformationOpen(false);
    setIntelligenceDecisionMakingOpen(false);
    setStrategicAdvisoryOpen(true);
  };

  const openAboutUs = (tab = "team") => {
    closeDrawer();
    closeSolutionScreens();
    setAboutUsTab(tab);
    setAboutUsOpen(true);
  };

  const openRequestDemo = () => {
    closeDrawer();
    setRequestDemoOpen(true);
  };

  if (useDedicatedMobileExperience) {
    return <MobileExperience theme={theme} onTheme={() => { }} />;
  }

  if (technologyTransformationOpen) {
    const navigateFromTechnology = (index) => {
      closeDrawer();
      setTechnologyTransformationOpen(false);

      requestAnimationFrame(() => {
        goToChapter(index);
      });
    };

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="technology-transformation"
          className="experience-overlay-screen technology-transformation-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Header
            go={navigateFromTechnology}
            onMenu={openDrawer}
            onRequestDemo={() => {
              setTechnologyTransformationOpen(false);
              openRequestDemo();
            }}
            onAboutUs={openAboutUs}
            onTechnologyTransformation={closeDrawer}
            onIntelligenceDecisionMaking={openIntelligenceDecisionMaking}
            onStrategicAdvisory={openStrategicAdvisory}
          />

          <TechnologyTransformationModal
            show={true}
            onRequestDemo={() => {
              setTechnologyTransformationOpen(false);
              openRequestDemo();
            }}
          />

          <SiteDrawer
            open={drawer}
            setOpen={setDrawer}
            go={navigateFromTechnology}
            theme={theme}
            onRequestDemo={() => {
              setTechnologyTransformationOpen(false);
              openRequestDemo();
            }}
            onAboutUs={openAboutUs}
            onTechnologyTransformation={closeDrawer}
            onIntelligenceDecisionMaking={openIntelligenceDecisionMaking}
            onStrategicAdvisory={openStrategicAdvisory}
          />
        </motion.div>
      </AnimatePresence>
    );
  }

  if (intelligenceDecisionMakingOpen) {
    const navigateFromIntelligence = (index) => {
      closeDrawer();
      setIntelligenceDecisionMakingOpen(false);

      requestAnimationFrame(() => {
        goToChapter(index);
      });
    };

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="intelligence-decision-making"
          className="experience-overlay-screen intelligence-decision-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Header
            go={navigateFromIntelligence}
            onMenu={openDrawer}
            onRequestDemo={() => {
              setIntelligenceDecisionMakingOpen(false);
              openRequestDemo();
            }}
            onAboutUs={openAboutUs}
            onTechnologyTransformation={openTechnologyTransformation}
            onIntelligenceDecisionMaking={closeDrawer}
            onStrategicAdvisory={openStrategicAdvisory}
          />

          <IntelligenceDecisionMakingModal
            show={true}
            onRequestDemo={() => {
              setIntelligenceDecisionMakingOpen(false);
              openRequestDemo();
            }}
          />

          <SiteDrawer
            open={drawer}
            setOpen={setDrawer}
            go={navigateFromIntelligence}
            theme={theme}
            onRequestDemo={() => {
              setIntelligenceDecisionMakingOpen(false);
              openRequestDemo();
            }}
            onAboutUs={openAboutUs}
            onTechnologyTransformation={openTechnologyTransformation}
            onIntelligenceDecisionMaking={closeDrawer}
            onStrategicAdvisory={openStrategicAdvisory}
          />
        </motion.div>
      </AnimatePresence>
    );
  }

  if (strategicAdvisoryOpen) {
    const navigateFromStrategicAdvisory = (index) => {
      closeDrawer();
      setStrategicAdvisoryOpen(false);

      requestAnimationFrame(() => {
        goToChapter(index);
      });
    };

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="strategic-advisory"
          className="experience-overlay-screen strategic-advisory-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Header
            go={navigateFromStrategicAdvisory}
            onMenu={openDrawer}
            onRequestDemo={() => {
              setStrategicAdvisoryOpen(false);
              openRequestDemo();
            }}
            onAboutUs={openAboutUs}
            onTechnologyTransformation={openTechnologyTransformation}
            onIntelligenceDecisionMaking={openIntelligenceDecisionMaking}
            onStrategicAdvisory={closeDrawer}
          />

          <StrategicAdvisoryModal
            show={true}
            onRequestDemo={() => {
              setStrategicAdvisoryOpen(false);
              openRequestDemo();
            }}
          />

          <SiteDrawer
            open={drawer}
            setOpen={setDrawer}
            go={navigateFromStrategicAdvisory}
            theme={theme}
            onRequestDemo={() => {
              setStrategicAdvisoryOpen(false);
              openRequestDemo();
            }}
            onAboutUs={openAboutUs}
            onTechnologyTransformation={openTechnologyTransformation}
            onIntelligenceDecisionMaking={openIntelligenceDecisionMaking}
            onStrategicAdvisory={closeDrawer}
          />
        </motion.div>
      </AnimatePresence>
    );
  }

  if (aboutUsOpen) {
    const navigateFromAbout = (index) => {
      closeDrawer();
      setAboutUsOpen(false);

      requestAnimationFrame(() => {
        goToChapter(index);
      });
    };

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="about-us"
          className="experience-overlay-screen experience-overlay-scroll about-us-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Header
            go={navigateFromAbout}
            onMenu={openDrawer}
            onRequestDemo={openRequestDemo}
            onAboutUs={(tab) => {
              setAboutUsTab(tab);
            }}
            onTechnologyTransformation={openTechnologyTransformation}
            onIntelligenceDecisionMaking={openIntelligenceDecisionMaking}
            onStrategicAdvisory={openStrategicAdvisory}
          />

          <AboutUsPage
            initialTab={aboutUsTab}
            onRequestDemo={openRequestDemo}
            onExplore={() => {
              navigateFromAbout(1);
            }}
          />

          <SiteDrawer
            open={drawer}
            setOpen={setDrawer}
            go={navigateFromAbout}
            theme={theme}
            onRequestDemo={openRequestDemo}
            onAboutUs={(tab) => {
              setAboutUsTab(tab);
              closeDrawer();
            }}
            onTechnologyTransformation={openTechnologyTransformation}
            onIntelligenceDecisionMaking={openIntelligenceDecisionMaking}
            onStrategicAdvisory={openStrategicAdvisory}
          />

          <RequestDemoModal
            open={requestDemoOpen}
            onClose={() => {
              setRequestDemoOpen(false);
            }}
          />
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <>
      <Loader />

      <div
        id="scroll-spacer"
        style={{
          height: `${CHAPTERS.length * 100}vh`,
        }}
      />

      <div id="stage">
        <WebGLBackground
          chapters={CHAPTERS}
          active={active}
          theme={theme}
          settingsRef={settingsRef}
        />

        <LiveSiteBadge />

        <Header
          go={goToChapter}
          onMenu={openDrawer}
          onRequestDemo={openRequestDemo}
          onAboutUs={openAboutUs}
          onTechnologyTransformation={openTechnologyTransformation}
          onIntelligenceDecisionMaking={openIntelligenceDecisionMaking}
          onStrategicAdvisory={openStrategicAdvisory}
        />

        <LeftCategoryNav active={active} go={goToChapter} />

        <AskBar show={active > 0} />

        <ChapterStage
          chapters={CHAPTERS}
          active={active}
          theme={theme}
        />

        <ContactChapter
          show={chapter?.key === "contact"}
          title={chapter?.title}
          onClose={() => {
            goToChapter(0);
          }}
        />

        <FloatingDemoButton go={goToChapter} />

        <SiteDrawer
          open={drawer}
          setOpen={setDrawer}
          go={goToChapter}
          theme={theme}
          onRequestDemo={openRequestDemo}
          onAboutUs={openAboutUs}
          onTechnologyTransformation={openTechnologyTransformation}
          onIntelligenceDecisionMaking={openIntelligenceDecisionMaking}
          onStrategicAdvisory={openStrategicAdvisory}
        />

        <ScrollCue show={active === 0} />

        <SceneSettingsPanel settingsRef={settingsRef} />
      </div>

      <RequestDemoModal
        open={requestDemoOpen}
        onClose={() => {
          setRequestDemoOpen(false);
        }}
      />
    </>
  );
}
