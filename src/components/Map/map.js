import React from "react";
import { scaleQuantize, scaleOrdinal } from "@visx/scale";
import {Mercator, Graticule} from "@visx/geo";
import {geoCentroid} from 'd3';
import {Text} from '@visx/text'
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

    const textr = () => (
        <svg>
            <Text>ddddd</Text>
        </svg>
        
    )


    return(
        <>

        <Mercator
        data={world.features}
        scale={scale}
        translate={[centerX, centerY + 50]}
        centroid={()=> textr()}
        >
        {
            (mercator) => ( 
            <g>
                {/* <Graticule graticule={(g) => mercator.path(g) || ''} stroke="rgba(33,33,33,0.01)" /> */}
                {mercator.features.map(({ feature, path, projection }, i) => {
                    const cetroidCords = projection(geoCentroid(feature));
                    // <g> 
                    //     <path
                    //         key={`map-feature-${i}`}
                    //         d={path || ''}
                    //         fill={getCountryFill(getCountryByCode(feature.properties.name))}
                    //         strokeWidth={0.5}
                    //     />
                    // </g>

                    return(
                        <>
                            <CountryItem happyData={happyData.happyData} feature={feature} path={path} i={i} centroid={cetroidCords} width={width} height={height}/>
                           
                        </>
                    )                    
})}
            </g>
            )
        }
        </Mercator>

        </>
    )
}

export default React.memo(Map);