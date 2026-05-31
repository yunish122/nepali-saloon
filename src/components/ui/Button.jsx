function Button({ title, children, size = "md", className = "", type = "button", ...props }) {
    const sizes = {
        sm: "px-2 py-1 text-xs",
        md: "px-3 py-1.5 text-sm",
        lg: "px-4 py-2 text-base",
    }
    return (
        <button type={type} className={`${sizes[size]} ${className}`} {...props}>
            {children ?? <span>{title}</span>}
        </button>
    )
}
export default Button