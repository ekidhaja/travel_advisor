import axios from 'axios';

export const getPlacesData = async (sw, ne) => {
    
    try {
        const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary`, {
            
            //set the boundaries on map
            params: {
                bl_latitude: sw.lat, //bottom left lat
                tr_latitude: ne.lat, //top right lat
                bl_longitude: sw.lng, //bottom left long
                tr_longitude: ne.lng //top right long
            },
            headers: {
                'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
                'X-RapidAPI-Key': '78ad63a203mshe6dc839cfe9cfe2p123e23jsn90c710a66989'
            }
        });

        return data;
    }
    catch(error) {
        console.log(error)
    }
};