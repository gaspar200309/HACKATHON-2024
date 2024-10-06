import './ReusableButton.css'; // Estilos opcionales

const ReusableButton = ({ onClick, label, type = 'button', disabled = false }) => {
  return (
    <button onClick={onClick} type={type} disabled={disabled} className="reusable-button">
      {label}
    </button>
  );
};

export default ReusableButton;
