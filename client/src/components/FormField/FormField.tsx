import type { FieldPayload } from "../../types/fields";
import type { FormPayload } from "../../types/form";
import { BinIcon, CloseIcon } from "../Icons/Icons";
import styles from "./FormField.module.css";

interface FieldProps {
	field: FieldPayload;
	setForm: React.Dispatch<React.SetStateAction<FormPayload>>;
	fieldTypeName: string;
}

const FormField = ({ field, setForm, fieldTypeName }: FieldProps) => {
	const removeField = () => {
		const orderValue = field.field_ordering;
		setForm((prev) => ({
			...prev,
			fields: prev.fields.filter(
				(fieldlambda) =>
					fieldlambda.field_ordering !== field.field_ordering
			),
		}));
		setForm((prev) => ({
			...prev,
			fields: prev.fields.map((fieldlambda) =>
				fieldlambda.field_ordering > orderValue
					? {
							...fieldlambda,
							field_ordering: fieldlambda.field_ordering - 1,
					  }
					: fieldlambda
			),
		}));
	};

	const updateFieldName = (field_name: string) => {
		setForm((prev) => ({
			...prev,
			fields: prev.fields.map((fieldlambda, index) =>
				index === field.field_ordering - 1
					? { ...fieldlambda, field_name: field_name }
					: fieldlambda
			),
		}));
	};

	const updateFieldDescription = (field_description: string) => {
		setForm((prev) => ({
			...prev,
			fields: prev.fields.map((fieldlambda, index) =>
				index === field.field_ordering - 1
					? { ...fieldlambda, field_description: field_description }
					: fieldlambda
			),
		}));
	};

	const handleChangeFieldOption = (option: "is_required" | "is_unique") => {
		setForm((prev) => ({
			...prev,
			fields: prev.fields.map((fieldlambda, index) =>
				index === field.field_ordering - 1
					? {
							...fieldlambda,
							[`${option}`]: !fieldlambda[`${option}`],
					  }
					: fieldlambda
			),
		}));
	};

	const updateOption = (option_ordering: number, newValue: string) => {
		setForm((prev) => ({
			...prev,
			fields: prev.fields.map((fieldlambda, index) =>
				index === field.field_ordering - 1
					? {
							...fieldlambda,
							field_options: fieldlambda.field_options.map(
								(option, optionindex) =>
									optionindex === option_ordering - 1
										? {
												...option,
												option_name: newValue,
												option_value: newValue,
										  }
										: option
							),
					  }
					: fieldlambda
			),
		}));
	};

	const addOption = () => {
		const newOption = {
			option_ordering: field.field_options.length + 1,
			option_name: "",
			option_value: "",
		};

		setForm((prev) => ({
			...prev,
			fields: prev.fields.map((fieldlambda, index) =>
				index === field.field_ordering - 1
					? {
							...fieldlambda,
							field_options: [
								...fieldlambda.field_options,
								newOption,
							],
					  }
					: fieldlambda
			),
		}));
	};

	const removeOption = (optionOrdering: number) => {
		const optionOrderValue = optionOrdering;
		setForm((prev) => ({
			...prev,
			fields: prev.fields.map((fieldlambda, index) =>
				index === field.field_ordering - 1
					? {
							...fieldlambda,
							field_options: fieldlambda.field_options.filter(
								(option) =>
									option.option_ordering !== optionOrderValue
							),
					  }
					: fieldlambda
			),
		}));
		setForm((prev) => ({
			...prev,
			fields: prev.fields.map((fieldlambda, index) =>
				index === field.field_ordering - 1
					? {
							...fieldlambda,
							field_options: fieldlambda.field_options.map(
								(option) =>
									option.option_ordering > optionOrderValue
										? {
												...option,
												option_ordering:
													option.option_ordering - 1,
										  }
										: option
							),
					  }
					: fieldlambda
			),
		}));
	};

	return (
		<div className={styles.fieldContainer}>
			<div className={styles.fieldTypeName}>{fieldTypeName}</div>
			<input
				type="text"
				placeholder="Question"
				value={field.field_name}
				onChange={(e) => updateFieldName(e.target.value)}
				className={styles.fieldName}
			/>
			<input
				type="text"
				placeholder="Description de la question"
				value={field.field_description}
				onChange={(e) => updateFieldDescription(e.target.value)}
				className={styles.fieldDescription}
			/>
			{(field.field_type_id === 2 ||
				field.field_type_id === 7 ||
				field.field_type_id === 12) && (
				<>
					<div className={styles.optionsTitle}>Options</div>
					<div className={styles.optionsContainer}>
						{field.field_options?.map((option) => (
							<div
								key={option.option_ordering}
								className={styles.optionContainer}
							>
								<input
									type="text"
									value={option.option_value}
									onChange={(e) =>
										updateOption(
											option.option_ordering,
											e.target.value
										)
									}
									className={styles.input}
									required
								/>

								<button
									type="button"
									onClick={() =>
										removeOption(option.option_ordering)
									}
									className={styles.deleteBtn}
								>
									<CloseIcon className={styles.closeIcon} />
								</button>
							</div>
						))}
						<button
							type="button"
							onClick={addOption}
							className={styles.addBtn}
						>
							<span>+</span>
						</button>
					</div>
				</>
			)}
			<div className={styles.fieldOptions}>
				<div className={styles.requiredAndUniqueContainer}>
					<div className={styles.required}>
						<label htmlFor="is_required">Obligatoire:</label>
						<input
							type="checkbox"
							id="is_required"
							name="is_required"
							checked={field.is_required}
							onChange={() =>
								handleChangeFieldOption("is_required")
							}
							className={styles.checkbox}
						/>
					</div>
					{![2, 3, 5, 10, 7, 12, 13].includes(
						field.field_type_id
					) && (
						<div className={styles.unique}>
							<label htmlFor="is_unique">Unique:</label>
							<input
								type="checkbox"
								id="is_unique"
								name="is_unique"
								checked={field.is_unique}
								onChange={() =>
									handleChangeFieldOption("is_unique")
								}
								className={styles.checkbox}
							/>
						</div>
					)}
				</div>
				<button
					type="button"
					onClick={removeField}
					className={styles.deleteOptionBtn}
				>
					<BinIcon className={styles.deleteIcon} />
				</button>
			</div>
		</div>
	);
};

export default FormField;
