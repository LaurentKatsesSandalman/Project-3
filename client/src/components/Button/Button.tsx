import clsx from "clsx";
import styles from "./Button.module.css";

interface ButtonProps {
	children: React.ReactNode;
	variant: "Primary" | "Secondary" | "Danger";
	style?: React.CSSProperties;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	type?: "button" | "submit" | "reset";
}

const Button = ({
	children,
	variant,
	style,
	onClick,
	type = "button",
}: ButtonProps) => {
	return (
		<button
			className={clsx(
				styles.base,
				variant === "Primary" && styles.primary,
				variant === "Secondary" && styles.secondary,
				variant === "Danger" && styles.danger,
			)}
			style={style}
			onClick={onClick}
			type={type}
		>
			{children}
		</button>
	);
};

export default Button;
