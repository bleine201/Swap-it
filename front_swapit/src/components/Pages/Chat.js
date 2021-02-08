import { React, useState, useEffect, Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
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

import Echo from 'laravel-echo';
var Pusher = require('pusher-js');




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
            my_id: ''

        }
        this.Pusher = new Pusher('80589642a046a570bbcb', {
         authEndpoint: "http://localhost:8000/auth/chat",
            cluster: 'eu',
        auth: {
            headers:  { Authorization: `Bearer ${localStorage.getItem("token")}`
         }
        }
         });
        
        // this.Echo = new Echo({
        //     broadcaster: 'pusher',
        //     key: '80589642a046a570bbcb',
        //     cluster: 'eu',
        //     forceTLS: false,
        //     disableStats: true,
        //     authEndpoint: "http://localhost:8000/auth/chat",
        //     transports: ['websocket', 'polling', 'flashsocket'],
        //      auth: {
        //         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        //      }

        // });


        this.getMyId();

       
        this.loaduser();

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
            });


        // this.Echo.private('ChatMessages.' + id).listen('MessageEvent', (e) => {
        //     alert('hello')
        //     console.log(e)
        // })
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
        axios
            .get("http://localhost:8000/api/user")
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

    };


    // useEffect(() => {
    //     axios
    //         .post("http://localhost:8000/api/getmessage", config, {
    //             user_id: 4,
    //         })
    //         .then((response) => {
    //             setUsers(response.data)
    //             console.log('working!')
    //         }).catch((error) => {
    //             console.log(error)
    //         });
    //     console.log('lol')
    // });


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
                            <ListItem button key="RemySharp">
                                <ListItemIcon>
                                    <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                                </ListItemIcon>
                                <ListItemText primary="John Wick"></ListItemText>
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

                                        <ListItemText secondary="online" align="right"></ListItemText>
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
                                                <ListItemText align={item.is_my_message ? 'right' : 'left'} primary={item.message}></ListItemText>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <ListItemText align={item.is_my_message ? 'right' : 'left'} secondary="09:30"></ListItemText>
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                )
                            }

                            {/* <ListItem key="2">
                                <Grid container>
                                    <Grid item xs={12}>
                                        <ListItemText align="left" primary="Hey, Iam Good! What about you ?"></ListItemText>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ListItemText align="left" secondary="09:31"></ListItemText>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem key="3">
                                <Grid container>
                                    <Grid item xs={12}>
                                        <ListItemText align="right" primary="Cool. i am good, let's catch up!"></ListItemText>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ListItemText align="right" secondary="10:30"></ListItemText>
                                    </Grid>
                                </Grid>
                            </ListItem> */}
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