import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { green } from '@material-ui/core/colors';
import axios from 'axios';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Button from '@material-ui/core/Button';

const useAvatar = makeStyles((theme) => ({
    
    rounded: {
    color: '#fff',
    backgroundColor: green[500],
    padding: 100,
    marginLeft: '50%',
    // position: 'absolute',
    // top: 140,
    // left: 120,
  },
}));

const useStyles = makeStyles({
    userid: {
        marginTop: 50,
        marginRight: 50,
        marginLeft: 50,
        paddingTop: 50,
        paddingBottom: 50,
        marginTop:50,
        marginLeft:100,
        marginRight: 100,
        boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
        display: 'flex',
        justifyContent: 'space-between',
    },
    bold: {
        fontWeight: 'bold',
    },
    info: {
        marginRight: '50%'
    },
    back: {
        marginTop: 50,
        marginLeft: 100,
      }
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
                <div className='avatar'>
                    <Avatar variant="rounded" className={picture.rounded}>
                        {user.username}
                    </Avatar>
                </div>
                <div className={classes.info}>
                    <p>{}</p>
                    <p><span className={classes.bold}>Name: </span>{user.firstname} {user.lastname}</p>
                    <p><span className={classes.bold}>Email: </span>{user.email}</p>
                    <p><span className={classes.bold}>Number: </span>{user.phone_number}</p>
                    <p><span className={classes.bold}>Address: </span>{user.address}</p>
                    <p><span className={classes.bold}>City: </span>{user.city} {user.postcode}</p>
                </div>
            </div> 
        </setion>
    );
};

export default UserId;