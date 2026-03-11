const StatusBadge = ({ status }) => (
  <span className={`status ${status.toLowerCase()}`}>
    {status}
  </span>
);

export default StatusBadge;
