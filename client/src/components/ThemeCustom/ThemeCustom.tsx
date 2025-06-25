import { useState, useRef, useEffect } from "react";
import styles from "./ThemeCustom.module.css";

const themeHues = [0, 240, 120, 60, 300, 39, 180,];

const fonts = [
	"Arial",
	"Verdana",
	"Times New Roman",
	"Glycerin",
	"Georgia",
	"Baskerville",
	"Roboto",
	"Open Sans",
	"Lato",
	"Ferryman",
	"Raspberie 90s",
	"TT Travels NextFont",
	"Brutalista",
	"Marcovaldo",
	"Fifty Fifty",
];

const fontSizes = [12, 14, 16, 18, 20, 24, 32, 36];
const titleFontSizes = [16, 18, 20, 24, 28, 32, 36, 40];

const HueDropdown = ({ selectedHue, onHueSelect, hues }) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);

	const toggleDropdown = () => setIsOpen(!isOpen);

	const handleClickOutside = (event) => {
		if (
			dropdownRef.current &&
			!dropdownRef.current.contains(event.target)
		) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div ref={dropdownRef} className={styles.dropdown}>
			<button
				onClick={toggleDropdown}
				className={styles.dropdownButton}
				style={{ backgroundColor: `hsl(${selectedHue}, 100%, 50%)` }}
			></button>
			{isOpen && (
				<div className={styles.dropdownContent}>
					{hues.map((hue, index) => (
						<div
							key={index}
							onClick={() => {
								onHueSelect(hue);
								setIsOpen(false);
							}}
							className={styles.colorOption}
							style={{
								backgroundColor: `hsl(${hue}, 100%, 50%)`,
								border:
									selectedHue === hue
										? "2px solid #333"
										: "none",
							}}
						></div>
					))}
				</div>
			)}
		</div>
	);
};

const ThemeCustom = ({ onThemeChange }) => {
	const [titleFontFamily, setTitleFontFamily] = useState("Arial");
	const [questionFontFamily, setQuestionFontFamily] = useState("Arial");
	const [fontSize, setFontSize] = useState(16);
	const [titleFontSize, setTitleFontSize] = useState(24);
	const [selectedHue, setSelectedHue] = useState(themeHues[0]);

	const handleHueChange = (hue) => {
		setSelectedHue(hue);
		updateTheme(hue);
	};

	const handleTitleFontFamilyChange = (e) => {
		setTitleFontFamily(e.target.value);
		updateTheme(selectedHue);
	};

	const handleQuestionFontFamilyChange = (e) => {
		setQuestionFontFamily(e.target.value);
		updateTheme(selectedHue);
	};

	const handleFontSizeChange = (e) => {
		setFontSize(parseInt(e.target.value, 10));
		updateTheme(selectedHue);
	};

	const handleTitleFontSizeChange = (e) => {
		setTitleFontSize(parseInt(e.target.value, 10));
		updateTheme(selectedHue);
	};

	const updateTheme = (hue) => {
		onThemeChange({
			titleFontFamily,
			questionFontFamily,
			fontSize: `${fontSize}px`,
			titleFontSize: `${titleFontSize}px`,
			color: `hsl(${hue}, 100%, 50%)`,
		});
	};

	return (
		<div className={styles.container}>
			<div className={styles.section}>
				<div className={styles.flexContainer}>
					<label className={styles.label}>
						Police du titre:
						<select
							value={titleFontFamily}
							onChange={handleTitleFontFamilyChange}
							className={styles.select}
						>
							{fonts.map((font, index) => (
								<option key={index} value={font}>
									{font}
								</option>
							))}
						</select>
					</label>
					<label className={styles.label}>
						Taille du titre:
						<select
							value={titleFontSize}
							onChange={handleTitleFontSizeChange}
							className={styles.select}
						>
							{titleFontSizes.map((size, index) => (
								<option key={index} value={size}>
									{size}px
								</option>
							))}
						</select>
					</label>
				</div>
			</div>
			<div className={styles.section}>
				<div className={styles.flexContainer}>
					<label className={styles.label}>
						Police des textes:
						<select
							value={questionFontFamily}
							onChange={handleQuestionFontFamilyChange}
							className={styles.select}
						>
							{fonts.map((font, index) => (
								<option key={index} value={font}>
									{font}
								</option>
							))}
						</select>
					</label>
					<label className={styles.label}>
						Taille des textes:
						<select
							value={fontSize}
							onChange={handleFontSizeChange}
							className={styles.select}
						>
							{fontSizes.map((size, index) => (
								<option key={index} value={size}>
									{size}px
								</option>
							))}
						</select>
					</label>
				</div>
			</div>
			<div>
				<label className={styles.label}>
					Teinte du thème:
					<HueDropdown
						selectedHue={selectedHue}
						onHueSelect={handleHueChange}
						hues={themeHues}
					/>
				</label>
			</div>
		</div>
	);
};

export default ThemeCustom;
