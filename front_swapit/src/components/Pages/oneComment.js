import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const Comment = () => {
    const classes = useStyles();
    const value=
    return (
        <div>
            <form>
                <input placeholder="Titre du commentaire">
                </input>
                <Box component="fieldset" mb={3} borderColor="transparent">
                    <Typography component="legend">Notez ce swap ! </Typography>
                    <Rating
                        name="simple-controlled"
                        value={value}
                    />
                </Box>
                <textarea>

                </textarea>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}>Envoyer !</Button>
            </form>
        </div>
    )
}

export default Comment;