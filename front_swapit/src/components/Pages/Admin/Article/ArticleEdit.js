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
    user: {
        display: 'flex',
        justifyContent: 'center',
        flex: 'wrap',   
    },
    back: {
        marginTop: 50,
        marginLeft: 100,
      },
    add: {
      marginTop:30,
    }
  });


const ArticleEdit = () => {

    const form = useForm();
    const classes = useStyles();
    
    return (
        <section>
            
        </section>
    );
};

export default ArticleEdit;