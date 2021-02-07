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

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        marginTop: 100,
    },
    article: {
        display: 'flex',
        justifyContent: 'center',
    }
});

const ArticleId = (match) => {
    const classes = useStyles();

    const id = match.match.params.id;
    console.log(id);
    const api = `http://127.0.0.1:8000/api/ads/${id}`;
    const [article, setArticle] = useState([]);

    useEffect(() => {
        axios.get(api)
            .then(response => {
                setArticle(response.data)
            })
    }, [api])

    return (
        <section className={classes.article}>
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
        </section>
    );
};

export default ArticleId;