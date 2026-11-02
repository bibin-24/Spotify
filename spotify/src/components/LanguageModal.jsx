import { X } from "lucide-react";
import "./LanguageModal.css";

const LANGUAGES = [
  { native: "English", english: "English" },
  { native: "Afrikaans", english: "Afrikaans" },
  { native: "አማርኛ", english: "Amharic" },
  { native: "العَرَبِية", english: "Arabic" },
  { native: "عربي مصري", english: "Arabic (Egypt)" },
  { native: "العَرَبِية مغربي", english: "Arabic (Morocco)" },
  { native: "العربية السعودية", english: "Arabic (Saudi Arabia)" },
  { native: "Azərbaycanca", english: "Azerbaijani" },
  { native: "Български", english: "Bulgarian" },
  { native: "भोजपुरी", english: "Bhojpuri" },
  { native: "বাংলা", english: "Bengali" },
  { native: "Bosanski", english: "Bosnian" },
  { native: "Català", english: "Catalan" },
  { native: "Čeština", english: "Czech" },
  { native: "Dansk", english: "Danish" },
  { native: "Deutsch", english: "German" },
  { native: "Ελληνικά", english: "Greek" },
  { native: "English", english: "United Kingdom" },
  { native: "Español de España", english: "European Spanish" },
  { native: "Español de Latinoamérica", english: "Latin American Spanish" },
  { native: "Eesti", english: "Estonian" },
  { native: "Euskara", english: "Basque" },
  { native: "فارسی", english: "Persian" },
  { native: "Suomi", english: "Finnish" },
  { native: "Filipino", english: "Filipino" },
  { native: "Français", english: "French" },
  { native: "Français Canadien", english: "Canadian French" },
  { native: "Galego", english: "Galician" },
  { native: "ગુજરાતી", english: "Gujarati" },
  { native: "עברית", english: "Hebrew" },
  { native: "हिन्दी", english: "Hindi" },
  { native: "Hrvatski", english: "Croatian" },
  { native: "Magyar", english: "Hungarian" },
  { native: "Bahasa Indonesia", english: "Indonesian" },
  { native: "Íslenska", english: "Icelandic" },
  { native: "Italiano", english: "Italian" },
  { native: "日本語", english: "Japanese" },
  { native: "ಕನ್ನಡ", english: "Kannada" },
  { native: "한국어", english: "Korean" },
  { native: "മലയാളം", english: "Malayalam" },
  { native: "मराठी", english: "Marathi" },
  { native: "Bahasa Melayu", english: "Malay" },
  { native: "Norsk", english: "Norwegian" },
  { native: "Nederlands", english: "Dutch" },
  { native: "Odia", english: "Odia" },
  { native: "ਪੰਜਾਬੀ", english: "Punjabi" },
  { native: "Polski", english: "Polish" },
  { native: "Português do Brasil", english: "Brazilian Portuguese" },
  { native: "Português", english: "European Portuguese" },
  { native: "Română", english: "Romanian" },
  { native: "Русский", english: "Russian" },
  { native: "Slovenčina", english: "Slovak" },
  { native: "Slovenščina", english: "Slovenian" },
  { native: "Srpski", english: "Serbian" },
  { native: "Svenska", english: "Swedish" },
  { native: "Kiswahili", english: "Swahili" },
  { native: "தமிழ்", english: "Tamil" },
  { native: "తెలుగు", english: "Telugu" },
  { native: "ไทย", english: "Thai" },
  { native: "Türkçe", english: "Turkish" },
  { native: "Українська", english: "Ukrainian" },
  { native: "اردو", english: "Urdu" },
  { native: "Tiếng Việt", english: "Vietnamese" },
  { native: "中文", english: "Chinese" },
];

function LanguageModal({ isOpen, onClose, selectedLanguage = "English", onSelectLanguage }) {
  if (!isOpen) return null;

  return (
    <div className="language-modal-backdrop" onClick={onClose}>
      <div className="language-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="language-modal-header">
          <div>
            <h2 className="language-modal-title">Choose a language</h2>
            <p className="language-modal-subtitle">
              This updates what you read on open.spotify.com
            </p>
          </div>
          <button className="language-modal-close-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <div className="language-grid-container">
          {LANGUAGES.map((item, idx) => {
            const isSelected = selectedLanguage === item.english || selectedLanguage === item.native;
            return (
              <button
                key={idx}
                className={`language-option-btn ${isSelected ? "selected" : ""}`}
                onClick={() => {
                  if (onSelectLanguage) onSelectLanguage(item.english);
                  onClose();
                }}
              >
                <span className="lang-native">{item.native}</span>
                <span className="lang-english">{item.english}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default LanguageModal;

