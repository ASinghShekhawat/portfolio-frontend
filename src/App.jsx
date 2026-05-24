import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import AuroraBackground from "./components/AuroraBackground";
import HomePage from "./components/pages/HomePage";
import SocialLinks from "./components/SocialLinks";
import GeneralFooter from "./components/GeneralFooter";
import CustomCursor from "./components/effects/CustomCursor";
import ScrollRail from "./components/effects/ScrollRail";
import AchievementSystem from "./components/effects/AchievementSystem";

const AboutPage = lazy(() => import("./components/pages/AboutPage"));

function App() {
  return (
    <>
      <AuroraBackground />
      <CustomCursor />
      <ScrollRail />
      <SocialLinks />
      <AchievementSystem />

      <main>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about-me" element={<AboutPage />} />
          </Routes>
        </Suspense>
      </main>

      <GeneralFooter />
    </>
  );
}

export default App;
