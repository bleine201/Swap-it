import {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from "axios";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Home() {
  const classes = useStyles();
  const [id, setId] = useState("");
  


    axios.get("http://localhost:3000/api/user")
    .then((response) => {
      console.log(response);
    });
  

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="body2" component="p" onClick={(event) => setId(event.target.value)}>
          well meaning and kindly.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">message the seller</Button>
      </CardActions>
    </Card>
  );
}
