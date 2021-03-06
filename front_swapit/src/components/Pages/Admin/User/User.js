import React, { useState, useEffect} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

let token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}`
      }
    };

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#5B89C4',
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  const useButton = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));
  
  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
    userTable: {
        marginLeft: 100,
        marginRight: 100,
    },
    title: {
        textAlign: 'center',
        marginBottom: 40,
    },
    back: {
      marginTop: 50,
      marginLeft: 100,
    }
  });


const User = () => {
    const classes = useStyles();
    const btn = useButton();

    const api = `http://localhost:8000/api/user`;
    const [users, setUser] = useState([]);

    useEffect(() => {
      axios.get(api, config)
        .then(response => {
          setUser(response.data)
          // console.log(users);
          })
        }, [api])
    
  

    const onDelete = (id) => {
      axios.delete(`http://localhost:8000/api/user/${id}`, config).then(res => {
        const del = users.filter(user => id !== user.id);
        setUser(del);
      })
    }

    return (
        <section className='user-index'>
          <div className={classes.back}>
            <Button href="/admin" variant="contained" color="primary">
            <ArrowBackIosIcon /> Back
            </Button>
            </div>
            <Typography variant="h5" component="h2" className={classes.title}>
            User
          </Typography>
            <div className={classes.userTable}>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                    <StyledTableCell align="right">Lastname</StyledTableCell>
                    <StyledTableCell align="right">Firstame</StyledTableCell>
                    <StyledTableCell align="right">Username</StyledTableCell>
                    <StyledTableCell align="right">Role</StyledTableCell>
                    <StyledTableCell align="center">Action</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                    <StyledTableRow key={user.id}>
                        {/* <StyledTableCell component="th" scope="row">
                        {user.id}
                        </StyledTableCell> */}
                        <StyledTableCell align="right">{user.lastname}</StyledTableCell>
                        <StyledTableCell align="right">{user.firstname}</StyledTableCell>
                        <StyledTableCell align="right">{user.username}</StyledTableCell>
                        <StyledTableCell align="right">{user.is_admin}</StyledTableCell> 
                        <StyledTableCell align="center">
                          <IconButton href={`/admin/user/${user.id}`} aria-label="show" className={btn.margin}>
                            <VisibilityIcon/>
                          </IconButton>
                          <IconButton href={`/admin/user/edit/${user.id}`} aria-label="edit" color="primary" disableRipple className={btn.margin}>
                            <EditIcon/>
                          </IconButton>
                          <IconButton 
                            aria-label="delete" 
                            color="secondary" 
                            className={btn.margin}
                            onClick={() => onDelete(user.id)}
                            >
                            <DeleteIcon/>
                          </IconButton>
                        </StyledTableCell>
                    </StyledTableRow>
                      ))}
                </TableBody>
                </Table>
            </TableContainer>
            </div>  
        </section>
    );
};

export default User;