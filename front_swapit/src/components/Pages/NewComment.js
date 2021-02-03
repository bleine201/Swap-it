import React from 'react';
import { sizing } from '@material-ui/system';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import axios from 'axios';
import url from '../../url.js'

/*
NewComment component need to receive twos props :
-comment_author
-comment_target

NewComment use url.js file
*/

const NewComment = (props) => {
        
    /*STYLES */
    const useStyles = makeStyles((theme) => ({
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
        textarea:{
            borderRadius: "4px",
            border:"solid 1px rgb(200,200,200)",
            width:"100%"
        },
        input:{
            width:"100%"
        },
        form:{
            padding:"1em"
        }
    }));

    /* POST  */
    const API_URL = url + "post_comment"

    const SEND = event => {
        event.preventDefault();
        var commentForm = document.getElementById('commentForm');
        var formData = new FormData(commentForm);
        axios({
            method: 'post',
            url: API_URL,
            data: formData
        })
        .then(res => {
            console.log(res);
            console.log(res.data);
        }); 
    };

    /*DOM */

    const classes = useStyles();
    const [value, setValue]=React.useState(4);//allow to not create class. 4 =default value
    var val = value;//value to send for the rating
    return (
        <div>
            <form class={classes.form} id="commentForm">
                <input placeholder="Titre du commentaire" className={classes.input} nom ="title"></input>
                <input value={val} type="hidden" name="ratings"></input>
                <input value={props.comment_author} type="hidden" name="comment_author"></input>
                <input value={props.comment_target} type="hidden" name="comment_target"></input>
                <Box mx="auto" borderColor="transparent" >
                    <Typography component="legend">Notez ce swap ! </Typography>
                    <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                    />
                </Box>
                <TextareaAutosize  placeholder="Ecrivez-votre commentaire ici" rowsMin={6} className={classes.textarea} name="content"/>
                <Button 
                    onClick={SEND}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}>Envoyer !</Button>
            </form>
        </div>
    )
}

export default NewComment;