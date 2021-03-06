import React, {useState, useEffect} from 'react';
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
    adTable: {
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
    },
  });

const Article = () => {
    const classes = useStyles();
    const btn = useButton();

    const api = `http://127.0.0.1:8000/api/ads-admin`;
    const [articles, setArticle] = useState([]);

    useEffect(() => {
      axios.get(api, config)
        .then(response => {
          setArticle(response.data)
          console.log(articles);
          })
        }, [api])
      
    const onDelete = (id) => {
      axios.delete(`http://127.0.0.1:8000/api/ads/${id}`, config).then(res => {
        const del = articles.filter(article => id !== article.id);
        setArticle(del);
      })
    }
    return (
        <section className='article-index'>
          <div className={classes.back}>
            <Button href="/admin" variant="contained" color="primary">
            <ArrowBackIosIcon /> Back
            </Button>
          </div>
          <Typography variant="h5" component="h2" className={classes.title}>
            Article
          </Typography>
          <div className={classes.adTable}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Id</StyledTableCell>
                  <StyledTableCell align="center">Article</StyledTableCell>
                  <StyledTableCell align="right">Seller</StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {articles.map((article) => (
                <StyledTableRow key=''>
                  <StyledTableCell component="th" scope="row">
                    {article.id}

                  </StyledTableCell>
                  <StyledTableCell align="center">{article.title}</StyledTableCell>
                  <StyledTableCell align="right">{article.username}</StyledTableCell>
                  <StyledTableCell align="center">
                  <IconButton href={`/admin/article/${article.id}`} aria-label="show" className={btn.margin}>
                      <VisibilityIcon/>
                    </IconButton>
                    <IconButton href={`/admin/article/edit/${article.id}`} aria-label="edit" color="primary" className={btn.margin}>
                      <EditIcon/>
                    </IconButton>
                    <IconButton 
                      aria-label="delete" 
                      color="secondary" 
                      className={btn.margin}
                      onClick={() => onDelete(article.id)}
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

export default Article;