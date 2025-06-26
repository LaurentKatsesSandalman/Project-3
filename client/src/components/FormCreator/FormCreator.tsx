import axios from "axios";
import { useEffect, useState } from "react";
import FormField from "../FormField/FormField";
import styles from "./FormCreator.module.css";
import type { FormPayload } from "../../types/form";
import { useAppContext } from "../../context/AppContext";
import type { FieldPayload } from "../../types/fields";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { AddIcon, BackIcon, CloseIcon } from "../Icons/Icons";
import ThemeCustom from "../ThemeCustom/ThemeCustom";
import Button from "../Button/Button";

type TypeOfField =
	| "text"
	| "textarea"
	| "email"
	| "tel"
	| "checkbox"
	| "radio"
	| "date"
	| "time"
	| "url"
	| "month"
	| "number"
	| "droplist"
	| "notes";

interface FieldType {
	type: TypeOfField;
	name: string;
	field_type_id: number;
}

const fieldTypes: FieldType[] = [
	{ type: "text", name: "Texte court", field_type_id: 1 },
	{ type: "textarea", name: "Texte long", field_type_id: 11 },
	{ type: "email", name: "Email", field_type_id: 4 },
	{ type: "tel", name: "Téléphone", field_type_id: 8 },
	{ type: "checkbox", name: "Case à cocher", field_type_id: 2 },
	{ type: "radio", name: "Choix unique", field_type_id: 7 },
	{ type: "date", name: "Date", field_type_id: 3 },
	{ type: "time", name: "Heure", field_type_id: 10 },
	{ type: "url", name: "URL", field_type_id: 9 },
	{ type: "month", name: "Liste des mois", field_type_id: 5 },
	{ type: "number", name: "Nombre", field_type_id: 6 },
	{ type: "droplist", name: "Liste déroulante", field_type_id: 12 },
];

const emptyForm = {
	is_deployed: false,
	is_closed: false,
	date_to_close: null,
	is_public: false,
	multi_answer: false,
	form_name: "Nouveau formulaire",
	form_description: "",
	theme: {
		theme_id: 1,
		color_value: 169,
		font1_value: "Chivo",
		font2_value: "Spectral",
		font1_size: 16,
		font2_size: 24,
	},
	fields: [],
};

