import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { Experience } from "./features/experience/Experience";
import PricingPage from "./features/pricing/PricingPage";

import "./styles/app.css";

export default function App() {
  useEffect(() => {
    sessionStorage.removeItem("sv-design");
    document.body.dataset.design = "design4";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="design-root design4">
      <Routes>
        <Route path="/" element={<Experience />} />

        <Route
          path="/pricing"
          element={<PricingPage />}
        />
      </Routes>
    </div>
  );
}
