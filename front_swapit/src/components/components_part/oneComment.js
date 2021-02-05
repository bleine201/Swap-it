import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';


/*
OneComment component need to receive five props :
-comment_author
-title
-content
-ratings
-date

OneComment use url.js file
*/

const OneComment = (props) => {

    /*STYLES */
    const useStyles = makeStyles((theme) => ({
       container:{
            padding: "1em",
            border:"solid 1px rgb(200,200,200)",
            borderRadius:"4px"
        },
    }));

    /*DOM */
    const classes = useStyles();

    return (
        <Container className={classes.container} > 
            <Grid item xs zeroMinWidth>
                <h4 style={{ margin: 0, textAlign: "left" }}>{props.comment_author}</h4>
                <h3 style={{ margin: 0, textAlign: "left" }}>{props.title}</h3>
                <Rating name="read-only" value={props.ratings} readOnly />
                    <p style={{ textAlign: "left" }}>
                    {props.content}
                </p>                
                <p style={{ textAlign: "left", color: "gray" }}>
                    {props.date}
            </p>
            </Grid>
        </Container>
    )
};

export default OneComment;