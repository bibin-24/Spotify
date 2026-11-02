import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PlayerProvider } from "./context/PlayerContext";
import HomePage from "./pages/Homepage";
import ArtistPage from "./pages/ArtistPage";
import QuizPage from "./pages/QuizPage";
import LoginPage from "./pages/Loginpage";
import Signuppage from "./pages/Signuppage";
import Install from "./pages/Install";
import Broadcast from "./pages/Broadcast";
import FooterPlayer from "./components/FooterPlayer";
import "./App.css";

function AppRoutes() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/artist/:id" element={<ArtistPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signuppage />} />
        <Route path="/install" element={<Install />} />
        <Route path="/broadcast" element={<Broadcast />} />
      </Routes>
      {!isAuthPage && (
        <>
          <FooterPlayer />
         
        </>
      )}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <PlayerProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </PlayerProvider>
    </AuthProvider>
  );
}

export default App;
