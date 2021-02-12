import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { green } from '@material-ui/core/colors';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import EditIcon from '@material-ui/icons/Edit';

const useAvatar = makeStyles((theme) => ({
    
    rounded: {
    color: '#fff',
    backgroundColor: green[500],
    padding: 100,
    marginLeft: 30,
    marginRight: 30,
  },
}));

const useButton = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));

const useStyles = makeStyles({
    profileid: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 30,
    },
    profile: {
      marginRight: 30,
      
    },
    text: {
      textAlign: 'center',
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

const Profile = () => {

    const profileProfile = `http://localhost:8000/api/auth/profile`;
    const [profile, setProfile] = useState([]);

    const picture = useAvatar();
    const classes = useStyles();
    const btn = useButton();


    let token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    useEffect(() => {
      axios.get(profileProfile, config)
        .then(response => {
          setProfile(response.data)
          })
        }, [profileProfile])

    return (
        <section>
            <div className={classes.back}>
                <Button href="/profileupdate" variant="contained" color="primary">
                <EditIcon /> Update
                </Button>
            </div>
            <div>
                <div className={classes.profileid}>
                <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia>
                        <Avatar variant="rounded" className={picture.rounded}>
                            {profile.username}
                        </Avatar>
                    </CardMedia>                  
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {profile.firstname} {profile.lastname}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    <div className={classes.info}>
                        <p><span className={classes.bold}>Email: </span>{profile.email}</p>
                        <p><span className={classes.bold}>Address: </span>{profile.address}</p>
                        <p><span className={classes.bold}>City: </span>{profile.city} {profile.postcode}</p>
                    </div>
                    </Typography>
                    <Box component="fieldset" mb={3} borderColor="transparent">
                        <Typography component="legend">{profile.avg_ratings}</Typography>
                        <Rating name="read-only" value={`${profile.avg_ratings}`}  readOnly />
                      </Box>
                    </CardContent>
                </CardActionArea>
            </Card>
                </div>    
            </div> 
        </section>
    );
};

export default Profile;