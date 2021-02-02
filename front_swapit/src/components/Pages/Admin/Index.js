import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
      width: '100px',
      marginBottom: '6%',
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    cardadm: {
      maxWidth: '600px',
      margin: 'auto',
      display: 'flex',
      flexWrap: 'wrap',
      marginTop: '8%',
      alignItems: 'center',
      justifyContent: 'space-between',

    },
  });

const Index = () => {

  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
    
    return (
      <section className={classes.cardadm}>
        <Card className={classes.root}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  User Parameter
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                Setting of all user
                </Typography>
              </CardContent>
              <CardActions>
                <Button href="/admin/user" size="small">+</Button>
              </CardActions>
          </Card>

          <Card className={classes.root}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  Ad Parameter
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  Setting of all ads
                </Typography>
              </CardContent>
              <CardActions>
                <Button href="/admin/ad" size="small">+</Button>
              </CardActions>
            </Card>
            <Card className={classes.root}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  Image Parameter
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  Setting of all images
                </Typography>
              </CardContent>
              <CardActions>
                <Button href="/admin/image" size="small">+</Button>
              </CardActions>
            </Card>
            <Card className={classes.root}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  Comment Parameter
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  Setting of all comment
                </Typography>
              </CardContent>
              <CardActions>
                <Button href="/admin/comment" size="small">+</Button>
              </CardActions>
            </Card>
            
      </section>
    );
};

export default Index;