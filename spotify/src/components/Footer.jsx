import "./Footer.css";

function InstagramIcon({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TwitterIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.
      254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 
      4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669
       4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956
        1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function Footer() {
  return (
    <footer className="spotify-page-footer">
      <div className="footer-top-grid">
        <div className="footer-column">
          <h4>Company</h4>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#jobs">Jobs</a></li>
            <li><a href="#record">For the Record</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Communities</h4>
          <ul>
            <li><a href="#artists">For Artists</a></li>
            <li><a href="#developers">Developers</a></li>
            <li><a href="#advertising">Advertising</a></li>
            <li><a href="#investors">Investors</a></li>
            <li><a href="#vendors">Vendors</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Useful links</h4>
          <ul>
            <li><a href="#support">Support</a></li>
            <li><a href="#mobile">Free Mobile App</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Spotify Plans</h4>
          <ul>
            <li><a href="#individual">Premium Individual</a></li>
            <li><a href="#duo">Premium Duo</a></li>
            <li><a href="#family">Premium Family</a></li>
            <li><a href="#student">Premium Student</a></li>
            <li><a href="#free">Spotify Free</a></li>
          </ul>
        </div>

        <div className="footer-social-column">
          <div className="social-icons-group">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-circle" aria-label="Instagram">
              <InstagramIcon size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-circle" aria-label="Twitter">
              <TwitterIcon size={18} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-circle" aria-label="Facebook">
              <FacebookIcon size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-divider"></div>

      <div className="footer-bottom-row">
      
        <p className="footer-copyright">© 2026 Spotify AB</p>
      </div>
    </footer>
  );
}

export default Footer;
