import { useEffect, useState } from "react";
import { CHAPTERS } from "./data/chapters";
import { useChapterScroll } from "./hooks/useChapterScroll";
import { WebGLBackground } from "./components/WebGLBackground";
import { ContactChapter } from "./components/ChapterStage";
import { ServiceConstellation } from "./components/ServiceConstellation";
import { AnnouncementBadge, AskBar, FloatingDemoButton, LeftCategoryNav, LiveSiteBadge, Loader, Pager, ScrollCue, TopNav } from "./components/Chrome";
import { SiteDrawer } from "./components/SiteDrawer";

export function DesignTwo() {
  const { active, goToChapter } = useChapterScroll(CHAPTERS.length);
  const [drawer, setDrawer] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem("sv-design2-theme") === "light" ? "light" : "dark");
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("sv-design2-theme", theme);
  }, [theme]);
  const chapter = CHAPTERS[active];
  return <><Loader /><div id="scroll-spacer" style={{ height: `${CHAPTERS.length * 100}vh` }} /><div id="stage"><WebGLBackground chapters={CHAPTERS} active={active} theme={theme} /><AnnouncementBadge show={active === 0} /><LiveSiteBadge /><TopNav go={goToChapter} onMenu={() => setDrawer(true)} theme={theme} onTheme={() => setTheme((t) => t === "dark" ? "light" : "dark")} /><Pager active={active} go={goToChapter} /><LeftCategoryNav active={active} go={goToChapter} /><AskBar show={active > 0} />{(chapter.key === "hero" || chapter.key === "ch") && <ServiceConstellation chapters={CHAPTERS} active={active} theme={theme} />}<ContactChapter show={chapter.key === "contact"} title={chapter.title} /><FloatingDemoButton /><SiteDrawer open={drawer} setOpen={setDrawer} go={goToChapter} theme={theme} /><ScrollCue show={active === 0} /></div></>;
}
