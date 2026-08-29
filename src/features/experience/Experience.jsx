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


function useMobileLayout() {
  const [mobile, setMobile] = useState(() =>
    window.matchMedia("(max-width: 768px)").matches
  );

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");

    const sync = () => {
      setMobile(media.matches);
    };

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

  const [
    drawer,
    setDrawer,
  ] = useState(false);

  const [
    requestDemoOpen,
    setRequestDemoOpen,
  ] = useState(false);

  const [
    aboutUsOpen,
    setAboutUsOpen,
  ] = useState(false);

  const [
    aboutUsTab,
    setAboutUsTab,
  ] = useState("team");

  const {
    active,
    goToChapter,
  } = useChapterScroll(CHAPTERS.length);

  const theme = "dark";

  const mobile = useMobileLayout();

  const settingsRef = useRef({
    ...DEFAULT_SCENE_SETTINGS,
  });


  useEffect(() => {
    document.documentElement.dataset.theme = "dark";
    localStorage.setItem("sv-theme", "dark");
  }, []);


  const chapter = CHAPTERS[active];


  if (mobile) {
    return (
      <MobileExperience
        theme={theme}
        onTheme={() => { }}
      />
    );
  }


  if (technologyTransformationOpen) {
    const navigateFromTechnology = (index) => {
      setTechnologyTransformationOpen(false);

      requestAnimationFrame(() => {
        goToChapter(index);
      });
    };


    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="technology-transformation"
          className="technology-transformation-screen"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1100,
            overflow: "hidden",
          }}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
        >
          <Header
            go={navigateFromTechnology}

            onMenu={() => {
              setDrawer(true);
            }}

            onRequestDemo={() => {
              setTechnologyTransformationOpen(false);
              setRequestDemoOpen(true);
            }}

            onAboutUs={(tab) => {
              setTechnologyTransformationOpen(false);

              setAboutUsTab(tab);
              setAboutUsOpen(true);
            }}

            onTechnologyTransformation={() => { }}

            onIntelligenceDecisionMaking={() => {
              setTechnologyTransformationOpen(false);
              setIntelligenceDecisionMakingOpen(true);
            }}

            onStrategicAdvisory={() => {
              setTechnologyTransformationOpen(false);
              setStrategicAdvisoryOpen(true);
            }}

            theme={theme}
            onTheme={() => { }}
          />


          <TechnologyTransformationModal
            show={true}

            onRequestDemo={() => {
              setTechnologyTransformationOpen(false);
              setRequestDemoOpen(true);
            }}
          />
        </motion.div>
      </AnimatePresence>
    );
  }


  if (intelligenceDecisionMakingOpen) {
    const navigateFromIntelligence = (index) => {
      setIntelligenceDecisionMakingOpen(false);

      requestAnimationFrame(() => {
        goToChapter(index);
      });
    };


    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="intelligence-decision-making"
          className="intelligence-decision-screen"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1100,
            overflow: "hidden",
          }}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
        >
          <Header
            go={navigateFromIntelligence}

            onMenu={() => {
              setDrawer(true);
            }}

            onRequestDemo={() => {
              setIntelligenceDecisionMakingOpen(false);
              setRequestDemoOpen(true);
            }}

            onAboutUs={(tab) => {
              setIntelligenceDecisionMakingOpen(false);

              setAboutUsTab(tab);
              setAboutUsOpen(true);
            }}

            onTechnologyTransformation={() => {
              setIntelligenceDecisionMakingOpen(false);
              setTechnologyTransformationOpen(true);
            }}

            onIntelligenceDecisionMaking={() => { }}

            onStrategicAdvisory={() => {
              setIntelligenceDecisionMakingOpen(false);
              setStrategicAdvisoryOpen(true);
            }}

            theme={theme}
            onTheme={() => { }}
          />


          <IntelligenceDecisionMakingModal
            show={true}

            onRequestDemo={() => {
              setIntelligenceDecisionMakingOpen(false);
              setRequestDemoOpen(true);
            }}
          />
        </motion.div>
      </AnimatePresence>
    );
  }


  if (strategicAdvisoryOpen) {
    const navigateFromStrategicAdvisory = (index) => {
      setStrategicAdvisoryOpen(false);

      requestAnimationFrame(() => {
        goToChapter(index);
      });
    };


    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="strategic-advisory"
          className="strategic-advisory-screen"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1100,
            overflow: "hidden",
          }}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
        >
          <Header
            go={navigateFromStrategicAdvisory}

            onMenu={() => {
              setDrawer(true);
            }}

            onRequestDemo={() => {
              setStrategicAdvisoryOpen(false);
              setRequestDemoOpen(true);
            }}

            onAboutUs={(tab) => {
              setStrategicAdvisoryOpen(false);

              setAboutUsTab(tab);
              setAboutUsOpen(true);
            }}

            onTechnologyTransformation={() => {
              setStrategicAdvisoryOpen(false);
              setTechnologyTransformationOpen(true);
            }}

            onIntelligenceDecisionMaking={() => {
              setStrategicAdvisoryOpen(false);
              setIntelligenceDecisionMakingOpen(true);
            }}

            onStrategicAdvisory={() => { }}

            theme={theme}
            onTheme={() => { }}
          />


          <StrategicAdvisoryModal
            show={true}

            onRequestDemo={() => {
              setStrategicAdvisoryOpen(false);
              setRequestDemoOpen(true);
            }}
          />
        </motion.div>
      </AnimatePresence>
    );
  }


  if (aboutUsOpen) {
    const navigateFromAbout = (index) => {
      setAboutUsOpen(false);

      requestAnimationFrame(() => {
        goToChapter(index);
      });
    };


    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="about-us"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999,
            overflow: "auto",
          }}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
        >
          <Header
            go={navigateFromAbout}

            onMenu={() => {
              setDrawer(true);
            }}

            onRequestDemo={() => {
              setRequestDemoOpen(true);
            }}

            onAboutUs={(tab) => {
              setAboutUsTab(tab);
            }}

            onTechnologyTransformation={() => {
              setAboutUsOpen(false);
              setTechnologyTransformationOpen(true);
            }}

            onIntelligenceDecisionMaking={() => {
              setAboutUsOpen(false);
              setIntelligenceDecisionMakingOpen(true);
            }}

            onStrategicAdvisory={() => {
              setAboutUsOpen(false);
              setStrategicAdvisoryOpen(true);
            }}

            theme={theme}
            onTheme={() => { }}
          />


          <AboutUsPage
            initialTab={aboutUsTab}

            onRequestDemo={() => {
              setRequestDemoOpen(true);
            }}

            onExplore={() => {
              navigateFromAbout(1);
            }}
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

          onMenu={() => {
            setDrawer(true);
          }}

          onRequestDemo={() => {
            setRequestDemoOpen(true);
          }}

          onAboutUs={(tab) => {
            setAboutUsTab(tab);
            setAboutUsOpen(true);
          }}

          onTechnologyTransformation={() => {
            setTechnologyTransformationOpen(true);
          }}

          onIntelligenceDecisionMaking={() => {
            setIntelligenceDecisionMakingOpen(true);
          }}

          onStrategicAdvisory={() => {
            setStrategicAdvisoryOpen(true);
          }}

          theme={theme}
          onTheme={() => { }}
        />


        <LeftCategoryNav
          active={active}
          go={goToChapter}
        />


        <AskBar
          show={active > 0}
        />


        <ChapterStage
          chapters={CHAPTERS}
          active={active}
          theme={theme}
        />


        <ContactChapter
          show={chapter.key === "contact"}
          title={chapter.title}

          onClose={() => {
            goToChapter(0);
          }}
        />


        <FloatingDemoButton
          go={goToChapter}
        />


        <SiteDrawer
          open={drawer}
          setOpen={setDrawer}
          go={goToChapter}
          theme={theme}
        />


        <ScrollCue
          show={active === 0}
        />


        <SceneSettingsPanel
          settingsRef={settingsRef}
        />
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