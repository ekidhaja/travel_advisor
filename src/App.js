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

  //get user's geolocation
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoords({ lat: latitude, lng: longitude });
    });
  }, []);

  //fetch places data based on user geolocation
  useEffect(() => {
    getPlacesData(bounds.sw, bounds.ne)
      .then(data => {
        console.log(data)
        setPlaces(data);
      })

  }, [bounds, coords])

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: '100%' }}>
          <Grid item xs={12} md={4}>
            <List places={places} />
          </Grid>
          <Grid item xs={12} md={8}>
              <Map 
                setCoords={setCoords}
                setBounds={setBounds}
                coords={coords}
              />
          </Grid>
      </Grid>
    </>
  );
}

export default App;
