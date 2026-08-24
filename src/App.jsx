import { useEffect } from "react";
import { DesignFour } from "./designs/design4/DesignFour";
import "./designs/design4/design4.css";

export default function App() {
  useEffect(() => {
    sessionStorage.removeItem("sv-design");
    document.body.dataset.design = "design4";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="design-root design4">
      <DesignFour />
    </div>
  );
}
