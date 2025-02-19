import "./Spinner.css"; // Import CSS for styling
import logo from "../Images/logoSpinner/logo.svg"; // Import logo image
const Loader = () => {
  return (
    <div className={`loader-container`}>
      <img src={logo} alt="Logo" className="loader-logo" />
      <div className="dots-container">
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
    </div>
  );
};

export default Loader;
