import "./Image.css";

const Image = (props) => (
  <div className="PhotoImage">
    <img
      src={props.image}
      style={{ height: "100%", width: "100%", objectFit: "contain" }}
      alt="Logo"
    />
  </div>
);

export default Image;
