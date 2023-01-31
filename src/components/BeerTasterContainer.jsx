import { useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { GET_BEERS_URL, REMOVE_BEER_URL } from '../../services/beers';
import '../styles.css';
import BeerPanel from './BeerPanel';
import LoadingSpinner from './LoadingSpinner';

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

export const BeerTasterContainer = () => {
  const [selectedFilter, setSelectedFilter] = useState('name');
  const [textFilter, setTextFilter] = useState('');

  const { isLoading, data = [], refetch: refetchBeers } = useQuery(
    'beers', 
    () => fetch(
        GET_BEERS_URL
      ).then(res => res.json()),
  );

  // const removeBeerMutation = useMutation(
  //   'remove-beer', 
  //   (beerId) => fetch(
  //     [URL_HERE]
  //     { 
  //       method: 'PUT', 
  //       body: JSON.stringify({_id: beerId }) 
  //     }
  //   ).then(res => res.json()),
  //   {
  //     onSuccess: ()=> {
  //       refetchBeers();
  //     }
  //   }
  // );


  const byFilterSortFn = FILTER_COMPARE_MAP[selectedFilter];

  const sortedBeers = data?.sort(byFilterSortFn).filter((beerItem) => {
    const valueToCompare = beerItem[selectedFilter];

    if (typeof valueToCompare === 'string' && !!textFilter.length) {
      return valueToCompare.toLowerCase().indexOf(textFilter.toLowerCase()) > -1;
    }

    return true;
  });

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
                    <BeerPanel 
                      key={beer?._id} 
                      beer={beer} 
                      onRemove={() => {
                        // removeBeerMutation.mutate(beer?._id);
                      }}
                    />
                  );
                })
              }
              </div>
            </div>
          )
          : null
      }
      {
        isLoading || removeBeerMutation?.isLoading
          ? <LoadingSpinner/>
          : null
      }
    </div>
  );
};

export default BeerTasterContainer;
