import "./css/loader.css";

function Loader({ text = "Loading..." }) {
  return (
    <div className="loader-overlay">
      <div className="loader-box">
        <div className="spinner" />
        <p>{text}</p>
      </div>
    </div>
  );
}

export default Loader;
