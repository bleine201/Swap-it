import "./Details.css";

const Details = (props) => (
  <div className="DetailsProducts">
    <p>{props.title}</p>
    <p>Price : {props.price}$</p>
  </div>
);

export default Details;
