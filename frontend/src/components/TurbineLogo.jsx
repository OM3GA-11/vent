import "./TurbineLogo.css";

function TurbineLogo() {
  return (
    <div className="turbine">
        <div className="outer-ring"></div>

        <div className="turbine-inner">
        <div className="blades">
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              style={{ "--i": i }}
            />
          ))}
        </div>

        <div className="hub">
          <div className="hub-center" />
        </div>
      </div>
    </div>
  );
}

export default TurbineLogo;