import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import AuroraBackground from "./components/AuroraBackground";
import HomePage from "./components/pages/HomePage";
import SocialLinks from "./components/SocialLinks";
import GeneralFooter from "./components/GeneralFooter";

const AboutPage = lazy(() => import("./components/pages/AboutPage"));

function App() {
  return (
    <>
      <AuroraBackground />
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
