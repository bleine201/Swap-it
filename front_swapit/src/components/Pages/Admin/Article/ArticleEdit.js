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
  });


const ArticleEdit = (match) => {

    const form = useForm();
    const classes = useStyles();

    const id = match.match.params.id

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
      });
      };

    useEffect(() => {
      axios.get(api)
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

    return (
        <section className='article-edit'>
            <div className={classes.back}>
                <Button href="/admin/article" variant="contained" color="primary">
                <ArrowBackIosIcon /> Back
                </Button>
            </div>
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
                    label="Description"
                    multiline
                    rows={4}
                    onChange={(event) => setDescription(event.target.value)}
                    defaultValue={article.description}
                    />
                </div>
                <div className={classes.user}>
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
                          Add
                        </Button>
                </div>
            </form>
        </section>
    );
};

export default ArticleEdit;