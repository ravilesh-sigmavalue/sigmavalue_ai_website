import { useEffect, useState } from "react";
import { DesignOne } from "./designs/design1/DesignOne";
import { DesignTwo } from "./designs/design2/DesignTwo";
import { DesignThree } from "./designs/design3/DesignThree";
import { DesignFour } from "./designs/design4/DesignFour";
import "./designs/design1/design1.css";
import "./designs/design2/design2.css";
import "./designs/design3/design3.css";
import "./designs/design4/design4.css";
import "./design-switcher.css";

const designs = {
  design1: DesignOne,
  design2: DesignTwo,
  design3: DesignThree,
  design4: DesignFour,
};

export default function App() {
  const [design, setDesign] = useState(() => {
    const savedDesign = sessionStorage.getItem("sv-design");
    return designs[savedDesign] ? savedDesign : "design1";
  });
  useEffect(() => {
    sessionStorage.setItem("sv-design", design);
    document.body.dataset.design = design;
    window.scrollTo(0, 0);
  }, [design]);
  const ActiveDesign = designs[design];

  return <div className={`design-root ${design}`}>
    <ActiveDesign />
    <div className="design-switcher" role="group" aria-label="Choose website design">
      <button className={design === "design1" ? "active" : ""} onClick={() => setDesign("design1")}>Design 1</button>
      <button className={design === "design2" ? "active" : ""} onClick={() => setDesign("design2")}>Design 2</button>
      <button className={design === "design3" ? "active" : ""} onClick={() => setDesign("design3")}>Design 3</button>
      <button className={design === "design4" ? "active" : ""} onClick={() => setDesign("design4")}>Design 4</button>
    </div>
  </div>;
}
