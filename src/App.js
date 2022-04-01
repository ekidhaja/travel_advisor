import { CssBaseline, Grid } from "@material-ui/core";
import Header from "./components/header/Header";
import List from "./components/list/List";
import Map from "./components/map/Map";

import { useState, useEffect } from 'react';

import { getPlacesData } from './api';

function App() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    getPlacesData()
      .then(data => {
        console.log(data)
        setPlaces(data);
      })

  }, [])

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: '100%' }}>
          <Grid item xs={12} md={4}>
            <List />
          </Grid>
          <Grid item xs={12} md={8}>
              <Map />
          </Grid>
      </Grid>
    </>
  );
}

export default App;
