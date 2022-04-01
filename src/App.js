import { CssBaseline, Grid } from "@material-ui/core";
import Header from "./components/header/Header";
import List from "./components/list/List";
import Map from "./components/map/Map";

import { useState, useEffect } from 'react';

import { getPlacesData, getWeatherData } from './api';

function App() {
  const [places, setPlaces] = useState([]);
  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState(null); //edit later
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [autocomplete, setAutocomplete] = useState(null);
  const [weatherData, setWeatherData] = useState([]);

  //get user's geolocation
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoords({ lat: latitude, lng: longitude });
    });
  }, []);

  //filter results based on rating
  useEffect(() => {
    const filtered = places.filter((place) => Number(place.rating) > rating);

    setFilteredPlaces(filtered);
  }, [rating]);

  //fetch data based on user geolocation
  useEffect(() => {
    if(bounds) {
      setIsLoading(true);

      //fetch weather data based on user geolocation
      getWeatherData(coords.lat, coords.lng)
        .then((data) => setWeatherData(data));

      //fetch places data based on user geolocation
      getPlacesData(type, bounds.sw, bounds.ne)
      .then(data => {
          setPlaces(data.filter((place) => place.name && place.num_reviews > 0));
          setIsLoading(false);
          setFilteredPlaces([]);
      })
    }
  }, [bounds, type]);

  //
  const onLoad = (autoC) => setAutocomplete(autoC);

  //find lat and lng of new location
  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setCoords({ lat, lng });
  };

  return (
    <>
      <CssBaseline />
      <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad} />

      <Grid container spacing={3} style={{ width: '100%' }}>
          <Grid item xs={12} md={4}>
            <List 
              places={filteredPlaces.length ? filteredPlaces : places} 
              childClicked={childClicked} 
              isLoading={isLoading}
              type={type}
              setType={setType}
              rating={rating}
              setRating={setRating}
            />
          </Grid>
          <Grid item xs={12} md={8}>
              <Map 
                setCoords={setCoords}
                setBounds={setBounds}
                coords={coords}
                places={filteredPlaces.length ? filteredPlaces : places}
                setChildClicked={setChildClicked}
                weatherData={weatherData}
              />
          </Grid>
      </Grid>
    </>
  );
}

export default App;
