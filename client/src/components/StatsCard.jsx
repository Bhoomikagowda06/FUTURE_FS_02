import "./StatsCard.css";

function StatsCard({
  title,
  value,
  icon,
  color,
  change
}) {
  return (
    <div className={`stats-card ${color || ""}`}>

      <div className="card-top">

        <div className="card-icon">
          {icon}
        </div>

        {change && (
          <span className="card-change">
            {change}
          </span>
        )}

      </div>

      <h3>{title}</h3>

      <h1>{value}</h1>

    </div>
  );
}

export default StatsCard;