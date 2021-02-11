import React, {useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';

const useForm = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
      },
    },
    button: {
        display: 'block',
        marginTop: theme.spacing(2),
      },
      formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      input: {
        display: 'none',
      },
      margin: {
        margin: theme.spacing(1),
      },
  }));

const useStyles = makeStyles({
    article: {
        display: 'flex',
        justifyContent: 'center',  
        alignItems: 'center'
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
    text: {
      textAlign: 'center',
      marginTop: 50,
    },
    img: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',  
      alignItems: 'center'
  },
  size:{
    width: 100,
  },
  });

const MyArticleEdit = () => {

    const form = useForm();
    const classes = useStyles();

    const id = window.location.pathname.replace("/myarticles/edit/", "");


    const api = `http://localhost:8000/api/ads/${id}`;
    const filterCategory = `http://localhost:8000/api/ads/category`;
    const filterCondition = `http://localhost:8000/api/ads/condition`;

    const [article, setArticle] = useState([]);
    const [categories, setCategory] = useState([]);
    const [conditions, setCondition] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [cat, setCat] = useState('');
    const [cond, setCond] = useState('');
    const [imageData, setImageData] = useState('');
    const [images, setImage] = useState([]);

    let token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json'}
    };

    const handleChange = e => {
        setImageData(e.target.files[0]);
        console.log(imageData)
    }
    
    const submitData = e => {
        e.preventDefault();
        console.log(imageData)
        const fData = new FormData();

        fData.append('image', imageData);
        fData.append('ads_id', id);

        

        axios.post('http://localhost:8000/api/upload', fData, config,
        )
          .then(res =>{
              console.log('response', res);
          }).catch(e => {
              console.error('echec', e);
          })
    }


    const onUpdate = async () => {
      axios({
        method: 'put',
        url: api,
        data: {
          title: title,
          description: description,
          condition_id: cond,
          category_id: cat,
        },
        headers: {
            'Authorization': `Bearer ${token}`
        }
      });
      };

    useEffect(() => {
      axios.get(api, config)
        .then(response => {
          setArticle(response.data)
          })
        }, [api])
    
    useEffect(() => {
      axios.get(filterCategory)
        .then(response => {
          setCategory(response.data)
          })
        }, [filterCategory])

    useEffect(() => {
      axios.get(filterCondition)
        .then(response => {
          setCondition(response.data)
          })
        }, [filterCondition])

    useEffect(() => {
        axios.get(`http://localhost:8000/api/images/${id}`, config)
            .then(response => {
                setImage(response.data)
            })
    }, [`http://localhost:8000/api/images/${id}`])

    const onDelete = (id) => {
      axios.delete(`http://localhost:8000/api/images/${id}`, config).then(res => {
        const del = images.filter(image => id !== image.id);
        setImage(del);
      })
    }

    return (
        <section className='article-edit'>
            <div className={classes.back}>
                <Button href="/myarticles" variant="contained" color="primary">
                <ArrowBackIosIcon /> Back
                </Button>
            </div>
            <Typography gutterBottom variant="h4" component="h1" className={classes.text}>Edit your product</Typography>
            <form className={form.root} noValidate autoComplete="off" onSubmit={onUpdate}>
                <div className={classes.article}>
                    <TextField
                    id="title"
                    label="Title"
                    onChange={(event) => setTitle(event.target.value)}
                    defaultValue={article.title}
                    />
                    <TextField
                    id="description"
                    multiline
                    rows={4}
                    onChange={(event) => setDescription(event.target.value)}
                    defaultValue={article.description}
                    />
                </div>
                <div className={classes.article}>
                    <Button className={form.button} >
                            Article condition
                    </Button>
                    <FormControl className={form.formControl}>
                        <InputLabel id="demo-controlled-open-select-label">Condition</InputLabel>
                        <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        value={cond}
                        onChange={(event) => setCond(event.target.value)}
                        >
                            {conditions.map((condition) => (
                        <MenuItem value={condition.id}>{condition.state}</MenuItem>
                            ))}
                        </Select>
                        </FormControl>
                        <Button className={form.button} >
                            Article category
                        </Button>
                        <FormControl className={form.formControl}>
                        <InputLabel id="demo-controlled-open-select-label">Category</InputLabel>
    
                        <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        value={cat}
                        onChange={(event) => setCat(event.target.value)}
                        >
                            {categories.map((category) => (
                                <MenuItem value={category.id}>{category.name}</MenuItem>

                            ))}
                        </Select>
                    </FormControl>
                    <Button variant="contained" color="primary" className={classes.add} type='submit'>
                          Update
                        </Button>
                </div>
            </form>
            <Typography gutterBottom variant="h4" component="h1" className={classes.text}>Add a picture</Typography>
            <div className={classes.article}>
            <form className={classes.img} noValidate autoComplete="off" onSubmit={submitData} encType="multipart/form-data">
                    <input
                        accept="image/*"
                        id="contained-button-file"
                        type="file"
                        className={form.input}
                        onChange={handleChange}
                    />
                    <label htmlFor="contained-button-file">
                    <IconButton color="primary" aria-label="upload picture" component="span">
                      <PhotoCamera /> Choose a picture
                    </IconButton>
                    </label>

                <Button 
                    variant="contained" 
                    color="primary" 
                    className={classes.add} 
                    type='submit'
                    onClick={submitData}
                >
                        Add picture
                </Button>

            </form>
            </div>
            <div className={classes.article}>
              {images.map((image => (
                <div>
                  <img 
                  src={`http://127.0.0.1:8000/storage/uploads/${image.name}`}
                  alt={image.name}
                  className={classes.size}
                />
                <IconButton 
                  aria-label="delete" 
                  color="secondary" 
                  className={form.margin}
                  onClick={() => onDelete(image.id)}
                >
                    <DeleteIcon/>
                  </IconButton>
              </div>
              
              )))}
            </div>
        </section>
    );
};

export default MyArticleEdit;