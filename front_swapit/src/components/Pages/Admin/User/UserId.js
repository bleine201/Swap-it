import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { green } from '@material-ui/core/colors';
import axios from 'axios';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useAvatar = makeStyles((theme) => ({
    
    rounded: {
    color: '#fff',
    backgroundColor: green[500],
    padding: 100,
    marginLeft: 30,
  },
}));

const useStyles = makeStyles({
    userid: {
        display: 'flex',
        justifyContent: 'center',
    },
    bold: {
        fontWeight: 'bold',
    },
    back: {
        marginTop: 50,
        marginLeft: 100,
      },
    root: {
        maxWidth: 345,
        marginTop: 100,
    },
  });

const UserId = ({match}) => {
    const picture = useAvatar();
    const classes = useStyles();

    const id = match.params.id
    const api = `http://localhost:8000/api/user/${id}`;
    const [user, setUser] = useState([])

    useEffect(() => {
      axios.get(api)
        .then(response => {
          setUser(response.data)
          // console.log(users);
          })
        }, [api])

    return (
        <setion >
            <div className={classes.back}>
                <Button href="/admin/user" variant="contained" color="primary">
                <ArrowBackIosIcon /> Back
                </Button>
            </div>
            <div className={classes.userid}>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia>
                        <Avatar variant="rounded" className={picture.rounded}>
                            {user.username}
                        </Avatar>
                    </CardMedia>                  
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {user.firstname} {user.lastname}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    <div className={classes.info}>
                        <p><span className={classes.bold}>Email: </span>{user.email}</p>
                        <p><span className={classes.bold}>Number: </span>{user.phone_number}</p>
                        <p><span className={classes.bold}>Address: </span>{user.address}</p>
                        <p><span className={classes.bold}>City: </span>{user.city} {user.postcode}</p>
                    </div>
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            </div>       
        </setion>
    );
};

export default UserId;