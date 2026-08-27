import { CATEGORIES, CHAPTERS } from "../experience/data/chapters";

export function LeftCategoryNav({ active, go }) {
  const currentChapter = CHAPTERS[active] || {};
  return (
    <div id="leftNav" className={active > 0 ? "show" : ""}>
      <div className="nav-label">SECTIONS</div>
      <div className="category-list">
        {CATEGORIES.map((category) => {
          const targetIndex = CHAPTERS.findIndex((chapter) => chapter.cat === category);
          return (
            <button key={category} className={`cat-item ${currentChapter.cat === category ? "active" : ""}`} onClick={() => targetIndex >= 0 && go(targetIndex)}>
              <span className="indicator-line" /><span className="cat-name">{category}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
