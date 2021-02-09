import { React, useState, useEffect, Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import axios from 'axios';
import Swal from 'sweetalert2'


var Pusher = require('pusher-js');

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})



const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    chatSection: {
        width: '100%',
        height: '80vh'
    },
    headBG: {
        backgroundColor: '#e0e0e0'
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0'
    },
    messageArea: {
        height: '70vh',
        overflowY: 'auto'
    }
});

class Chat extends Component {


    constructor(props) {
        super(props);
        this.state = {
            user: [],
            chat: [],
            to: 0,
            message: '',
            classes: '',
            my_id: '',
            username: '',


        }
        this.Pusher = new Pusher('80589642a046a570bbcb', {
            authEndpoint: "http://localhost:8000/auth/chat",
            cluster: 'eu',
            auth: {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        });




        this.getMyId();

        this.loaduser()


        this.state.classes = makeStyles({
            table: {
                minWidth: 650,
            },
            chatSection: {
                width: '100%',
                height: '80vh'
            },
            headBG: {
                backgroundColor: '#e0e0e0'
            },
            borderRight500: {
                borderRight: '1px solid #e0e0e0'
            },
            messageArea: {
                height: '70vh',
                overflowY: 'auto'
            }
        });
    }


    getMyId() {
        var token = localStorage.getItem("token");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios
            .post("http://localhost:8000/api/AuthenticatedUser", {}, config)
            .then((response) => {
                console.log(response)
                this.setState({ my_id: response.data });
                this.listen(response.data)
            }).catch((error) => {
                console.log(error)
            });


    }
    listen(id) {

        var channel1 = this.Pusher.subscribe('ChatMessages.' + id);
        var callback = function (data) {
            // add comment into page
            alert('hel')
        };


        channel1.bind('App\\Events\\SendMessage', (data) => {

            this.getmessage(data.from)
            Toast.fire({
                icon: 'success',
                title: 'You Have New Message'
            })

        });



    }

    sendmessage = (to) => {
        var input = document.getElementById('outlined-basic-email');


        var token = localStorage.getItem("token");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        if (to != 0 && this.state.message != "") {
            axios
                .post("http://localhost:8000/api/sendmessage", {
                    to: to,
                    message: this.state.message,
                }, config)
                .then((response) => {
                    input.value = ""
                    this.setState(
                        { message: '' }
                    )
                    this.getmessage(to)
                    console.log('working!')
                }).catch((error) => {
                    console.log(error)
                });
            console.log('lol')
        }


    };

    loaduser() {
        var token = localStorage.getItem("token");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        axios
            .get("http://localhost:8000/api/user", config)
            .then((response) => {
                this.setState({ user: response.data });
                console.log('working!')
            }).catch((error) => {
                console.log(error)
            });
    }

    getmessage = (id) => {
        this.setState({ to: id });
        var token = localStorage.getItem("token");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        axios.post("http://localhost:8000/api/getmessage", { user_id: id }, config)
            .then((response) => {
                this.setState({ chat: response.data.data });
                console.log('working!')
            }).catch((error) => {
                console.log(error)
            });



        this.state.user.forEach((item) => {
            if (item.id == id) {
                this.setState({ username: item.username });
            }
        });



    };


    render() {
        return (


            <div>


                <Grid container>
                    <Grid item xs={12} >
                        <Typography variant="h5" className="header-message">Chat</Typography>
                    </Grid>
                </Grid>
                <Grid container component={Paper} className={this.state.classes.chatSection}>
                    <Grid item xs={3} className={this.state.classes.borderRight500}>
                        <List>
                            < ListItem button key={
                                this.state.username
                            } >  <ListItemIcon>
                                    < Avatar alt={
                                        this.state.username
                                    }
                                        src="https://material-ui.com/static/images/avatar/1.jpg" />

                                </ListItemIcon>
                                < ListItemText primary={
                                    this.state.username
                                } > </ListItemText>

                            </ListItem>
                        </List>
                        <Divider />
                        <Divider />
                        <List>
                            {

                                this.state.user.map((item) =>

                                    <ListItem button="button" key={item.id} onClick={() => this.getmessage(item.id)}>
                                        <ListItemIcon>
                                            <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                                        </ListItemIcon>
                                        <ListItemText primary={
                                            item.username
                                        }
                                        > {
                                                item.username
                                            }
                                        </ListItemText>

                                    </ListItem>

                                )}



                        </List>
                    </Grid>
                    <Grid item xs={9}>
                        <List className={this.state.classes.messageArea}>
                            {
                                this.state.chat.map((item) =>
                                    <ListItem key={item.id}>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <ListItemText align={item.is_my_message ? 'right' : 'left'} secondary={this.state.username + ':'}></ListItemText>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <ListItemText align={item.is_my_message ? 'right' : 'left'} primary={item.message}></ListItemText>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <ListItemText align={item.is_my_message ? 'right' : 'left'} secondary={item.created_at}></ListItemText>
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                )
                            }


                        </List>
                        <Divider />
                        <Grid container style={{ padding: '20px' }}>
                            <Grid item xs={11}>
                                < TextField id="outlined-basic-email" label="Type Something"
                                    fullWidth onChange={

                                        (event) => this.setState(
                                            { message: event.target.value }
                                        )
                                    } />

                            </Grid>
                            <Grid xs={1} align="right" >
                                <Fab color="primary" aria-label="add" onClick={() => this.sendmessage(this.state.to)}><SendIcon /></Fab>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
export default Chat;