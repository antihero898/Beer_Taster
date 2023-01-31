import Cancel from '../assets/cancel.svg';
import '../styles.css';

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


export const BeerPanel = (props) => {
  const { beer, onRemove } = props;
  const { name, brewery, breweryLogoURL, alcohol, style, description } = beer; 
  return (
    <div className="beer-panel">
      <div style={{ position: 'relative'}}>
        <button style={{position: 'absolute', padding: '3px'}} onClick={onRemove}>
          <img width={40} height={30} src={Cancel}/>
        </button>
      </div>
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

export default BeerPanel;