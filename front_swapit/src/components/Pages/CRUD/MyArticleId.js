import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Carousel from 'react-bootstrap/Carousel';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        marginTop: 100,
    },
    article: {
        display: 'flex',
        justifyContent: 'center',
    },
    back: {
        marginTop: 50,
        marginLeft: 100,
      },
});

const MyArticleId = () => {
    const classes = useStyles();

    let id = window.location.pathname.replace("/myarticles/", "");

    const api = `http://127.0.0.1:8000/api/ads/${id}`;
    const [article, setArticle] = useState([]);
    const [images, setImage] = useState([]);

    let token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'}
    };

    useEffect(() => {
        axios.get(api, config)
            .then(response => {
                setArticle(response.data)
            })
    }, [api])

    useEffect(() => {
        axios.get(`http://localhost:8000/api/images/${id}`, config)
            .then(response => {
                setImage(response.data)
            })
    }, [`http://localhost:8000/api/images/${id}`])


    return (
        <section>
            <div className={classes.back}>
                <Button href="/myarticles" variant="contained" color="primary">
                <ArrowBackIosIcon /> Back
                </Button>
            </div>
            <div className={classes.article}>
                
            </div>
            <div className={classes.article}>
                <Card className={classes.root}>
                        <Carousel>
                            {images.map((image => (
                            <Carousel.Item>
                                <img
                                className="d-block w-100"
                                src={`http://127.0.0.1:8000/storage/uploads/${image.name}`}
                                alt={image.name}
                                />
                            </Carousel.Item>
                            )))}
                            </Carousel>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {article.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {article.description}
                        </Typography>
                        </CardContent>
                </Card>
            </div>
        </section>
    );
};

export default MyArticleId;