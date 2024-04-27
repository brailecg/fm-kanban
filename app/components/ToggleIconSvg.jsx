export const ToggleIconSvg = ({ isToggled }) => {
  const circlePositionX = isToggled ? 30 : 10;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={41}
      height={22}
      fill="none"
      className={`toggle ${isToggled ? "active" : ""}`}
      style={{ transition: "all 0.3s ease" }}>
      <rect
        width={40}
        height={20}
        y={1}
        fill={isToggled ? "#a445ed" : "#757575"}
        rx={10}
      />
      <circle
        cx={circlePositionX}
        cy={11}
        r={7}
        fill="#fff"
        style={{ transition: "cx 0.3s ease" }}
      />
    </svg>
  );
};
