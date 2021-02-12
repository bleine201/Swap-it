import Button from "@material-ui/core/Button";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import "./Details.css";

const Details = (props) => (
  <div className="DetailsProducts">
    <p>{props.title}</p>
    <p>{props.category}</p>
    <Button
      href="/chat"
      variant="contained"
      color="primary"
      style={{
        width: "70%",
        marginLeft: "auto",
        marginRight: "auto",
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      Chat with the vendor
      <ArrowForwardIosIcon />
    </Button>
  </div>
);

export default Details;
