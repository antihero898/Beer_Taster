import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import path from 'path';

import axios from 'axios';

const isEmptyObject = (obj) => !!Object.keys(obj).length

const UNTAPPD_SEARCH_URL = 'https://untappd.com/search';

const toConfig = (name) => ({ headers: { q: name, type: 'beer', sort: 'all' } });

const buildLowDBInstance = async () => {
    const publicFolder = path.resolve('public');
    const dbFile = path.resolve(publicFolder, 'beers.json');
    console.log('URL:', dbFile);
    const db = new Low(new JSONFile(dbFile));
    await db.read();
    
    console.log('data:', db.data);
    // return db;
};

const getBeerMap = () => {

};

const getUntappdBeerData = async (name) => {
    const beerData = await axios
        .get(UNTAPPD_SEARCH_URL, toConfig(name))
        .then((responseData) => {
            // 3. using the first search result, write to lowdb in some manner?
        })
        .catch((errorReason) => {
            console.error('Unable to retrieve search data due to the following reason:', errorReason);
        });

    return beerData;
};

const generateBeerData = () => {
    const db = buildLowDBInstance();

    // const beers = db.get('beers').value();
    // console.log(beers);

    // const hasIncompleteData = Object.values(beerMap).some(isEmptyObject);
    // console.log('Has incomplete data:', hasIncompleteData);

    // if we don't have a full set of data,
    // begin to fill json with scraped beer data
    // if (!hasIncompleteData) {
    //     // 1. iterate each name in the beerList via that 
    //     // does not have an object associated with it
    //     const generatedBeerData = Object
    //         .entries(beerMap)
    //         .filter(([, beerData]) => isEmptyObject(beerData))
    //         .reduce((updatedBeerMap, [beerName, beerData]) => {
    //             // 2. for each name, use axios to hit untappd search and grab response html
    //             const beerData = getUntappdBeerData(beerName);

    //             return {
    //                 ...updatedBeerMap,
    //                 [beerName]: beerData
    //             };
    //         }, {});
        
    //     const updatedBeerMap = {
    //         ...beerMap,
    //         ...generatedBeerData
    //     };

    //     // 4. once done iterating, use a complete set of data with lowb and write to the db
    // }
};

generateBeerData();