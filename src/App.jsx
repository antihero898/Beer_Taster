import { useEffect, useReducer, useState } from 'react'
import beerJSONData from './assets/beers.json';

import './styles.css';

const toBeerStringCompartorFn = (propKey) => (beerA, beerB) => {
  const stringA = beerA[propKey];
  const stringB = beerB[propKey];
  if (stringA < stringB) {
    return -1;
  }
  if (stringA > stringB) {
      return 1;
  }
  return 0;
};

const FILTER_COMPARE_MAP = {
  brewery: toBeerStringCompartorFn('brewery'),
  name: toBeerStringCompartorFn('name'),
  alcohol: (beerA, beerB) => {},
  style: (beerA, beerB) => {}
}

const FilterButton = (props) => {
  const {label, id, selectedFilter, onClick} = props;

  const isSelectedClassName = id === selectedFilter ? 'is-selected' : '';

  return (
    <button 
      onClick={() => onClick(id)} 
      className={`filter-button ${isSelectedClassName}`}
    >
      {label}
    </button>
  );
};

const isEmptyObject = (obj) => !Object.keys(obj).length

const BeerPanelLabel = (props) => {
  const { descriptor, value } = props;
  return (
    <div className="beer-panel-label-container">
      <span className="beer-panel-label-descriptor">{descriptor}:</span>
      <span>{value}</span>
    </div>
  );
};


const BeerPanel = (props) => {
  const { beer } = props;
  const { name, brewery, breweryLogoURL } = beer; 
  return (
    <div className="beer-panel">
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <BeerPanelLabel
            descriptor="Beer Name"
            value={name}
          />
          <BeerPanelLabel
            descriptor="Brewery"
            value={brewery}
          />
          <div className="brewery-logo-container">
            <div className="brewery-logo">
              <img className="brewery-logo-image" src={breweryLogoURL}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [beerList, setBeerList] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('name');

  const byFilterSortFn = FILTER_COMPARE_MAP[selectedFilter];

  useEffect(() => {
    if (!beerList.length) {
      const initializedBeerList = beerJSONData?.beers;
      setBeerList(initializedBeerList);
    }
  }, [beerList]);

  const sortedBeers = beerList.sort(byFilterSortFn);

  console.log('LEL sortedBeers:', sortedBeers);
  return (
    <div className="app">
      <div className="title-header-container">
        <div className="title-header-label">
          <span>Beer Taster</span>
        </div>
      </div>
      <div className="filter-outer-container">
        <div className="filter-container">
          <div className="filter-title-container">
            <span>
              Filter Options
            </span>
          </div>
          <div className="filter-button-container">
            <FilterButton 
              label="Sort by Brewery" 
              id="brewery" 
              selectedFilter={selectedFilter} 
              onClick={setSelectedFilter} 
            />
            <FilterButton 
              label="Sort by Name" 
              id="name" 
              selectedFilter={selectedFilter} 
              onClick={setSelectedFilter} 
            />
            <FilterButton 
              label="Sort by style" 
              id="style" 
              selectedFilter={selectedFilter} 
              onClick={setSelectedFilter} 
            />
            <FilterButton 
              label="Sort by Alcohol %" 
              id="alcohol" 
              selectedFilter={selectedFilter} 
              onClick={setSelectedFilter} 
            />
          </div>
        </div>
      </div>
      <div className="beer-panel-outer-container">
        <div className="beer-panel-list-container">
        {
          sortedBeers.map((beer) => {
            return (
              <BeerPanel key={beer?.id} beer={beer} />
            );
          })
        }
        </div>
      </div>
    </div>
  )
}

export default App
