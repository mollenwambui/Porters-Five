import React, { useState } from 'react';
import '../components/Template.css';
import { useNavigate } from 'react-router-dom';
import 'typeface-nunito';
import UserJourney from './UserJourney';


const Template = () => {const [force1, setForce1] = useState([{ input: '', status: '' }]); // Updated initial state
const [force2, setForce2] = useState([{ input: '', status: '' }]); // Updated initial state
const [force3, setForce3] = useState([{ input: '', status: '' }]); // Updated initial state
const [force4, setForce4] = useState([{ input: '', status: '' }]); // Updated initial state
const [force5, setForce5] = useState([{ input: '', status: '' }]); // Updated initial state

    



  
  const [errorMessages, setErrorMessages] = useState({
    force1: [''], // Changed to an array to track errors for multiple inputs
    force2: [''],
    force3: [''],
    force4: [''],
    force5: ['']
  });
  const navigate = useNavigate ();
  const handleCheckResults = () => {
    // Count the number of negative, positive, and neutral statuses for each slide
    const countStatus = (force) => {
      let negativeCount = 0;
      let positiveCount = 0;
      let neutralCount = 0;
      force.forEach((inputObj) => {
        if (inputObj.status === "negative") {
          negativeCount++;
        } else if (inputObj.status === "positive") {
          positiveCount++;
        } else if (inputObj.status === "neutral") {
          neutralCount++;
        }
      });
      return { negativeCount, positiveCount, neutralCount };
    };
  
    // Calculate the counts for each slide
    const force1Counts = countStatus(force1);
    const force2Counts = countStatus(force2);
    const force3Counts = countStatus(force3);
    const force4Counts = countStatus(force4);
    const force5Counts = countStatus(force5);
  
    // Determine the color of the slide titles based on the counts
    const getSlideTitleColor = (counts) => {
      if (counts.positiveCount > counts.negativeCount) {
        return "green";
      } else if (counts.positiveCount < counts.negativeCount) {
        return "red";
      } else {
        return "neutral";
      }
    };
  
    const force1TitleColor = getSlideTitleColor(force1Counts);
    const force2TitleColor = getSlideTitleColor(force2Counts);
    const force3TitleColor = getSlideTitleColor(force3Counts);
    const force4TitleColor = getSlideTitleColor(force4Counts);
    const force5TitleColor = getSlideTitleColor(force5Counts);
  
    // Determine the color of the slide backgrounds based on the counts
    const getSlideBackgroundColor = (counts) => {
      if (counts.negativeCount > counts.positiveCount) {
        return "low";
      } else if (counts.negativeCount < counts.positiveCount) {
        return "high";
      } else {
        return "medium";
      }
    };
  
    const force1Status = getSlideBackgroundColor(force1Counts);
    const force2Status = getSlideBackgroundColor(force2Counts);
    const force3Status = getSlideBackgroundColor(force3Counts);
    const force4Status = getSlideBackgroundColor(force4Counts);
    const force5Status = getSlideBackgroundColor(force5Counts);
  
    const slideBackgroundColors = {
      force1: force1Status,
      force2: force2Status,
      force3: force3Status,
      force4: force4Status,
      force5: force5Status,
    };
  
    navigate("/results", {
      state: {
        force1,
        force2,
        force3,
        force4,
        force5,
        force1TitleColor,
        force2TitleColor,
        force3TitleColor,
        force4TitleColor,
        force5TitleColor,
        slideBackgroundColors, // Pass the slide background colors to the state
      },
    });
  };
  
  
  
  
  
  
  const [activeForce, setActiveForce] = useState(null);
  const handleForceClick = (force) => {
    setActiveForce((prevForce) => (prevForce === force ? null : force));
  };
  
  const [activeSlide, setActiveSlide] = useState(0);

  const handleNextSlide = () => {
    let errorMessage = '';
  
    if (activeSlide === 0) {
      if (force1.some((inputObj) => inputObj.input.trim() === '')) {
        errorMessage = 'Please fill in the threats of new entrants!';
        setErrorMessages((prevErrorMessages) => ({
          ...prevErrorMessages,
          force1: force1.map((inputObj) =>
            inputObj.input.trim() === '' ? errorMessage : ''
          ),
        }));
        return; // Return early if there are errors in Slide 1
      }
    } else if (activeSlide === 1) {
      if (force2.some((inputObj) => inputObj.input.trim() === '')) {
        errorMessage = 'Please fill in the powers!';
        setErrorMessages((prevErrorMessages) => ({
          ...prevErrorMessages,
          force2: force2.map((inputObj) =>
            inputObj.input.trim() === '' ? errorMessage : ''
          ),
        }));
        return; // Return early if there are errors in Slide 2
      }
    } else if (activeSlide === 2) {
      if (force3.some((inputObj) => inputObj.input.trim() === '')) {
        errorMessage = 'Please fill in the powers!';
        setErrorMessages((prevErrorMessages) => ({
          ...prevErrorMessages,
          force3: force3.map((inputObj) =>
            inputObj.input.trim() === '' ? errorMessage : ''
          ),
        }));
        return; // Return early if there are errors in Slide 3
      }
    } else if (activeSlide === 3) {
      if (force4.some((inputObj) => inputObj.input.trim() === '')) {
        errorMessage = 'Please fill in the threats!';
        setErrorMessages((prevErrorMessages) => ({
          ...prevErrorMessages,
          force4: force4.map((inputObj) =>
            inputObj.input.trim() === '' ? errorMessage : ''
          ),
        }));
        return; // Return early if there are errors in Slide 4
      }
    } else if (activeSlide === 4) {
      if (force5.some((inputObj) => inputObj.input.trim() === '')) {
        errorMessage = 'Please fill in all rivalries!';
        setErrorMessages((prevErrorMessages) => ({
          ...prevErrorMessages,
          force5: force5.map((inputObj) =>
            inputObj.input.trim() === '' ? errorMessage : ''
          ),
        }));
        return; // Return early if there are errors in Slide 5
      }
    }
  
    // If no errors, clear the error messages for the current slide
    setErrorMessages((prevErrorMessages) => ({
      ...prevErrorMessages,
      [`force${activeSlide + 1}`]: force1.map(() => ''), // Clear error messages for the current slide
    }));
  
    setActiveSlide((prevSlide) => prevSlide + 1);
  };
  
  const handlePreviousSlide = () => {
    setActiveSlide(prevSlide => prevSlide - 1);
  };
  
  
  const handleAddInput = (forceIndex) => {
    if (forceIndex === 0) {
      setForce1((prevForce1) => [...prevForce1, { input: '', status: '' }]);
      setErrorMessages((prevErrorMessages) => ({
        ...prevErrorMessages,
        force1: [...prevErrorMessages.force1, ''],
      }));
    } else if (forceIndex === 1) {
      setForce2((prevForce2) => [...prevForce2, { input: '', status: '' }]);
      setErrorMessages((prevErrorMessages) => ({
        ...prevErrorMessages,
        force2: [...prevErrorMessages.force2, ''],
      }));
    } else if (forceIndex === 2) {
      setForce3((prevForce3) => [...prevForce3, { input: '', status: '' }]);
      setErrorMessages((prevErrorMessages) => ({
        ...prevErrorMessages,
        force3: [...prevErrorMessages.force3, ''],
      }));
    } else if (forceIndex === 3) {
      setForce4((prevForce4) => [...prevForce4, { input: '', status: '' }]);
      setErrorMessages((prevErrorMessages) => ({
        ...prevErrorMessages,
        force4: [...prevErrorMessages.force4, ''],
      }));
    } else if (forceIndex === 4) {
      setForce5((prevForce5) => [...prevForce5, { input: '', status: '' }]);
      setErrorMessages((prevErrorMessages) => ({
        ...prevErrorMessages,
        force5: [...prevErrorMessages.force5, ''],
      }));
    }
  };
  
  const handleRemoveInput = (forceIndex, inputIndex) => {
    if (forceIndex === 0) {
      setForce1((prevForce1) =>
        prevForce1.filter((_, index) => index !== inputIndex)
      );
      setErrorMessages((prevErrorMessages) => ({
        ...prevErrorMessages,
        force1: prevErrorMessages.force1.filter(
          (_, index) => index !== inputIndex
        ),
      }));
    } else if (forceIndex === 1) {
      setForce2((prevForce2) =>
        prevForce2.filter((_, index) => index !== inputIndex)
      );
      setErrorMessages((prevErrorMessages) => ({
        ...prevErrorMessages,
        force2: prevErrorMessages.force2.filter(
          (_, index) => index !== inputIndex
        ),
      }));
    } else if (forceIndex === 2) {
      setForce3((prevForce3) =>
        prevForce3.filter((_, index) => index !== inputIndex)
      );
      setErrorMessages((prevErrorMessages) => ({
        ...prevErrorMessages,
        force3: prevErrorMessages.force3.filter(
          (_, index) => index !== inputIndex
        ),
      }));
    } else if (forceIndex === 3) {
      setForce4((prevForce4) =>
        prevForce4.filter((_, index) => index !== inputIndex)
      );
      setErrorMessages((prevErrorMessages) => ({
        ...prevErrorMessages,
        force4: prevErrorMessages.force4.filter(
          (_, index) => index !== inputIndex
        ),
      }));
    } else if (forceIndex === 4) {
      setForce5((prevForce5) =>
        prevForce5.filter((_, index) => index !== inputIndex)
      );
      setErrorMessages((prevErrorMessages) => ({
        ...prevErrorMessages,
        force5: prevErrorMessages.force5.filter(
          (_, index) => index !== inputIndex
        ),
      }));
    }
  };
  

  return (
    <div className="user-guide" style={{ fontFamily: 'Nunito' }}>
 {activeSlide === 0 && (
  <div>
    <div className="slide-container1">
      <div className="slide-content">
      <h3 className ='force1'>
  Threats of new entrants
</h3>
        
        <p className="threats">Please fill in your threats of new entrants</p>
        {force1.map((inputObj, index) => (
          <div key={index} className="input-container">
<input
  className={`input ${errorMessages.force1[index] ? 'error' : ''}`}
  type="text"
  placeholder={index === 0 ? 'Example : Price competition' : index === 1 ? 'Example :Economies of scale' : ''}
  value={inputObj.input}
  onChange={(e) => {
    const { value } = e.target;
    setForce1((prevForce1) => {
      const newForce1 = [...prevForce1];
      newForce1[index] = { ...newForce1[index], input: value };
      return newForce1;
    });
  }}
/>



<div className="status-dropdown">
  <label htmlFor={`status${index}`}>Status:</label>
  <select
    id={`status${index}`}
    value={inputObj.status}
    onChange={(e) => {
      const newForce1 = [...force1];
      newForce1[index].status = e.target.value;
      setForce1(newForce1);
    }}
  >
    <option value="" disabled>
      Select your status
    </option>
    <option value="positive" disabled={inputObj.status === "positive"}>
      <span className="option-icon green-icon positive">+</span>
      Positive
    </option>
    <option value="neutral" disabled={inputObj.status === "neutral"}>
      <span className="option-icon grey-icon">&#9679;</span>
      Neutral
    </option>
    <option value="negative" disabled={inputObj.status === "negative"}>
      <span className="option-icon red-icon">&#10006;</span>
      Negative
    </option>
  </select>
</div>

{errorMessages.force1[index] && (
              <p className="error-message">{errorMessages.force1[index]}</p>
    )}
    {index === force1.length - 1 && (
      <div className="icon-container">
        <button className="add" onClick={() => handleAddInput(0)}>
          +
        </button>
        {force1.length > 1 && (
          <button
            className="minus"
            onClick={() => handleRemoveInput(0, index)}
          >
            -
          </button>
        )}
      </div>
    )}
  </div>
))}


        <div className="button-container">
          <button className="next-button1" onClick={handleNextSlide}>
            Next
          </button>
        </div>
      </div>
    </div>

    <div className="force-button-container">
      <button
        className={`force-button force1-button ${activeForce === 'Force1' ? 'active' : ''}`}
        onClick={() => handleForceClick('Force1')}
      >
        Threats of new entrants
      </button>
      {activeForce === 'Force1' && (
        <div className="force-content-container">
          <p>
            The threat of new entrants assesses the possibility of new competitors entering a market,<br/> which can increase competition and impact the market share <br/>and profitability of existing firms.
          </p>
        </div>
      )}
    </div>
  </div>
)}

{activeSlide === 1 && (
  <div>
    <div className="slide-container2">
      <div className="slide-content">
      <h3 className ='force2'>Bargaining power of customers</h3>
       
        <p className="power">Please fill in bargaining power of customers:</p>
     {force2.map((input, index) => (
  <div key={index} className="input-container">
    <input
      className={`input ${errorMessages.force2[index] ? 'error' : ''}`}
      type="text"
      value={input.input}
      placeholder={index === 0 ? 'Example: Price sensitivity' : index === 1 ? 'Example: Buyers market' : ''}

      onChange={(e) => {
        const newForce2 = [...force2];
        newForce2[index] = { ...newForce2[index], input: e.target.value };
        setForce2(newForce2);
        setErrorMessages((prevErrorMessages) => {
          const newErrorMessages = [...prevErrorMessages.force2];
          newErrorMessages[index] = '';
          return {
            ...prevErrorMessages,
            force2: newErrorMessages,
          };
        });
      }}
    />
   <div className="status-dropdown">
  <label htmlFor={`status${index}`}>Status:</label>
  <select
    id={`status${index}`}
    value={input.status}
    onChange={(e) => {
      const newForce2 = [...force2];
      newForce2[index] = { ...newForce2[index], status: e.target.value };
      setForce2(newForce2);
    }}
  >
    <option value="" disabled>
      Choose your status
    </option>
    <option value="positive">
      <span className="option-icon green-icon positive">+</span>
      Positive
    </option>
    <option value="neutral">
      <span className="option-icon grey-icon">&#9679;</span>
      Neutral
    </option>
    <option value="negative">
      <span className="option-icon red-icon">&#10006;</span>
      Negative
    </option>
  </select>
</div>
{errorMessages.force2[index] && (
  <p className="error-message">{errorMessages.force2[index]}</p>
)}
{index === force2.length - 1 && (
  <div className="icon-container">
    <button className="add" onClick={() => handleAddInput(1)}>
      +
    </button>
    {force2.length > 1 && (
      <button
        className="minus"
        onClick={() => handleRemoveInput(1, index)}
      >
        -
      </button>
    )}
  </div>

    )}
  </div>
))}

        <div className="button-container">
          <button className="previous-button" onClick={handlePreviousSlide}>
            Previous
          </button>
          <button className="next-button" onClick={handleNextSlide}>
            Next
          </button>
        </div>
      </div>
    </div>

    <div className="force-button-container">
      <button
        className={`force-button force2-button ${
          activeForce === 'Force2' ? 'active' : ''
        }`}
        onClick={() => handleForceClick('Force2')}
      >
        Bargaining power of customers
      </button>
      {activeForce === 'Force2' && (
        <div className="force-content-container">
          <p>
            The bargaining power of buyers refers to the ability of customers<br/>
            to influence prices, negotiate terms, and seek alternatives,<br/>
            impacting the profitability and decision-making power of suppliers.
          </p>
        </div>
      )}
    </div>
  </div>
)}

{activeSlide === 2 && (
  <div>
    <div className="slide-container3">
      <div className="slide-content">
      <h3 className ='force3'>Bargaining power of suppliers</h3>

        <p className="power">Please fill in bargaining power of suppliers:</p>
        {force3.map((input, index) => (
          <div key={index} className="input-container">
            <input
  className={`input ${errorMessages.force3[index] ? 'error' : ''}`}
  type="text"
  placeholder={index === 0 ? 'Example: Uniqueness of products or services' : index === 1 ? 'Example: Supplier concentration' : ''}
  value={input.input}
  onChange={(e) => {
    const newForce3 = [...force3];
    newForce3[index] = { ...newForce3[index], input: e.target.value };
    setForce3(newForce3);
    setErrorMessages((prevErrorMessages) => {
      const newErrorMessages = [...prevErrorMessages.force3];
      newErrorMessages[index] = '';
      return {
        ...prevErrorMessages,
        force3: newErrorMessages,
      };
    });
  }}
/>

            <div className="status-dropdown">
  <label htmlFor={`status-${index}`}>Status:</label>
  <select
    id={`status-${index}`}
    value={input.status}
    onChange={(e) => {
      const newForce3 = [...force3];
      newForce3[index] = { ...newForce3[index], status: e.target.value };
      setForce3(newForce3);
    }}
  >
    <option value="" disabled>
      Choose your status
    </option>
    <option value="positive">
      <span className="option-icon green-icon positive">+</span>
      Positive
    </option>
    <option value="neutral">
      <span className="option-icon grey-icon">&#9679;</span>
      Neutral
    </option>
    <option value="negative">
      <span className="option-icon red-icon">&#10006;</span>
      Negative
    </option>
  </select>
</div>

            {errorMessages.force3[index] && (
              <p className="error-message">{errorMessages.force3[index]}</p>
            )}
            {index === force3.length - 1 && (
              <div className="icon-container">
                <button className="add" onClick={() => handleAddInput(2)}>
                  +
                </button>
                {force3.length > 1 && (
                  <button
                    className="minus"
                    onClick={() => handleRemoveInput(2, index)}
                  >
                    -
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
        <div className="button-container">
          <button className="previous-button" onClick={handlePreviousSlide}>
            Previous
          </button>
          <button className="next-button" onClick={handleNextSlide}>
            Next
          </button>
        </div>
      </div>
    </div>

    <div className="force-button-container">
      <button
        className={`force-button force3-button ${
          activeForce === 'Force3' ? 'active' : ''
        }`}
        onClick={() => handleForceClick('Force3')}
      >
        Bargaining power of suppliers
      </button>
      {activeForce === 'Force3' && (
        <div className="force-content-container">
          <p>
            The bargaining power of suppliers refers to the ability of suppliers<br/>
            to control prices, quality, or supply terms, potentially affecting<br/>
            the profitability and competitiveness of buyers.
          </p>
        </div>
      )}
    </div>
  </div>
)}



{activeSlide === 3 && (
  <div>
    <div className="slide-container4">
      <div className="slide-content">
      <h3 className ='force4'>Threat of substitution</h3>

        <p className="threat">Please fill in threat of substitution:</p>
        {force4.map((input, index) => (
          <div key={index} className="input-container">
            <input
              className={`input ${errorMessages.force4[index] ? 'error' : ''}`}
              type="text"
              value={input.input}
              placeholder={index === 0 ? 'Example:Digitalization ' : index === 1 ? 'Example: Teleconferencing' : ''}

              onChange={(e) => {
                const newForce4 = [...force4];
                newForce4[index] = { ...newForce4[index], input: e.target.value };
                setForce4(newForce4);
                setErrorMessages((prevErrorMessages) => {
                  const newErrorMessages = [...prevErrorMessages.force4];
                  newErrorMessages[index] = '';
                  return {
                    ...prevErrorMessages,
                    force4: newErrorMessages,
                  };
                });
              }}
            />
           <div className="status-dropdown">
  <label htmlFor={`status-${index}`}>Status:</label>
  <select
    id={`status-${index}`}
    value={input.status}
    onChange={(e) => {
      const newForce4 = [...force4];
      newForce4[index] = { ...newForce4[index], status: e.target.value };
      setForce4(newForce4);
    }}
  >
    <option value="" disabled>
      Choose your status
    </option>
    <option value="positive">
      <span className="option-icon green-icon positive">+</span>
      Positive
    </option>
    <option value="neutral">
      <span className="option-icon grey-icon">&#9679;</span>
      Neutral
    </option>
    <option value="negative">
      <span className="option-icon red-icon">&#10006;</span>
      Negative
    </option>
  </select>
</div>

            {errorMessages.force4[index] && (
              <p className="error-message">{errorMessages.force4[index]}</p>
            )}
            {index === force4.length - 1 && (
              <div className="icon-container">
                <button className="add" onClick={() => handleAddInput(3)}>
                  +
                </button>
                {force4.length > 1 && (
                  <button
                    className="minus"
                    onClick={() => handleRemoveInput(3, index)}
                  >
                    -
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
        <div className="button-container">
          <button className="previous-button" onClick={handlePreviousSlide}>
            Previous
          </button>
          <button className="next-button" onClick={handleNextSlide}>
            Next
          </button>
        </div>
      </div>
    </div>

    <div className="force-button-container">
      <button
        className={`force-button force4-button ${
          activeForce === 'Force4' ? 'active' : ''
        }`}
        onClick={() => handleForceClick('Force4')}
      >
        Threat of substitution
      </button>
      {activeForce === 'Force4' && (
        <div className="force-content-container">
          <p>
            The threat of substitute products or services refers to the possibility of customers switching to alternative offerings that fulfill similar needs, posing a potential challenge to the market share and profitability of existing products or services.
          </p>
        </div>
      )}
    </div>
  </div>
)}

{activeSlide === 4 && (
  <div>
    <div className="slide-container5">
      <div className="slide-content">
        <h3 className ='force5'>Rivalry among competitors</h3>
      
        <p className="rivalry">Please fill in rivalry among competitors:</p>
        {force5.map((input, index) => (
          <div key={index} className="input-container">
            <div className="status-dropdown5">
              <label htmlFor={`status-${index}`}>
                Status:
              </label>
              <select
                id={`status-${index}`}
                value={input.status}
                onChange={(e) => {
                  const newForce5 = [...force5];
                  newForce5[index] = { ...newForce5[index], status: e.target.value };
                  setForce5(newForce5);
                }}
              >
                <option value="" disabled>
                  Choose your status
                </option>
                <option value="positive">
                  <span className="option-icon green-icon positive">+</span>
                  Positive
                </option>
                <option value="neutral">
                  <span className="option-icon grey-icon">&#9679;</span>
                  Neutral
                </option>
                <option value="negative">
                  <span className="option-icon red-icon">&#10006;</span>
                  Negative
                </option>
              </select>
            </div>
            <input
              className={`input ${errorMessages.force5[index] ? 'error' : ''}`}
              type="text"
              value={input.input}
              placeholder={index === 0 ? 'Example:Price competition' : index === 1 ? 'Example: Advertising and promotional campaigns' : ''}

              onChange={(e) => {
                const newForce5 = [...force5];
                newForce5[index] = { ...newForce5[index], input: e.target.value };
                setForce5(newForce5);
                setErrorMessages((prevErrorMessages) => {
                  const newErrorMessages = [...prevErrorMessages.force5];
                  newErrorMessages[index] = '';
                  return {
                    ...prevErrorMessages,
                    force5: newErrorMessages,
                  };
                });
              }}
            />
            {errorMessages.force5[index] && (
              <p className="error-message">{errorMessages.force5[index]}</p>
            )}
            {index === force5.length - 1 && (
              <div className="icon-container">
                <button className="add" onClick={() => handleAddInput(4)}>
                  +
                </button>
                {force5.length > 1 && (
                  <button
                    className="minus"
                    onClick={() => handleRemoveInput(4, index)}
                  >
                    -
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
        <div className="button-container">
          <button className="previous-button" onClick={handlePreviousSlide}>
            Previous
          </button>
          <button className="next-button" onClick={handleCheckResults}>
            Results
          </button>
        </div>
      </div>
    </div>

    <div className="force-button-container">
      <button
        className={`force-button force5-button ${
          activeForce === 'Force5' ? 'active' : ''
        }`}
        onClick={() => handleForceClick('Force5')}
      >
        Rivalry among competitors
      </button>
      {activeForce === 'Force5' && (
        <div className="force-content-container">
          <p>
            Industry rivalry examines the intensity of competition among existing firms in a market, which can impact pricing, market share, and profitability.
          </p>
        </div>
      )}
    </div>
  </div>
)}


      <UserJourney activeSlide={activeSlide} />
      </div>
      
    );
  };
  
  export default Template;
  