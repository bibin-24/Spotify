import { useNavigate } from "react-router-dom";
import { Play } from "lucide-react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import SongCard from "../components/SongCard";
import ArtistCard from "../components/ArtistCard";
import Footer from "../components/Footer";
import { trendingSongs, popularAlbums, popularRadio, featuredCharts } from "../data/songs";
import artists from "../data/artists";
import { usePlayer } from "../context/PlayerContext";
import "./Homepage.css";

function HomePage() {
  const navigate = useNavigate();
  const { playTrack } = usePlayer();

  const handlePlayAlbum = (album) => {
    playTrack({
      id: album.id,
      title: album.title,
      artist: album.artist,
      image: album.image,
    });
  };

  return (
    <div className="home-page-container">
      <Navbar />

      <div className="home-layout-grid">
        <Sidebar />

        <main className="home-main-content">
        
          <section className="spotify-shelf">
            <div className="shelf-header">
              <h2>Trending songs</h2>
              <button className="shelf-show-all-btn">Show all</button>
            </div>
            <div className="shelf-cards-grid">
              {trendingSongs.map((song) => (
                <SongCard
                  key={song.id}
                  id={song.id}
                  title={song.title}
                  artist={song.artist}
                  image={song.image}
                />
              ))}
            </div>
          </section>

         
          <section className="spotify-shelf">
            <div className="shelf-header">
              <h2>Popular artists</h2>
              <button className="shelf-show-all-btn">Show all</button>
            </div>
            <div className="shelf-cards-grid">
              {artists.map((artist) => (
                <ArtistCard key={artist.id} artist={artist} />
              ))}
            </div>
          </section>

         
          <section className="spotify-shelf">
            <div className="shelf-header">
              <h2>Popular albums and singles</h2>
              <button className="shelf-show-all-btn">Show all</button>
            </div>
            <div className="shelf-cards-grid">
              {popularAlbums.map((album) => (
                <div
                  key={album.id}
                  className="album-card-item"
                  onClick={() => handlePlayAlbum(album)}
                >
                  <div className="album-card-img-wrap">
                    <img src={album.image} alt={album.title} loading="lazy" />
                    <button className="album-hover-play-btn" aria-label={`Play ${album.title}`}>
                      <Play size={20} fill="#000" color="#000" style={{ marginLeft: "2px" }} />
                    </button>
                  </div>
                  <h3 className="album-title" title={album.title}>{album.title}</h3>
                  <p className="album-artist" title={album.artist}>{album.artist}</p>
                </div>
              ))}
            </div>
          </section>

         
          <section className="spotify-shelf">
            <div className="shelf-header">
              <h2>Popular radio</h2>
              <button className="shelf-show-all-btn">Show all</button>
            </div>
            <div className="shelf-cards-grid">
              {popularRadio.map((rad) => (
                <div
                  key={rad.id}
                  className="radio-card-item"
                  onClick={() =>
                    playTrack({
                      id: rad.id,
                      title: `${rad.title} Radio`,
                      artist: rad.desc,
                      image: rad.image,
                    })
                  }
                >
                  <div className="radio-banner" style={{ backgroundColor: rad.bg }}>
                    <div className="radio-top-label">
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="#000">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                      </svg>
                      <span>RADIO</span>
                    </div>
                    <div className="radio-circle-img-wrap">
                      <img src={rad.image} alt={rad.title} />
                    </div>
                  </div>
                  <h3 className="radio-title">{rad.title}</h3>
                  <p className="radio-desc">{rad.desc}</p>
                </div>
              ))}
            </div>
          </section>

          
          <section className="spotify-shelf">
            <div className="shelf-header">
              <h2>Featured Charts</h2>
              <button className="shelf-show-all-btn">Show all</button>
            </div>
            <div className="shelf-cards-grid">
              {featuredCharts.map((ch) => (
                <div
                  key={ch.id}
                  className="chart-card-item"
                  style={{ backgroundColor: ch.bg }}
                  onClick={() => navigate("/broadcast")}
                >
                  <div className="chart-top-brand">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                    </svg>
                  </div>
                  <h3 className="chart-title">{ch.title}</h3>
                  <div className="chart-footer-label">
                    <span>{ch.subtitle}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

      
          <Footer />
        </main>
      </div>
    </div>
  );
}

export default HomePage;
