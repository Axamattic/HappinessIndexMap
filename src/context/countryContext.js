import React, { useState } from "react";


export const CountryContext = React.createContext({
   showInfoCard: null,
   country: null,
   countryColour: null,
   currentDataPoint: null,
   setShowInfoCardFn: () => null,
   setCountryFn: () => null,
   setCountryColourFn: () => null,
   setCurrentDataPointFn: () => null,
});

export const CountryContextProvider = (props) => {

    const [showInfoCard, setShowInfoCard] = React.useState(false);
    const [country, setCountry] = React.useState(false);
    const [countryColour, setCountryColour] = React.useState(false);
    const [currentDataPoint, setCurrentDataPoint] = React.useState([]);

    const setShowInfoCardFn = (boo) => {
        setShowInfoCard(boo)
    }

    const setCountryFn = (arr) => {
        setCountry(arr);
    }

    const setCountryColourFn = (str) => {
        setCountryColour(str);
    }

    const setCurrentDataPointFn = (arr) => {
        setCurrentDataPoint(arr)
    }


  const value = {
    showInfoCard,
    setShowInfoCardFn,
    setCountryFn,
    country,
    countryColour,
    setCountryColourFn,
    setCurrentDataPointFn,
    currentDataPoint
  };

  return (
    <CountryContext.Provider value={value}>
      {props.children}
    </CountryContext.Provider>
  );
};

export const useCountryContext = () => React.useContext(CountryContext);