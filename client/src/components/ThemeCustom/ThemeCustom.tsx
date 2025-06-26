import { useState } from "react";
import styles from "./ThemeCustom.module.css";
import type { FormPayload } from "../../types/form";

interface ThemeCustomProps {
	form: FormPayload;
	setForm: React.Dispatch<React.SetStateAction<FormPayload>>;
}

function ThemeCustom({ form, setForm }: ThemeCustomProps) {
	const [isColorModalOpen, setIsColorModalOpen] = useState(false);
	const fonts = [
		"Arial",
		"Verdana",
		"Times New Roman",
		"Courier New",
		"Georgia",
		"Palatino",
		"Comic Sans MS",
		"Trebuchet MS",
		"Chivo",
		"Spectral",
	];
	const fontSizes = [12, 14, 16, 18, 20, 24, 32];
	const titleFontSizes = [16, 18, 20, 24, 28, 32, 36];
	const colors = [0, 30, 60, 120, 220, 270, 300];

	const handleColorChange = (color: number) => {
		setForm((prev) => ({
			...prev,
			theme: {
				...prev.theme,
				color_value: color,
			},
		}));
		setIsColorModalOpen(false);
	};

	const handleFontChange = (fontType: "font1" | "font2", font: string) => {
		setForm((prev) => ({
			...prev,
			theme: {
				...prev.theme,
				[`${fontType}_value`]: font,
			},
		}));
	};

	const handleFontSizeChange = (
		fontType: "font1" | "font2",
		size: string
	) => {
		const intSize = parseInt(size);
		setForm((prev) => ({
			...prev,
			theme: {
				...prev.theme,
				[`${fontType}_size`]: intSize,
			},
		}));
	};

	return (
		<div className={styles.themeCustomContainer}>
			<div className={styles.pickers}>
				<div className={styles.fontColorPicker}>
					<div className={styles.optionContainer}>
						<div className={styles.spacer}>
							<label>Police des titres:</label>
							<select
								value={form.theme.font1_value}
								onChange={(e) =>
									handleFontChange("font1", e.target.value)
								}
								className={styles.fontDropdown}
							>
								{fonts.map((font, index) => (
									<option key={index} value={font}>
										{font}
									</option>
								))}
							</select>
						</div>
					</div>

					<div className={styles.optionContainer}>
						<div className={styles.spacer}>
							<label>Police des textes:</label>
							<select
								value={form.theme.font2_value}
								onChange={(e) =>
									handleFontChange("font2", e.target.value)
								}
								className={styles.fontDropdown}
							>
								{fonts.map((font, index) => (
									<option key={index} value={font}>
										{font}
									</option>
								))}
							</select>
						</div>
					</div>
					<div className={styles.colorPicker}>
						<div className={styles.optionContainer}>
							<div className={styles.spacer}>
								<label>Couleur du thème:</label>
								<div
									className={styles.selectedColorSquare}
									style={{
										backgroundColor: `hsl(${form.theme.color_value}, 100%, 50%)`,
									}}
									onClick={() => setIsColorModalOpen(true)}
								></div>
							</div>
						</div>

						{isColorModalOpen && (
							<div className={styles.colorModal}>
								<div className={styles.colorGrid}>
									{colors.map((color, index) => (
										<div
											key={index}
											className={styles.colorSquare}
											style={{
												backgroundColor: `hsl(${color}, 100%, 50%)`,
											}}
											onClick={() =>
												handleColorChange(color)
											}
										></div>
									))}
								</div>
							</div>
						)}
					</div>
				</div>

				<div className={styles.fontSizePicker}>
					<div className={styles.optionContainer}>
						<div className={styles.spacer2}>
							<label>Taille des titres: </label>
							<select
								value={form.theme.font1_size}
								onChange={(e) =>
									handleFontSizeChange(
										"font1",
										e.target.value
									)
								}
								className={styles.fontDropdown}
							>
								{titleFontSizes.map((size, index) => (
									<option key={index} value={size}>
										{size}
									</option>
								))}
							</select>
						</div>
					</div>
					<div className={styles.optionContainer}>
						<div className={styles.spacer2}>
							<label>Taille des textes: </label>
							<select
								value={form.theme.font2_size}
								onChange={(e) =>
									handleFontSizeChange(
										"font2",
										e.target.value
									)
								}
								className={styles.fontDropdown}
							>
								{fontSizes.map((size, index) => (
									<option key={index} value={size}>
										{size}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ThemeCustom;
