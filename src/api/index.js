import axios from 'axios';

export const getPlacesData = async (type, sw, ne) => {
    
    try {
        const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
            
            //set the boundaries on map
            params: {
                bl_latitude: sw.lat, //bottom left lat
                tr_latitude: ne.lat, //top right lat
                bl_longitude: sw.lng, //bottom left long
                tr_longitude: ne.lng //top right long
            },
            headers: {
                'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
                'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY
            }
        });

        return data;
    }
    catch(error) {
        console.log(error)
    }
};

//fetch weather data
export const getWeatherData = async (lat, lng) => {
    try {
      if (lat && lng) {
        const { data } = await axios.get('https://community-open-weather-map.p.rapidapi.com/find', {
          params: { lat, lon: lng },
          headers: {
            'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
            'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY
          },
        });
  
        return data;
      }
    } catch (error) {
      console.log(error);
    }
};