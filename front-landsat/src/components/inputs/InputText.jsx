import React from 'react';
import './InputText.css'; // Puedes agregar estilos aquí si lo deseas

const InputText = ({ type, name, value, placeholder, onChange, label }) => {
  return (
    <div className="input-container">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        id={name}
      />
    </div>
  );
};

export default InputText;
