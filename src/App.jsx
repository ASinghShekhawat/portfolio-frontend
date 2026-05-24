import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import AuroraBackground from "./components/AuroraBackground";
import CosmosBackground from "./components/CosmosBackground";
import HomePage from "./components/pages/HomePage";
import SocialLinks from "./components/SocialLinks";
import GeneralFooter from "./components/GeneralFooter";
import CustomCursor from "./components/effects/CustomCursor";
import ScrollRail from "./components/effects/ScrollRail";
import { useTheme } from "./theme/ThemeProvider";

const AboutPage = lazy(() => import("./components/pages/AboutPage"));

function App() {
  const { theme } = useTheme();
  const isAramis = theme === "aramis";

  return (
    <>
      {isAramis ? <CosmosBackground /> : <AuroraBackground />}
      <CustomCursor />
      <ScrollRail />
      <SocialLinks />

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
