import { useState, useEffect, createRef } from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import PlaceDetails from '../place_details/PlaceDetails';
import useStyles from './styles.js';

const List = ({ places, childClicked, isLoading, type, setType, rating, setRating }) => {
    const classes = useStyles();
    const [elRefs, setElRefs] = useState([]);
    
    //get references to all places elements on the dom
    useEffect(() => {
        setElRefs((refs) => Array(places?.length).fill().map((_, i) => refs[i] || createRef()));
    }, [places]);

    return ( 
        <div className={classes.container}>
            <Typography variant="h4"><span style={{ textTransform: 'capitalize'}}>{type}</span> around you</Typography>
            {isLoading ? (
                <div className={classes.loading}>
                <CircularProgress size="5rem" />
                </div>
            ) : (
            <>
                <FormControl className={classes.formControl}>
                    <InputLabel id="type">Type</InputLabel>
                    <Select id="type" value={type} onChange={(e) => setType(e.target.value)}>
                        <MenuItem value="restaurants">Restaurants</MenuItem>
                        <MenuItem value="hotels">Hotels</MenuItem>
                        <MenuItem value="attractions">Attractions</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel id="rating">Rating</InputLabel>
                    <Select id="rating" value={rating} onChange={(e) => setRating(e.target.value)}>
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="3">Above 3.0</MenuItem>
                        <MenuItem value="4">Above 4.0</MenuItem>
                        <MenuItem value="4.5">Above 4.5</MenuItem>
                    </Select>
                </FormControl>

                {/*display places results */}
                <Grid container spacing={3} className={classes.list}>
                   {places?.length ? places.map((place, i) => (
                    <Grid ref={elRefs[i]} key={i} item xs={12}>
                        <PlaceDetails selected={Number(childClicked) === i} refProp={elRefs[i]} place={place} />
                    </Grid>
                   )) 
                   : <Grid item xs={12}><h2>No results found!</h2></Grid>} 
                   
                   
                   {/*{places?.map((place, i) => (
                    <Grid ref={elRefs[i]} key={i} item xs={12}>
                        <PlaceDetails selected={Number(childClicked) === i} refProp={elRefs[i]} place={place} />
                    </Grid>
                   ))} */}
                </Grid>
            </>
            )}
        </div>
     );
}
 
export default List;