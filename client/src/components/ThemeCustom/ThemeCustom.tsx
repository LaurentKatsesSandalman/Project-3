import { useState, useRef, useEffect } from 'react';
import styles from './ThemeCustom.module.css';

const themeColors = [
  { name: "Rouge", base: "#FF0000", text: "#CC0000", background: "#FFCCCC" },
  { name: "Bleu", base: "#0000FF", text: "#0000CC", background: "#CCCCFF" },
  { name: "Vert", base: "#00FF00", text: "#00CC00", background: "#CCFFCC" },
  { name: "Jaune", base: "#FFFF00", text: "#CCCC00", background: "#FFFFCC" },
  { name: "Violet", base: "#800080", text: "#660066", background: "#D9B3D9" },
  { name: "Orange", base: "#FFA500", text: "#CC8400", background: "#FFDAB9" },
  { name: "Turquoise", base: "#40E0D0", text: "#33CCB8", background: "#AFEEEE" },
  { name: "Rose", base: "#FFC0CB", text: "#CC99A3", background: "#FFE4E1" },
  { name: "Marron", base: "#A52A2A", text: "#8B2323", background: "#BC8F8F" },
  { name: "Gris", base: "#808080", text: "#666666", background: "#D3D3D3" },
  { name: "Noir", base: "#000000", text: "#333333", background: "#CCCCCC" },
  { name: "Blanc", base: "#FFFFFF", text: "#CCCCCC", background: "#F5F5F5" },
];

const fonts = [
  'Arial', 'Verdana', 'Times New Roman', 'Glycerin', 'Georgia',
  'Baskerville', 'Roboto', 'Open Sans', 'Lato', 'Ferryman', 'Raspberie 90s',
  'TT Travels NextFont', 'Brutalista', 'Marcovaldo', 'Fifty Fifty'
];

const fontSizes = [12, 14, 16, 18, 20, 24, 32, 36];
const titleFontSizes = [16, 18, 20, 24, 28, 32, 36, 40];

const ColorDropdown = ({ selectedColor, onColorSelect, colors }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className={styles.dropdown}>
      <button onClick={toggleDropdown} className={styles.dropdownButton} style={{ backgroundColor: selectedColor.base }}></button>
      {isOpen && (
        <div className={styles.dropdownContent}>
          {colors.map((color, index) => (
            <div
              key={index}
              onClick={() => {
                onColorSelect(color);
                setIsOpen(false);
              }}
              className={styles.colorOption}
              style={{
                backgroundColor: color.base,
                border: selectedColor.name === color.name ? '2px solid #333' : 'none'
              }}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

const ThemeCustomizer = ({ onThemeChange }) => {
  const [titleFontFamily, setTitleFontFamily] = useState('Arial');
  const [questionFontFamily, setQuestionFontFamily] = useState('Arial');
  const [fontSize, setFontSize] = useState(16);
  const [titleFontSize, setTitleFontSize] = useState(24);
  const [selectedTheme, setSelectedTheme] = useState(themeColors[0]);

  const handleThemeChange = (theme) => {
    setSelectedTheme(theme);
    updateTheme(theme);
  };

  const handleTitleFontFamilyChange = (e) => {
    setTitleFontFamily(e.target.value);
    updateTheme(selectedTheme);
  };

  const handleQuestionFontFamilyChange = (e) => {
    setQuestionFontFamily(e.target.value);
    updateTheme(selectedTheme);
  };

  const handleFontSizeChange = (e) => {
    setFontSize(parseInt(e.target.value, 10));
    updateTheme(selectedTheme);
  };

  const handleTitleFontSizeChange = (e) => {
    setTitleFontSize(parseInt(e.target.value, 10));
    updateTheme(selectedTheme);
  };

  const updateTheme = (theme) => {
    onThemeChange({
      titleFontFamily,
      questionFontFamily,
      fontSize: `${fontSize}px`,
      titleFontSize: `${titleFontSize}px`,
      textColor: theme.text,
      backgroundColor: theme.background
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <div className={styles.flexContainer}>
          <label className={styles.label}>
            Police du titre:
            <select value={titleFontFamily} onChange={handleTitleFontFamilyChange} className={styles.select}>
              {fonts.map((font, index) => (
                <option key={index} value={font}>{font}</option>
              ))}
            </select>
          </label>
          <label className={styles.label}>
            Taille du titre:
            <select value={titleFontSize} onChange={handleTitleFontSizeChange} className={styles.select}>
              {titleFontSizes.map((size, index) => (
                <option key={index} value={size}>{size}px</option>
              ))}
            </select>
          </label>
        </div>
      </div>
      <div className={styles.section}>
        <div className={styles.flexContainer}>
          <label className={styles.label}>
            Police des textes:
            <select value={questionFontFamily} onChange={handleQuestionFontFamilyChange} className={styles.select}>
              {fonts.map((font, index) => (
                <option key={index} value={font}>{font}</option>
              ))}
            </select>
          </label>
          <label className={styles.label}>
            Taille des textes:
            <select value={fontSize} onChange={handleFontSizeChange} className={styles.select}>
              {fontSizes.map((size, index) => (
                <option key={index} value={size}>{size}px</option>
              ))}
            </select>
          </label>
        </div>
      </div>
      <div>
        <label className={styles.label}>
          Couleur du thème:
          <ColorDropdown
            selectedColor={selectedTheme}
            onColorSelect={handleThemeChange}
            colors={themeColors}
          />
        </label>
      </div>
    </div>
  );
};

export default ThemeCustomizer;
