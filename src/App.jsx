import { useEffect, useReducer, useState } from 'react'
import beerJSONData from './assets/beers.json';

import './styles.css';

const toBeerComparatorFn = (propKey) => (beerA, beerB) => {
  const valueA = beerA[propKey];
  const valueB = beerB[propKey];
  if (valueA < valueB) {
    return -1;
  }
  if (valueA > valueB) {
      return 1;
  }
  return 0;
};

const FILTER_COMPARE_MAP = {
  brewery: toBeerComparatorFn('brewery'),
  name: toBeerComparatorFn('name'),
  alcohol: toBeerComparatorFn('alcohol'),
  style: toBeerComparatorFn('style')
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

const BeerPanelDescription = (props) => {
  const { value } = props;
  return (
    <div style={{justifySelf: 'flex-start', padding: '5px', display: 'flex', justifyContent: 'center'}}>
      <div>
        <span className="beer-panel-description">{value}</span>
      </div>
    </div>
  );
};


const BeerPanel = (props) => {
  const { beer } = props;
  const { name, brewery, breweryLogoURL, alcohol, style, description } = beer; 
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
          <BeerPanelLabel
            descriptor="Alcohol Content"
            value={`${alcohol}%`}
          />
          <BeerPanelLabel
            descriptor="Style"
            value={style}
          />
          <BeerPanelDescription
            value={description}
          />
        </div>
      </div>
    </div>
  );
};

function App() {
  const [beerList, setBeerList] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('name');
  const [textFilter, setTextFilter] = useState('');

  const byFilterSortFn = FILTER_COMPARE_MAP[selectedFilter];

  useEffect(() => {
    if (!beerList.length) {
      const initializedBeerList = beerJSONData?.beers;
      setBeerList(initializedBeerList);
    }
  }, [beerList]);

  const sortedBeers = beerList.sort(byFilterSortFn).filter((beerItem) => {
    const valueToCompare = beerItem[selectedFilter];

    console.log('LEL textFilter:', textFilter);
    if (typeof valueToCompare === 'string' && !!textFilter.length) {
      return valueToCompare.toLowerCase().indexOf(textFilter.toLowerCase()) > -1;
    }

    // TODO: filter by integer for alcohol %
    return true;
  });

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
          <div style={{margin: '25px'}}>
            <div>
              <span>Filter By Text (given selected filter):</span>
              <input onChange={({ target: { value } = {}} = {}) => setTextFilter(value)}></input>
            </div>
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
      {
        sortedBeers.length 
          ? (
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
          )
          : null
      }
    </div>
  )
}

export default App
