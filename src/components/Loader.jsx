import { createPortal } from "react-dom";
import "./css/loader.css";

function Loader({ text = "Loading..." }) {
  return createPortal(
    <div className="loader-overlay">
      <div className="loader-box">
        <div className="spinner" />
        <p>{text}</p>
      </div>
    </div>,
    document.body
  );
}

export default Loader;
