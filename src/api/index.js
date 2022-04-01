import axios from 'axios';

export const getPlacesData = async () => {
    
    try {
        const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary`, {
            
            //set the boundaries on map
            params: {
                bl_latitude: '11.847676', //bottom left lat
                tr_latitude: '12.838442', //top right lat
                bl_longitude: '109.095887', //bottom left long
                tr_longitude: '109.149359' //top right long
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