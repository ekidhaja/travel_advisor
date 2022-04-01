import { CssBaseline, Grid } from "@material-ui/core";
import Header from "./components/header/Header";
import List from "./components/list/List";
import Map from "./components/map/Map";

import { useState, useEffect } from 'react';

import { getPlacesData } from './api';

function App() {
  const [places, setPlaces] = useState([]);
  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState({}); //edit later
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  //get user's geolocation
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoords({ lat: latitude, lng: longitude });
    });
  }, []);

  //fetch places data based on user geolocation
  useEffect(() => {
    setIsLoading(true);
    getPlacesData(bounds?.sw, bounds?.ne)
      .then(data => {
        setPlaces(data);
        setIsLoading(false);
      })

  }, [bounds, coords])

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: '100%' }}>
          <Grid item xs={12} md={4}>
            <List 
              places={places} 
              childClicked={childClicked} 
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={8}>
              <Map 
                setCoords={setCoords}
                setBounds={setBounds}
                coords={coords}
                places={places}
                setChildClicked={setChildClicked}
              />
          </Grid>
      </Grid>
    </>
  );
}

export default App;
