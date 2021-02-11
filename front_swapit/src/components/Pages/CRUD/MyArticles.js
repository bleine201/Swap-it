import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        marginTop: 100,
        width: 500,
        marginRight: 100,
    },
    article: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap:'wrap',
    },
    back: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 50,
        marginLeft: 100,
        marginRight: 100,
      },
});

const MyArticles = () => {

    const classes = useStyles();
    const userProfile = `http://localhost:8000/api/auth/profile`;

    const [articles, setArticle] = useState([]);
    const [profile, setProfile] = useState([]);

    let token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    useEffect(() => {
      axios.get(userProfile, config)
        .then(response => {
          setProfile(response.data)
          })
        }, [userProfile])
    
    const api = `http://127.0.0.1:8000/api/ads/user/${profile.id}`;

    useEffect(() => {
        axios.get(api, config)
            .then(response => {
                setArticle(response.data)
            })
    }, [api])

    const onDelete = (id) => {
        axios.delete(`http://localhost:8000/api/ads/${id}`, config).then(res => {
          const del = articles.filter(article => id !== article.id);
          setArticle(del);
        })
      }

    return (
        <section>
            <div className={classes.back}>
                <Button href="#" variant="contained" color="primary">
                    <ArrowBackIosIcon /> Back
                </Button>
                <Fab 
                    color="secondary" 
                    aria-label="add" 
                    className={classes.margin}
                    href="/addarticle" 
                >
                    <AddIcon />
                </Fab>
            </div>
            <div className={classes.article}>
                {articles.map((article) => (
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardContent>
                        {article.id}
                            <Typography gutterBottom variant="h5" component="h2">
                                {article.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {article.description}
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button 
                            size="small" 
                            href={`/myarticles/${article.id}`}
                        >
                            More
                        </Button>
                        <Button 
                            size="small" 
                            color="primary"
                            href={`/myarticles/edit/${article.id}`}
                        >
                            Edit
                        </Button>
                        <Button 
                            size="small" 
                            color="secondary"
                            onClick={() => onDelete(article.id)}
                        >
                            Delete
                        </Button>
                    </CardActions>
                </Card>
                ))}
            </div>
            
        </section>
    );
};

export default MyArticles;