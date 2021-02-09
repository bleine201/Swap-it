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
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';


const useAvatar = makeStyles((theme) => ({
    
    rounded: {
    color: '#fff',
    backgroundColor: green[500],
    padding: 100,
    marginLeft: 30,
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
    userid: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 30,
    },
    comment: {
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

const UserId = () => {
    const picture = useAvatar();
    const classes = useStyles();
    const btn = useButton();

    let idUser = window.location.pathname.replace("/admin/user/", "");

    const api = `http://localhost:8000/api/user/${idUser}`;
    const commentAPI = `http://localhost:8000/api/allcomment/${idUser}`;
    const [user, setUser] = useState([]);
    const [comments, setComment] = useState([]);
    

    useEffect(() => {
      axios.get(api)
        .then(response => {
          setUser(response.data)
          // console.log(users);
          })
        }, [api])

    useEffect(() => {
      axios.get(commentAPI)
        .then(response => {
          setComment(response.data)
          // console.log(users);
          })
        }, [commentAPI])

    
    const onDelete = (id) => {
      axios.delete(`http://localhost:8000/api/delete_one_comment?comment_id=${id}`).then(res => {
        const del = comments.filter(comment => id !== comment.id);
        setUser(del);
      })
    }

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
              <Typography gutterBottom variant="h5" className={classes.text}>Comment Section</Typography>
            <div className={classes.userid}>
            {comments.map((comment => (
           <div>
           <Card className={classes.comment}>
               <CardActionArea>                
                   <CardContent>
                   <Typography gutterBottom variant="h5" component="h2">
                    {comment.title} 
                      <span>
                        <Box component="fieldset" mb={3} borderColor="transparent">
                        <Typography component="legend">{comment.ratings}</Typography>
                        <Rating name="read-only" value={`${comment.ratings}`}  readOnly />
                      </Box>
                      </span>
                   </Typography>
                   <Typography variant="body2" color="textSecondary" component="p">
                   <div className={classes.info}>
                      {comment.content}
                   </div>
                   </Typography>
                   <IconButton 
                    aria-label="delete" 
                    color="secondary" 
                    className={btn.margin}
                    onClick={() => onDelete(comment.id)}
                            >
                    <DeleteIcon/>
                    </IconButton>
                   </CardContent>
               </CardActionArea>
           </Card>
           </div> 
              
               
            )))}
            
            </div>      
        </setion>
    );
};

export default UserId;