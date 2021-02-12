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
        flexWrap: 'wrap',   
    },
    back: {
        marginTop: 50,
        marginLeft: 100,
      },
    add: {
      marginTop:30,
    }
  });

const UpdateProfile = () => {

    const form = useForm();
    const classes = useStyles();

    const profileProfile = `http://localhost:8000/api/auth/profile`;
    const [profile, setProfile] = useState([]);


    useEffect(() => {
        axios.get(profileProfile, config)
          .then(response => {
            setProfile(response.data)
            })
          }, [profileProfile])


    const api = `http://localhost:8000/api/user/${profile.id}`;

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [address, setAddress] = useState('');
    const [postcode, setPostcode] = useState('');
    const [city, setCity] = useState('');
    const [email, setEmail] = useState('');



    const [user, setUser] = useState([]);

    const onUpdate = async () => {
      axios({
        method: 'put',
        url: api, config,
        data: {
          firstname:firstname,
          lastname:lastname,
          username:username,
          address:address,
          postcode:postcode,
          city:city,
          email:email,
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
                <Button href="/myprofile" variant="contained" color="primary">
                <ArrowBackIosIcon /> Back
                </Button>
            </div>
            <form className={form.root} noValidate autoComplete="off" onSubmit={onUpdate}>
                <div className={classes.user}>
                    <TextField
                    label="Firstname"
                    id="firstname"
                    onChange={(event) => setFirstname(event.target.value)}
                    defaultValue={user.firstname}
                    variant="filled"
                    />
                    <TextField
                    id="lastname"
                    label="Lastname"
                    onChange={(event) => setLastname(event.target.value)}
                    defaultValue={user.lastname}
                    variant="filled"
                    />
                    <TextField
                
                    id="username"
                    label="Username"
                    onChange={(event) => setUsername(event.target.value)}
                    defaultValue={user.username}
                    variant="filled"
                    />
                    <TextField
                    id="email"
                    label="Email"
                    onChange={(event) => setEmail(event.target.value)}
                    defaultValue={user.email}
                    variant="filled"
                    />
                    <TextField
                
                    id="address"
                    label="Address"
                    onChange={(event) => setAddress(event.target.value)}
                    defaultValue={user.address}
                    variant="filled"
                    />
                    <TextField
                
                    id="city"
                    label="City"
                    onChange={(event) => setCity(event.target.value)}
                    defaultValue={user.city}
                    variant="filled"
                    />
                    <TextField
                
                    id="postcode"
                    label="Postcode"
                    onChange={(event) => setPostcode(event.target.value)}
                    defaultValue={user.postcode}
                    variant="filled"
                    />
                    <Button variant="contained" color="primary" className={classes.add} type='submit'>
                          Update
                        </Button>
                </div>
            </form>
        </section>
    );
};

export default UpdateProfile;