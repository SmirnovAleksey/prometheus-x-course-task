import './input.css'

export const Input = ({ placeholder, value, onChange, styleMod, id }) => {
    return (
        <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`input ${styleMod || ""}`}
            id={id}
        />
    )
}
