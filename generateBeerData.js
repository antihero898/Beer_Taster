// import axios from 'axios';
import beerData from './src/assets/beers.json';

// const isEmptyObject = (obj) => !Object.keys(obj).length

// const UNTAPPD_SEARCH_URL = 'https://untappd.com/search';

// const CONFIG_DATA = {
//     "method": "GET",
//     "headers": {
//         "type": "beer",
//         "sort": "all",
//         "mode": "no-cors"
//       }
// };

// const toConfig = (name) => ({
//     ...CONFIG_DATA,
//     headers:{
//         ...CONFIG_DATA.headers,
//         q: name
//     }
// });

// TODO: eventually integrate express and scrape untappd's search page 
const getUntappdBeerData = async (name) => {
    // -------- axios -------
    // let untappdBeerData = await axios
    //     .get(UNTAPPD_SEARCH_URL, toConfig(name))
    //     .then((responseData) => {
    //         // 3. using the first search result, write to lowdb in some manner?
    //         // console.log('LEL responseData:', responseData.data);
    //         return responseData.data;
    //     })
    //     .catch((errorReason) => {
    //         console.error('Unable to retrieve search data due to the following reason:', errorReason);
    //     });
    
    // -------- fetch ------
    // let untappdBeerData = fetch(UNTAPPD_SEARCH_URL, CONFIG_DATA);

    // -------- express --------
    // let untappdBeerData = app.get(UNTAPPD_SEARCH_URL, (req, res, next) => {
    //     res.set({
    //         header: {
    //             'accept-control-allow-origin': '*',
    //         }
    //     });
    //     req.set({
    //         header: {
    //             q: name,
    //             type: 'beer',
    //             sort: 'all'
    //         }
    //     });
    //     // next();
    // });

    return untappdBeerData;
};

// TODO: eventually somehow integrate a db with this that would store scraped data
const generateBeerData = async () => {
    const beerMap = beerData.beers;

    // 1. iterate each name in the beerList via that 
    // does not have an object associated with it
    // const beerDataToUpdate = Object
    //     .entries(beerMap)
    //     .slice(0, 1)
    //     .filter(([, beerData]) => isEmptyObject(beerData));
    
    // if (!beerDataToUpdate.length) return;

    // let untappdResponseList = [];
    // for (let i = 0; i < beerDataToUpdate.length; i++) {
    //     const beerItem = beerDataToUpdate[i];
    //     const beerName = beerItem[0];

    //     const untappdBeerData = await getUntappdBeerData(beerName);
    //     untappdResponseList.push(untappdBeerData);
    // }
    
    
    // const updatedBeerMap = {
    //     ...beerMap,
    //     ...generatedBeerData
    // };

    // 4. once done iterating, use a complete set of data with lowb and write to the db

    return beerMap;
};

export default generateBeerData;