const FormCreator = () => {
	const {
		authToken,
		setAuthToken,
		isFieldsPanelVisible,
		setIsFieldsPanelVisible,
	} = useAppContext();
	const [form, setForm] = useState<FormPayload>(emptyForm);

	const { form_id } = useParams<{ form_id: string }>();

	useEffect(() => {
		const getForm = async () => {
			try {
				const response = await axios.get(
					`${
						import.meta.env.VITE_QUICKY_API_URL
					}/api/forms/${form_id}`,
					{
						headers: {
							Authorization: `Bearer ${authToken}`,
						},
					}
				);
				setForm(response.data);
			} catch (err: any) {
				if (
					err.response?.status === 403 ||
					err.response?.status === 401
				) {
					setAuthToken(null);
				}
			}
		};
		getForm();
	}, [authToken, form_id, setAuthToken]);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			await axios.patch(
				`${import.meta.env.VITE_QUICKY_API_URL}/api/forms/${form_id}`,
				{
					form: form,
				},
				{
					headers: {
						Authorization: `Bearer ${authToken}`,
					},
				}
			);
		} catch (err: any) {
			if (err.response?.status === 403 || err.response?.status === 401) {
				setAuthToken(null);
			}
		}
	};

	const handleChange = (
		string: "title" | "description",
		eventTargetValue: string
	) => {
		if (string === "title") {
			setForm((prev) => ({ ...prev, form_name: eventTargetValue }));
		}
		if (string === "description") {
			setForm((prev) => ({
				...prev,
				form_description: eventTargetValue,
			}));
		}
	};

	const addField = (type: TypeOfField) => {
		const newField = {
			field_ordering: form.fields.length + 1,
			field_name: `Nouvelle question`,
			is_required: false,
			is_unique: false,
			field_type_id:
				fieldTypes[
					fieldTypes.findIndex((fieldType) => fieldType.type === type)
				].field_type_id,
			field_description: "",
			default_value: null,
			field_options: [],
		};
		setForm((prev) => ({ ...prev, fields: [...prev.fields, newField] }));
	};

	const findTypeName = (field: FieldPayload): string => {
		const index = fieldTypes.findIndex(
			(fieldType) => fieldType.field_type_id === field.field_type_id
		);
		if (index === -1) {
			throw new Error("Field type not found");
		}
		return fieldTypes[index].name;
	};

	return (
		<div
			className={styles["form-container"]}
			style={
				{
					"--font-base": `"${
						form?.theme.font2_value ?? "Chivo"
					}", sans-serif`,
					"--font-alt": `"${
						form?.theme.font1_value ?? "Spectral"
					}", serif`,
					"--font-text-size": `${form?.theme.font2_size ?? 16}px`,
					"--font-title-size": `${form?.theme.font1_size ?? 24}px`,
					"--font-big-title-size": `${
						(form?.theme.font1_size ?? 24) * 1.33
					}px`,
					"--color-primary": `hsl(${
						form?.theme.color_value ?? 169
					}, 75%, 28%)`,
					"--color-primary-darker": `hsl(${
						form?.theme.color_value ?? 169
					}, 75%, 24%)`,
					"--color-body-background": `hsl(${
						form?.theme.color_value ?? 169
					}, 15%, 87%)`,
					"--color-text-dark": `hsl(${
						form?.theme.color_value ?? 169
					}, 75%, 4%)`,
					"--color-text-placeholder": `hsla(${
						form?.theme.color_value ?? 169
					}, 75%, 60%, 0.5)`,
				} as React.CSSProperties
			}
		>
			<div className={styles["title-container"]}>
				<Link to="/forms">
					<BackIcon className={styles["back-icon"]} />
				</Link>
				<h1 className={styles["form-title"]}>{form.form_name}</h1>
			</div>
			<form onSubmit={handleSubmit} className={styles["form"]}>
				<div className={styles["form-content"]}>
					<div className={styles["form-editor"]}>
						<ThemeCustom form={form} setForm={setForm} />
						<div className={styles["form-header"]}>
							<input
								type="text"
								placeholder="Titre du formulaire"
								value={form.form_name}
								onChange={(event) => {
									event.preventDefault();
									handleChange("title", event.target.value);
								}}
								className={styles["form-title-input"]}
							/>
							<input
								type="text"
								placeholder="Description du formulaire"
								value={form.form_description}
								onChange={(event) => {
									event.preventDefault();
									handleChange(
										"description",
										event.target.value
									);
								}}
								className={styles["form-description"]}
							/>
						</div>
					</div>
					<div className={styles["form-layout"]}>
						<div className={styles["form-editor"]}>
							{form.fields.map((field) => (
								<FormField
									key={field.field_ordering}
									field={field}
									fieldTypeName={findTypeName(field)}
									setForm={setForm}
								/>
							))}
						</div>
					</div>
				</div>
				<div className={styles["form-right-panel"]}>
					<Button
						variant="primary"
						type="submit"
						className={styles.submitBtn}
					>
						Sauvegarder formulaire
					</Button>
					<div>
						{isFieldsPanelVisible && (
							<div className={styles["form-fields-container"]}>
								<div
									className={styles["fields-picking-header"]}
								>
									<h3
										className={
											styles["fields-picking-title"]
										}
									>
										Choisir un champ
									</h3>
									<button
										type="button"
										onClick={() =>
											setIsFieldsPanelVisible(false)
										}
										className={
											styles["toggle-panel-button"]
										}
									>
										{isFieldsPanelVisible && (
											<CloseIcon
												className={styles["close-icon"]}
											/>
										)}
									</button>
								</div>
								<div className={styles["fields-picking-list"]}>
									{fieldTypes.map((fieldType) => (
										<button
											key={fieldType.field_type_id}
											type="button"
											onClick={() =>
												addField(fieldType.type)
											}
											className={styles["field-type-btn"]}
										>
											{fieldType.name}
										</button>
									))}
								</div>
							</div>
						)}
					</div>
				</div>
			</form>
			{!isFieldsPanelVisible && (
				<button
					type="button"
					onClick={() => setIsFieldsPanelVisible(true)}
					className={styles["add-btn"]}
				>
					<AddIcon className={styles["add-icon"]} />
				</button>
			)}
		</div>
	);
};

export default FormCreator;
