import './button.css'



export const Button = ({ onClick, title, styleMod, type, children, ...rest }) => {

    return (
        <button
            type={type}
            className={`button ${styleMod || ''}`}
            onClick={onClick}
            {...rest}
        >
            {title}{children}
        </button>
    )
} 
