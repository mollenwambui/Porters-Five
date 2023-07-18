import React from 'react';
import { useLocation } from 'react-router-dom';
import '../components/Results.css';
import Export from './Export';
import ReactDOM from 'react-dom';




const Results = () => {
  const location = useLocation();
  const state = location.state || {};
  state.status = Array.isArray(state.status) ? state.status : [];
  const handleExport = () => {
    const tempElement = document.createElement('div');
    ReactDOM.render(<Export state={state} />, tempElement);
  };
  
  
  
  const getStatusColorClass = (force, state) => {
    const forceTitleColor = state[`${force}TitleColor`];

    switch (forceTitleColor) {
      case 'green':
        return 'positive-color';
      case 'red':
        return 'negative-color';
      case 'neutral':
        return 'neutral-color';
      default:
        return '';
    }
  };

  const getSlideBackgroundColorClass = (force) => {
    const forceTitleColor = getStatusColorClass(force, state);

    switch (forceTitleColor) {
      case 'positive-color':
        return 'low-status-color';
      case 'negative-color':
        return 'high-status-color';
      case 'neutral-color':
        return 'medium-status-color';
      default:
        return '';
    }
  };

  return (
    <div style={{ fontFamily: 'Nunito' }}>
      <h1>Results</h1>

      <div className={`force-card1 ${getSlideBackgroundColorClass('force1')}`}>
        <h3 className={`status-heading1 ${getStatusColorClass('force1', state)}`}>
          Threats of New Entrants
        </h3>
        {state.force1 && state.force1.length > 0 ? (
          state.force1.map((force, index) => (
            <div className="card" key={index}>
              <p>&#8226; {force.input}</p>
            </div>
          ))
        ) : (
          <p className="no-data-message">No data available for Threats of New Entrants</p>
        )}
      </div>
      <div className="arrow arrow-down">&#8595;</div>

      <div className={`force-card2 ${getSlideBackgroundColorClass('force2')}`}>
        <h3 className={`status-heading2 ${getStatusColorClass('force2', state)}`}>
          Bargaining Power of Customers
        </h3>
        {state.force2 && state.force2.length > 0 ? (
          state.force2.map((force, index) => (
            <div className="card" key={index}>
              <p>&#8226; {force.input}</p>
            </div>
          ))
        ) : (
          <p className="no-data-message">No data available for Bargaining Power of Customers</p>
        )}
      </div>

      <div className={`force-card3 ${getSlideBackgroundColorClass('force3')}`}>
        <h3 className={`status-heading3 ${getStatusColorClass('force3', state)}`}>
          Bargaining Power of Suppliers
        </h3>
        {state.force3 && state.force3.length > 0 ? (
          state.force3.map((force, index) => (
            <div className="card" key={index}>
              <p>&#8226; {force.input}</p>
            </div>
          ))
        ) : (
          <p className="no-data-message">No data available for Bargaining Power of Suppliers</p>
        )}
      </div>
      <div className="arrow arrow-right">&#8594;</div>

      <div className="arrow arrow-left">&#8592;</div>

      <div className={`force-card4 ${getSlideBackgroundColorClass('force4')}`}>
        <h3 className={`status-heading4 ${getStatusColorClass('force4', state)}`}>
          Threat of Substitution
        </h3>
        {state.force4 && state.force4.length > 0 ? (
          state.force4.map((force, index) => (
            <div className="card" key={index}>
              <p>&#8226; {force.input}</p>
            </div>
          ))
        ) : (
          <p className="no-data-message">No data available for Threat of Substitution</p>
        )}
      </div>
      <div className="arrow arrow-up">&#8593;</div>

      <div className={`force-card5 ${getSlideBackgroundColorClass('force5')}`}>
        <h3 className={`status-heading5 ${getStatusColorClass('force5', state)}`}>
          Rivalry Among Competitors
        </h3>
        {state.force5 && state.force5.length > 0 ? (
          state.force5.map((force, index) => (
            <div className="card" key={index}>
              <p>&#8226; {force.input}</p>
            </div>
          ))
        ) : (
          <p className="no-data-message">No data available for Rivalry Among Competitors</p>
        )}
      </div>
      <button onClick={handleExport}>Export to PowerPoint</button>

    </div>
  );
};

export default Results;
