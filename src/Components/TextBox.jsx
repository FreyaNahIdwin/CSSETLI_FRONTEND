export default function TextBox({ title, placeholder, type, value, setValue }) {
    return (
        <div className="mb-3 w-100"> {/* Adtam hozzá egy kis alsó margót és biztosítottam a 100% szélességet */}
            <label htmlFor={title} className="form-label csetliColor">{title}</label>
            <input 
                type={type} 
                className="form-control" 
                id={title} 
                placeholder={placeholder} 
                value={value} 
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    )
}