import { useEffect } from "react";
import { Experience } from "./features/experience/Experience";
import "./styles/app.css";

export default function App() {
  useEffect(() => {
    sessionStorage.removeItem("sv-design");
    document.body.dataset.design = "design4";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="design-root design4">
      <Experience />
    </div>
  );
}
