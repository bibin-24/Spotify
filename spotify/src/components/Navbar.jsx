import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Search,
  Home,
  Download,
  FolderKanban,
  Sparkles,
  LogOut,
  User,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
    navigate("/");
  };

  return (
    <header className="spotify-navbar">
    
      <button
        className="mobile-nav-toggle"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

  
      <div
        className="spotify-logo-btn"
        onClick={() => navigate("/")}
        title="Spotify Home"
        role="button"
        tabIndex={0}
      >
        <svg viewBox="0 0 24 24" width="34" height="34" fill="currentColor">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
        </svg>
      </div>

      
      <button
        className="spotify-home-btn"
        onClick={() => navigate("/")}
        title="Home"
        aria-label="Home"
      >
        <Home size={22} />
      </button>


      <div className="spotify-search-bar">
        <Search size={22} className="search-icon" />
        <input
          type="text"
          placeholder="What do you want to play?"
          onFocus={() => navigate("/broadcast")}
        />
        <div className="search-sep"></div>
        <button
          className="search-browse-toggle"
          onClick={() => navigate("/broadcast")}
          title="Browse all"
          aria-label="Browse all"
        >
          <FolderKanban size={20} />
        </button>
      </div>

      {/* Top Right Links */}
      <nav className={`spotify-nav-right ${mobileMenuOpen ? "open" : ""}`}>
       
        <button
          className="nav-quiz-pill"
          onClick={() => {
            navigate("/quiz");
            setMobileMenuOpen(false);
          }}
          title="Play Spotify Quiz"
        >
          <Sparkles size={16} />
          <span>Quiz</span>
        </button>
        <Link to='https://www.spotify.com/premium/'className="nav-link-text">Premium</Link>
        
        <Link to="https://support.spotify.com/in-en/ "className="nav-link-text">Support</Link>
        
        <Link to="https://www.spotify.com/download/" className="nav-link-text"> Download</Link>
        

        <div className="nav-vertical-line"></div>

      
        <Link
          to="/install"
          className="nav-install-link"
          onClick={() => setMobileMenuOpen(false)}
        >
          <Download size={18} />
          <span>Install App</span>
        </Link>

        
        {currentUser ? (
          <div className="nav-user-wrap">
            <button
              className="user-pill-btn"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              aria-label="User account"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="user-nav-avatar"
              />
              <span>{currentUser.name}</span>
            </button>

            {showProfileMenu && (
              <div className="user-dropdown-popover">
                <div className="dropdown-user-info">
                  <strong>{currentUser.name}</strong>
                  <span>{currentUser.email}</span>
                </div>
                <div className="dropdown-sep"></div>
                <button
                  className="dropdown-action-btn"
                  onClick={() => setShowProfileMenu(false)}
                >
                  <User size={16} /> Account
                </button>
                <button
                  className="dropdown-action-btn logout"
                  onClick={handleLogout}
                >
                  <LogOut size={16} /> Log out
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="nav-auth-buttons">
            <Link
              to="/signup"
              className="signup-text-btn"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign up
            </Link>
            <button
              className="login-round-btn"
              onClick={() => {
                navigate("/login");
                setMobileMenuOpen(false);
              }}
            >
              Log in
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
