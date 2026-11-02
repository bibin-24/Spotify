import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import "./Install.css";
import Microsoft from "../assets/images/microsoft.png"

function Install() {
  return (
    <div className="install-page-container">
      <Navbar />

      <div className="install-page-layout">
        <Sidebar />

        <main className="install-main-content">
          <div className="install-hero-card">
            {/* Spotify Brand */}
            <div className="install-spotify-brand">
              <svg viewBox="0 0 24 24" width="36" height="36" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
              <span>Spotify</span>
            </div>

            <h1 className="install-hero-title">Download Spotify for Windows</h1>

            <p className="install-hero-desc">
              Enjoy high-quality audio and offline playback, plus Windows Game Bar
              integration and a Friend Activity feed that lets you see what your
              friends are listening to in real time.
            </p>

            <a
              href="https://apps.microsoft.com/detail/9ncbcszsjrsb"
              target="_blank"
              rel="noreferrer"
              className="ms-store-btn"
            >
              <div className="ms-icon-grid">
                <span className="ms-red"></span>
                <span className="ms-green"></span>
                <span className="ms-blue"></span>
                <span className="ms-yellow"></span>
              </div>
              <div className="ms-btn-text">
                <small>Download from the</small>
                <strong>Microsoft Store</strong>
              </div>
            </a>

            <a
              href="https://download.scdn.co/SpotifySetup.exe"
              className="install-direct-link"
            >
              Download directly from Spotify
            </a>

        <div className="MicroImg">
          <img src={Microsoft} alt="" />
        </div>
          </div>

          <Footer />
        </main>
      </div>
    </div>
  );
}

export default Install;

