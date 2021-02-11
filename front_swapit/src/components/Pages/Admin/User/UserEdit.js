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

let token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}`
      }
    };

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

const UserEdit = () => {

    const form = useForm();
    const classes = useStyles();

    const id = window.location.pathname.replace("/admin/user/edit/", "");

    const api = `http://localhost:8000/api/user/${id}`;

    const [admin, setAdmin] = useState('');
    const [user, setUser] = useState([]);

    const onUpdate = async () => {
      axios({
        method: 'put',
        url: api, config,
        data: {
          is_admin: admin,
        },
        headers: {
          'Authorization': `Bearer ${token}`
      }
      });
      };

    useEffect(() => {
      axios.get(api, config)
        .then(response => {
          setUser(response.data)
          })
        }, [api])

    
    return (
        <section className='user-edit'>
            <div className={classes.back}>
                <Button href="/admin/user" variant="contained" color="primary">
                <ArrowBackIosIcon /> Back
                </Button>
            </div>
            <form className={form.root} noValidate autoComplete="off" onSubmit={onUpdate}>
                <div className={classes.user}>
                    <TextField
                    disabled
                    id="firstname"
                    defaultValue={user.firstname}
                    variant="filled"
                    />
                    <TextField
                    disabled
                    id="lastname"
                    label="Lastname"
                    defaultValue={user.lastname}
                    variant="filled"
                    />
                    <TextField
                    disabled
                    id="username"
                    label="Username"
                    defaultValue={user.username}
                    variant="filled"
                    />
                    <TextField
                    disabled
                    id="address"
                    label="Address"
                    defaultValue={user.address}
                    variant="filled"
                    />
                    <TextField
                    disabled
                    id="city"
                    label="City"
                    defaultValue={user.city}
                    variant="filled"
                    />
                    <TextField
                    disabled
                    id="filled-number"
                    label="Phone Number"
                    defaultValue={user.phone_number}
                    variant="filled"
                    />
                </div>
                <div className={classes.user}>
                    <Button className={form.button} >
                        User Role
                    </Button>
                    <FormControl className={form.formControl}>
                        <InputLabel id="demo-controlled-open-select-label">Admin</InputLabel>
                        <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        value={admin}
                        onChange={(event) => setAdmin(event.target.value)}
                        >
                        <MenuItem value='0'>User</MenuItem>
                        <MenuItem value='1'>Admin</MenuItem>
                        </Select>
                        <Button variant="contained" color="primary" className={classes.add} type='submit'>
                          Add
                        </Button>
                    </FormControl>
                </div>
            </form>
        </section>
    );
};

export default UserEdit;