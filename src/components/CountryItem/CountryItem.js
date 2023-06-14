import React from "react";
import { scaleQuantize, scaleOrdinal } from "@visx/scale";
import { geoCentroid } from "d3";
import InfoCard from "../InfoCard/InfoCard";
import {Text} from '@visx/text'

import { useCountryContext } from "../../context/countryContext";

function CountryItem ({happyData, feature, path, i, centroid, width, height}){

    const [showCard, setShowCard] = React.useState(false);
    const countryContext = useCountryContext();

    const scoreColour = scaleQuantize({
        domain: [
                Math.min(...happyData.map((f) => f.Score)),
                Math.max(...happyData.map((f) => f.Score)),
            ],
        range: ['#A0FF98', '#FFE68D', '#8EE4FF', '#99A9FF', '#FF9CCC',  '#FF9898'],
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
    //const getCountry = document.select
    //const {x, y, width, height} = getBbox(path);
    const currentScore = getCountryByCode(feature.properties.name)

    return(
        <>
                <g>
                    <path
                        key={`map-feature-${i}`}
                        d={path || ''}
                        fill={getCountryFill(getCountryByCode(feature.properties.name))}
                        strokeWidth={0.5}
                        stroke={"#000"}
                        onMouseOver={()=> handleMouseOver()}
                        onMouseOut={()=> countryContext.setShowInfoCardFn(false)}
                    />
                    {/* <text
                        transform={`translate(${centroid})`}
                        textAnchor="middle"
                        fontSize={Math.max(width / 200, 0)}
                        fill="#0F52FF"
                    >
                    {currentScore ? Number(currentScore.Score).toFixed(2) : ' '}
                    </text> */}
                </g> 
        </>
    )

}

export default CountryItem;