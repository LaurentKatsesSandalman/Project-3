import clsx from "clsx";
import styles from "./Button.module.css";

interface ButtonProps {
    children: React.ReactNode;
    variant: "primary" | "secondary" | "danger" | "create_form";
    className?: string;
    style?: React.CSSProperties;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    type?: "button" | "submit" | "reset";
}

const Button = ({
    children,
    variant,
    className,
    style,
    onClick,
    type = "button",
}: ButtonProps) => {
    return (
        <button
            className={clsx(
                styles.base,
                variant === "primary" && styles.primary,
                variant === "secondary" && styles.secondary,
                variant === "danger" && styles.danger,
                variant === "create_form" && styles.create_form,
                className
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
