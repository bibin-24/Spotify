import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import "./Broadcast.css";
import { LogIn } from "lucide-react";
import { Link } from "react-router-dom";

const BROWSE_CATEGORIES = [
  { id: 1, title: "Music",color: "#e91e63", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&auto=format&fit=crop&q=80",path: "https://open.spotify.com/genre/0JQ5DAqbMKFSi39LMRT0Cy" },
  { id: 2, title: "Podcasts", color: "#006450", image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=300&auto=format&fit=crop&q=80" ,path:"https://open.spotify.com/genre/0JQ5DArNBzkmxXHCqFLx2J"},
  { id: 3, title: "Live Events", color: "#8400e7", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&auto=format&fit=crop&q=80" ,path:"https://open.spotify.com/concerts"},
  { id: 4, title: "Made For You", color: "#1e3264", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80" ,path:"https://open.spotify.com/genre/0JQ5DAt0tbjZptfcdMSKl3"},
  { id: 5, title: "New Releases", color: "#608108", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80" ,path:"https://open.spotify.com/genre/0JQ5DAqbMKFz6FAsUtgAab"},
  { id: 6, title: "Rain & Monsoon", color: "#2d46b9", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&auto=format&fit=crop&q=80" ,path:"https://open.spotify.com/genre/0JQ5DAqbMKFBgibisxEPNa"},
  { id: 7, title: "Hindi", color: "#e1118c", image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300&auto=format&fit=crop&q=80" ,path:"https://open.spotify.com/genre/0JQ5DAqbMKFHCxg5H5PtqW"},
  { id: 8, title: "Tamil", color: "#a56752", image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=300&auto=format&fit=crop&q=80" ,path:"https://open.spotify.com/genre/0JQ5DAqbMKFE33XAyDiPIr"},
  { id: 9, title: "Punjabi", color: "#b02897", image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&auto=format&fit=crop&q=80" ,path:"https://open.spotify.com/genre/0JQ5DAqbMKFKSopHMaeIeI"},
  { id: 10, title: "Funk & Disco", color: "#8d67ab", image: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300&auto=format&fit=crop&q=80" ,path:"https://open.spotify.com/genre/0JQ5DAudkNjCgYMM0TZXDw"},
  { id: 11, title: "Netflix", color: "#eb1e32", image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=300&auto=format&fit=crop&q=80" ,path:"https://open.spotify.com/podcastcharts"},
  { id: 12, title: "Asian Pacific Islander Heritage...", color: "#477d95", image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=300&auto=format&fit=crop&q=80" ,path:"https://open.spotify.com/genre/0JQ5DAqbMKFH69NUcWRk7v"},
  { id: 13, title: "GLOW", color: "#0d73ec", image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=300&auto=format&fit=crop&q=80" ,path:"https://open.spotify.com/genre/0JQ5DAqbMKFQIL0AXnG5AK"},
  { id: 14, title: "Music + Talk", color: "#ff6437", image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&auto=format&fit=crop&q=80" ,path:"https://open.spotify.com/genre/0JQ5DAqbMKFRNXsIvgZF9A"},
  { id: 15, title: "Latin", color: "#509bf5", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80" ,path:"https://open.spotify.com/genre/0JQ5DAqbMKFxXaXKP7zcDp"},
  { id: 16, title: "Tastemakers", color: "#e91429", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=300&auto=format&fit=crop&q=80" ,path:"https://open.spotify.com/genre/0JQ5DAqbMKFRKBHIxJ5hMm"},
];

function Broadcast() {
  return (
    <div className="broadcast-page-container">
      <Navbar />

      <div className="broadcast-page-layout">
        <Sidebar />

        <main className="broadcast-main-content">
          <div className="browse-content-inner">
            <h1 className="browse-heading">Browse all</h1>

           <div className="browse-cards-grid">
  {BROWSE_CATEGORIES.map((cat) => (
    <Link
      to={cat.path}
      key={cat.id}
      className="browse-category-card"
      style={{ backgroundColor: cat.color }}
    >
      <h3 className="category-card-title">{cat.title}</h3>

      <img
        src={cat.image}
        alt={cat.title}
        className="category-card-img"
        loading="lazy"
      />
    </Link>
  ))}
</div>
             
          </div>

          <Footer />
        </main>
      </div>
    </div>
  );
}

export default Broadcast;

