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

const ArticleId = () => {
    const classes = useStyles();

    let id = window.location.pathname.replace("/admin/article/", "");

    const api = `http://127.0.0.1:8000/api/ads/${id}`;
    const [article, setArticle] = useState([]);

    useEffect(() => {
        axios.get(api)
            .then(response => {
                setArticle(response.data)
            })
    }, [api])

    return (
        <section>
            <div className={classes.back}>
                <Button href="/admin/user" variant="contained" color="primary">
                <ArrowBackIosIcon /> Back
                </Button>
            </div>
            <div className={classes.article}>
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            height="140"
                            image="/static/images/cards/contemplative-reptile.jpg"
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {article.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {article.description}
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                            {article.username}
                        </Button>
                    </CardActions>
                </Card>
            </div>
        </section>
    );
};

export default ArticleId;