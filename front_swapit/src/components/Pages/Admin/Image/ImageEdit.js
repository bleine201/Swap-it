import React, {useEffect, useState} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

const useUpload = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
        },
      },
    input: {
      display: 'none',
    },
  }));

const useStyles = makeStyles({
    image: {
        display: 'flex',
        justifyContent: 'center',  
        marginBottom: 20,
    },
    back: {
        marginTop: 50,
        marginLeft: 100,
      },
    add: {
      marginTop:30,
    },
    label: {
        marginTop: 40,
    },
  });

const ImageEdit = () => {

    const classes = useStyles();
    const img = useUpload();
    const id = window.location.pathname.replace("/admin/image/edit/", "");

    const [upload, setUpload] = useState('');
    const [name, setName] = useState('');
    const [image, setImage]= useState([]);

    const api = `http://localhost:8000/api/picture/${id}`;

    const onUpdate = async () => {
        axios({
          method: 'put',
          url: api,
          data: {
            path:upload,
            name:name,
          },
        });
        };

    useEffect(() => {
        axios.get(api)
          .then(response => {
            setImage(response.data)
            })
          }, [api])

    return (
        <section className='image-edit'>
            <div className={classes.back}>
                <Button href="/admin/image" variant="contained" color="primary">
                <ArrowBackIosIcon /> Back
                </Button>
            </div>
            
                <form className={img.root} noValidate autoComplete="off" onSubmit={onUpdate}>
                <div className={classes.image}>
                <TextField
                    id="title"
                    label="Image name"
                    onChange={(event) => setName(event.target.value)}
                    defaultValue={image.name}
                    />
                    </div>
                <div className={classes.image}>
                <input
                    accept="image/*"
                    className={img.input}
                    id="contained-button-file"
                    multiple
                    type="file" 
                    onChange={(event) => setUpload(event.target.value)}
                />
                 <label htmlFor="contained-button-file">
                    <Button 
                    variant="contained" 
                    color="primary" 
                    component="span"
                    
                    >
                    Upload
                    </Button>
                </label>
                </div>
                <div className={classes.image}>
                    <Button variant="contained" color="primary" className={classes.add} type='submit'>
                            Add
                    </Button>
                    <img src={upload} />
                </div>
                </form>
        </section>
    );
};

export default ImageEdit;