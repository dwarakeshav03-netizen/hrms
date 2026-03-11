const Button = ({ label, type = "primary", onClick }) => {
  return (
    <button className={`btn ${type}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
