import React from "react";
import { scaleQuantize, scaleOrdinal } from "@visx/scale";
import InfoCard from "../InfoCard/InfoCard";

import { useCountryContext } from "../../context/countryContext";

function CountryItem ({happyData, feature, path, i}){

    const [showCard, setShowCard] = React.useState(false);
    const countryContext = useCountryContext();

    const scoreColour = scaleQuantize({
        domain: [
                Math.min(...happyData.map((f) => f.Score)),
                Math.max(...happyData.map((f) => f.Score)),
            ],
        range: ['#FFEBA6', '#ADFFA6', '#A6EAFF', '#A6B4FF', '#FFA6D1',  '#FFA6A6'],
        reverse: true
    })

    const getCountryFill = (country) => {
        if (!country) {
            return "#eee";
          }
          //console.log('country', country, scoreColour(Number(country.Score))  );
          return scoreColour(Number(country.Score));
    }

    const getCountryByCode = (name) => {
        //console.log('name', happyData.happyData)
        return happyData.find((country) => country['Country or region'] === name);
    };

    React.useEffect(()=>{
      console.log('state changed')
    },[showCard])

    const handleMouseOver = () => {
        countryContext.setShowInfoCardFn(true);
        countryContext.setCountryFn(feature);
        countryContext.setCountryColourFn(getCountryFill(getCountryByCode(feature.properties.name)))
        countryContext.setCurrentDataPointFn(getCountryByCode(feature.properties.name));
    }


    return(
        <>
                <g>
                    <path
                        key={`map-feature-${i}`}
                        d={path || ''}
                        fill={getCountryFill(getCountryByCode(feature.properties.name))}
                        strokeWidth={0.5}
                        stroke="#4773C8"
                        onMouseOver={()=> handleMouseOver()}
                        onMouseOut={()=> countryContext.setShowInfoCardFn(false)}
                    />
                </g> 
        </>
    )

}

export default CountryItem;