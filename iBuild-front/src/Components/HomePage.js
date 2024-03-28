import {
    Button, Card, CardActionArea, CardActions,
    CardContent, CardMedia, Grid, makeStyles,
    Typography
} from '@material-ui/core';
import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { Redirect } from 'react-router';
import analytics from "../Assets/analytics.jfif";
import product from "../Assets/products.png";
import Sidebar from "./Sidebar";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        minHeight: 200,
        width: 250,
        marginLeft: 50,
        marginTop: 6
    },
});

function HomePage(props) {

    const [username, setUsername] = useState(localStorage.getItem("user"));
    const classes = useStyles();

    if (username !== null) {
        return (
            <>
                <Sidebar props={props} />
                <Grid container style={{ paddingTop: '10%', paddingLeft: '5%', flex: 1 }}>
                    <Grid item xl={4} xs={4} lg={4} md={4}>
                        <Card className={classes.root}>
                            <ReactPlayer controls={true} url={"https://youtu.be/mOh3QfLrNNs"} height={208} width={346} />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Start building your website
                            </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    iBuild provides you with a platform that helps you build websites easily and for free.
                                    Watch this trailer to see how to you can start building.
                            </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary" onClick={(e) => props.history.push("/editor")}>
                                    Start now
                        </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xl={4} xs={4} lg={4} md={4}>
                        <Card className={classes.root}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image={product}
                                    title="Products"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Add your products
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        In the products page you can enter all the products you sell, compute their price and
                                        link them to their vendor.
                            </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary" onClick={(e) => props.history.push("/products/all")}>
                                    Go to products
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xl={4} xs={4} lg={4} md={4}>
                        <Card className={classes.root}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image={analytics}
                                    title="Analytics"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Your own analytics page
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        iBuild supports you with your own analyitcs
                                        page to make it easier for you to understand how are the sales going.
                            </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary" onClick={(e) => props.history.push("/analytics")}>
                                    Go to analytics
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </>
        )
    }
    else {
        return (
            <Redirect to='/' />
        );
    }
}


export default HomePage
