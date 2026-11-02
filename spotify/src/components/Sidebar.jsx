import { useState } from "react";
import { Plus, Globe } from "lucide-react";
import LanguageModal from "./LanguageModal";
import "./Sidebar.css";

function Sidebar() {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("English");

  return (
    <>
      <aside className="sidebar">
        <div className="library-header">
          <h2>Your Library</h2>
          <button className="add-button" title="Create playlist">
            <Plus size={20} />
            <span style={{ fontSize: "14px", fontWeight: "700", marginLeft: "4px" }}>Create</span>
          </button>
        </div>

        <div className="sidebar-scrollable-content">
          <div className="playlist-box">
            <h3>Create your first playlist</h3>
            <p>It&apos;s easy, we&apos;ll help you</p>
            <button className="create-button">Create playlist</button>
          </div>

          <div className="playlist-box">
            <h3>Let&apos;s find some podcasts to follow</h3>
            <p>We&apos;ll keep you updated on new episodes</p>
            <button className="create-button">Browse podcasts</button>
          </div>
        </div>

        <div className="sidebar-footer">
          <div className="legal-links">
            <a href="#legal">Legal</a>
            <a href="#safety">Safety & Privacy Center</a>
            <a href="#privacy">Privacy Policy</a>
            <a href="#cookies">Cookies</a>
            <a href="#about-ads">About Ads</a>
            <a href="#accessibility">Accessibility</a>
            <a href="#cookies-settings">Cookies</a>
          </div>

          <button className="language-button" onClick={() => setIsLangOpen(true)}>
            <Globe size={18} />
            <span>{currentLang}</span>
          </button>
        </div>
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
