import React from "react";
import { scaleQuantize, scaleOrdinal } from "@visx/scale";
import {Mercator, Graticule} from "@visx/geo";
import * as topojson from 'topojson-client';
import topology from '../../resource/earth-topo.json';
import CountryItem from '../CountryItem/CountryItem.js';

import { useCountryContext } from "../../context/countryContext";

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
}


function Map (happyData){

    const [localdata, setLocalData] = React.useState([]);
    const {width, height} = getWindowDimensions();
    const centerX = width / 2;
    const centerY = height / 2;
    const world = topojson.feature(topology, topology.objects.units)
    const scale = (width / 630) * 100;

    const countryContext = useCountryContext();


    return(
        <>

        <Mercator
        data={world.features}
        scale={scale}
        translate={[centerX, centerY + 50]}
        >
        {
            (mercator) => ( 
            <g>
                {/* <Graticule graticule={(g) => mercator.path(g) || ''} stroke="rgba(33,33,33,0.01)" /> */}
                {mercator.features.map(({ feature, path }, i) => (
                    
                    // <g> 
                    //     <path
                    //         key={`map-feature-${i}`}
                    //         d={path || ''}
                    //         fill={getCountryFill(getCountryByCode(feature.properties.name))}
                    //         strokeWidth={0.5}
                    //     />
                    // </g>

                    <CountryItem happyData={happyData.happyData} feature={feature} path={path} i={i}/>
                    
                ))}
            </g>
            )
        }
        </Mercator>

        </>
    )
}

export default React.memo(Map);