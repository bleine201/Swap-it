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
EditComment component need to receive one props :
-comment_id
EditComment use url.js file
*/

const EDITCOMMENT = (props) => {
        
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

    /*Get data*/
    const API_URL_GET = url + "get_one_comment";
    const comment_id = props.comment_id;
        axios({
            method: 'get',
            url: API_URL_GET,
            params: {"comment_id" : comment_id}
        })
        .then(res => {
            console.log(res.data);
            if(!document.getElementById('content').value){//avoid replacing those element, when rating "oneChange" is calling
                document.getElementById('content').value = res.data.content;
                document.getElementById('title').value = res.data.title;
                document.getElementById('comment_target').value = res.data.comment_target;
                document.getElementById('comment_author').value = res.data.comment_author;
                document.getElementById('rating').textContent = "Vou devez noter à nouveau ce commentaire, note précédente : " + res.data.ratings;
            }
        });

    /* Put  */
    const API_URL = url + "update_one_comment"
    const SEND = event => {
        event.preventDefault();
        axios({
            method: 'put',
            url: API_URL,
            data:null,
            params: {
                comment_id:comment_id,
                ratings:val,
                content:document.getElementById('content').value ,
                comment_target:document.getElementById('comment_target').value,
                comment_author:document.getElementById('comment_author').value,
                title: document.getElementById('title').value
            }
        })
        .then(res => {
            console.log(res.data);
        }); 
    };

    /*DOM */

    const classes = useStyles();
    var [value, setValue]=React.useState(0);//allow to not create class. 4 =default value
    var val = value;//value to send for the rating
    return (
        <div>
            <form className={classes.form} id="commentForm">
                <input placeholder="Titre du commentaire" className={classes.input} name="title" id="title"></input>
                <input value={val} type="hidden" name="ratings"></input>
                <input value={props.comment_id} type="hidden" name="comment_id"></input>
                <input type="hidden" name="comment_author" id="comment_author"></input>
                <input type="hidden" name="comment_target" id="comment_target"></input>
                <Box mx="auto" borderColor="transparent" >
                    <Typography component="legend" id="rating"> </Typography>
                    <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                    />
                </Box>
                <TextareaAutosize rowsMin={6} className={classes.textarea} name="content" id="content"/>
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

export default EDITCOMMENT;