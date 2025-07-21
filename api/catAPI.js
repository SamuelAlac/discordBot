require('dotenv').config({ path: '../.env' });
const  axios = require('axios');

const CAT_API_URL = 'https://api.thecatapi.com/v1/images/search';

const fetchCatData = async () =>{
    try{
    const res = await axios.get(CAT_API_URL, {
        headers: {
            'x-api-key': process.env.CAT_API_KEY
        }
    });

    const catURL = res.data[0]?.url
    return catURL;

    }catch(err){
        console.log(err)
    }
}

module.exports = fetchCatData;