import './ReusableSelect.css'; // Estilos opcionales

const Select = ({ name, value, onChange, options, label }) => {
  return (
    <div className="select-container">
      {label && <label htmlFor={name}>{label}</label>}
      <select name={name} value={value} onChange={onChange} id={name}>
        <option value="" disabled>
          Selecciona una opción
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
