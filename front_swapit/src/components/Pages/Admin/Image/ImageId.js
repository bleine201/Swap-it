import React, {useEffect, useState} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const useStyles = makeStyles({
    imageContainer: {
        display: 'flex',
        justifyContent: 'center',
    },

    text: {
        textAlign: 'center',
    },

    back: {
        marginTop: 50,
        marginLeft: 100,
      },

    image: {
        maxWidth: '30%',
        height: 'auto',
    },


  });

const ImageId = (match) => {

    const classes = useStyles();

    let id = window.location.pathname.replace("/admin/image/", "");

    const api = `http://localhost:8000/api/picture/${id}`;
    const [image, setImage] = useState([]);

    useEffect(() => {
      axios.get(api)
        .then(response => {
          setImage(response.data)
          })
        }, [api])

    return (
        <section className='image-id'>
             <div className={classes.back}>
                <Button href="/admin/image" variant="contained" color="primary">
                <ArrowBackIosIcon /> Back
                </Button>
            </div>
            <h1 className={classes.text}>{image.name}</h1>
            <div className={classes.imageContainer}>
                <img src={`http://127.0.0.1:8000/storage/uploads/${image.name}`} alt={image.name} className={classes.image}/>

            </div>
        </section>
    );
};

export default ImageId;