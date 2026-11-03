import { useState } from "react";
import { Plus, Globe } from "lucide-react";
import LanguageModal from "./LanguageModal";
import "./Sidebar.css";
import { Link } from "react-router-dom";

function Sidebar() {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("English");

  // Playlist popup state
  const [showPlaylistPopup, setShowPlaylistPopup] = useState(false);

  return (
    <>
      <aside className="sidebar">

        <div className="library-header">
          <h2>Your Library</h2>

          <button
            className="add-button"
            title="Create playlist"
            onClick={() => setShowPlaylistPopup(true)}
          >
            <Plus size={20} />
            <span style={{ fontSize: "14px", fontWeight: "700", marginLeft: "4px" }}>
              Create
            </span>
          </button>
        </div>

        <div className="sidebar-scrollable-content">

          <div className="playlist-box">
            <h3>Create your first playlist</h3>
            <p>It&apos;s easy, we&apos;ll help you</p>

            <button
              className="create-button"
              onClick={() => setShowPlaylistPopup(true)}
            >
              Create playlist
            </button>
          </div>

          <div className="playlist-box">
            <h3>Let&apos;s find some podcasts to follow</h3>
            <p>We&apos;ll keep you updated on new episodes</p>
            <button className="create-button">
              Browse podcasts
            </button>
          </div>

        </div>

        <div className="sidebar-footer">

          <div className="legal-links">
            <Link to="https://www.spotify.com/in-en/legal/end-user-agreement/">Legal</Link>
            <Link to="https://www.spotify.com/in-en/safetyandprivacy">Safety & Privacy Center</Link>
            <Link to="https://www.spotify.com/in-en/legal/privacy-policy/">Privacy Policy</Link>
            <Link to="https://www.spotify.com/in-en/legal/cookies-policy/">Cookies</Link>
            <Link to="https://www.spotify.com/in-en/legal/privacy-policy/#s3">About Ads</Link>
            <Link to="https://www.spotify.com/in-en/accessibility">Accessibility</Link>
            <Link to="https://www.spotify.com/in-en/legal/cookies-policy/">Cookies</Link>
          </div>

          <button
            className="language-button"
            onClick={() => setIsLangOpen(true)}
          >
            <Globe size={18} />
            <span>{currentLang}</span>
          </button>

        </div>

        {/* CREATE PLAYLIST POPUP */}
        {showPlaylistPopup && (
          <div className="playlist-popup">

            <h3>Create a playlist</h3>

            <p>Log in to create and share playlists.</p>

            <div className="popup-buttons">

              <button
                className="not-now-button"
                onClick={() => setShowPlaylistPopup(false)}
              >
                Not now
              </button>
           <Link to='/Login'><button className="popup-login-button">
                Log in
              </button> </Link>
              

            </div>

          </div>
        )}

      </aside>

      <LanguageModal
        isOpen={isLangOpen}
        onClose={() => setIsLangOpen(false)}
        selectedLanguage={currentLang}
        onSelectLanguage={(lang) => setCurrentLang(lang)}
      />
    </>
  );
}

export default Sidebar;
