import "./StateCard.css";

const StatCard = ({ title, value, subtitle, status }) => {
  return (
    <div className={`stat-card ${status || ""}`}>
      <p className="stat-title">{title}</p>
      <h2 className="stat-value">{value}</h2>
      {subtitle && <p className="stat-sub">{subtitle}</p>}
    </div>
  );
};

export default StatCard;
