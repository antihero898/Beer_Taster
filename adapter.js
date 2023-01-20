import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

export const db = () => {
    return new Low(new JSONFile('/Users/greghumiston/projects/Beer_Taster/public/beers.json'));
};

export default db;