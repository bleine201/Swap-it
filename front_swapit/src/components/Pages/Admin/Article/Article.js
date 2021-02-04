import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
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
  
  function createData(name, calories, fat) {
    return { name, calories, fat };
  }
  
  const rows = [
    createData('Frozen', 159, 6.0, 24, 4.0),
    createData('Ice', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
  
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
    },
  });

const Article = () => {
    const classes = useStyles();
    const btn = useButton();

    return (
        <section className='ad-index'>
            <h1 className={classes.title}>Article</h1>
            <div className={classes.adTable}>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                    <StyledTableCell>Article</StyledTableCell>
                    <StyledTableCell align="right">Name</StyledTableCell>
                    <StyledTableCell align="right">Ad</StyledTableCell>
                    <StyledTableCell align="center">Action</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                    <StyledTableRow key={row.name}>
                        <StyledTableCell component="th" scope="row">
                        {row.name}
                        </StyledTableCell>
                        <StyledTableCell align="right">{row.calories}</StyledTableCell>
                        <StyledTableCell align="right">{row.fat}</StyledTableCell>
                        <StyledTableCell align="center">
                        <IconButton aria-label="edit" color="primary" className={btn.margin}>
                                <EditIcon/>
                            </IconButton>
                            <IconButton aria-label="delete" color="secondary" className={btn.margin}>
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