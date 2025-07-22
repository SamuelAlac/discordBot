require('dotenv').config({ path: '../.env' });
const axios = require('axios');

const location = 'Philippines';
// const weatherUrl = `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}q=${location}&aqi=no`

//gets the params which is key and q
const fetchWeatherData = async () =>{
    try{
    const res = await axios.get('http://api.weatherapi.com/v1/current.json', {
        params: {
            key: process.env.WEATHER_API_KEY,
            q: location,
        },
    });
    return res.data;

    }catch(err){
        console.log(err);
    }
};

module.exports = fetchWeatherData;