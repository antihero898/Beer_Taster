
import LoadingSpinnerIcon from '../assets/loader.svg';
import '../styles.css';

export const LoadingSpinner = () => {
  return (
    <div className="loading-spinner-container">
      <img className="loading-spinner" src={LoadingSpinnerIcon} />
    </div>
  )
};

export default LoadingSpinner;