import React from "react";
import Map from './components/Map/map.js';
import { Zoom, applyMatrixToPoint } from "@visx/zoom";
import {ParentSize} from '@visx/responsive'
import { RectClipPath } from '@visx/clip-path';
import * as d3 from 'd3';
import Legend from "./components/Legend/legend.js";
import './App.css';
import InfoCard from "./components/InfoCard/InfoCard.js";
import { useCountryContext } from "./context/countryContext.js";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function App() {

  const {width, height} = getWindowDimensions();
  const [happyData, setHappyData] = React.useState([]);
  const [mousePos, setMousePos]  = React.useState(0);
  const countryContext = useCountryContext();

  const centerX = width / 2;
  const centerY = height / 2;
  const initialTransform = {
    scaleX: 2,
    scaleY: 2,
    translateX: -centerX ,
    translateY: -centerY + 400,
    skewX: 0,
    skewY: 0,
  };

  React.useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener(
        'mousemove',
        handleMouseMove
      );
    };
  }, []);


  React.useEffect(()=>{
    d3.csv(`${process.env.PUBLIC_URL}/data/2019.csv`)
          .then((res)=>{
              //console.log(res);
              const sorted = res.sort(function(x, y){
                return d3.ascending(x.Score, y.Score);
              });

              //console.log(sorted)

              setHappyData(sorted);
          }).catch((err)=>{
              console.log('error loading data', err);
          })
  },[]);

  function constrain(transformMatrix, prevTransformMatrix) {
    const min = applyMatrixToPoint(transformMatrix, { x: -200, y: -200 });
    const max = applyMatrixToPoint(transformMatrix, { x: width, y: height });
    if (max.x < width || max.y < height) {
      return prevTransformMatrix;
    }
    if (min.x > 0 || min.y > 0) {
      return prevTransformMatrix;
    }
    return transformMatrix;
 }
  

  return (
    <div className="App">

      <div className="VisHeader">
        <div>
          <h2 style={{fontFamily: "Inter-Bold", fontSize: 20, color: '#0082FF', textAlign: 'left'}}>How happy is the world?</h2>
          <p style={{fontFamily: "Inter-Regular", fontSize: 14, color: '#fff'}}>This visualisation maps the world happiness index by their overall score. It explores and identifies the impact of GDP, freedom of choice and social support on society.</p>
        </div>
        <div style={{backgroundColor: '#003262', width: '100%', height: 2, marginTop: 10, marginBottom: 10}}></div>
        <Legend happyData={happyData}/>
      </div>

      <div className="VisFooter">
        <img style={{width:'100%'}} src={require('./resource/logo.png')}/>
      </div>

      

      {
        countryContext.showInfoCard ?

        <InfoCard mousePos={mousePos} width={width} height={height}/>
        :
        null
      }
      
     


    {
      happyData == false 
      ? null 
      :
    <ParentSize>
      {(parent) => (
          <Zoom
          width={parent.width}
          height={parent.height}
          scaleXMin={parent.width/1100}
          scaleXMax={5}
          scaleYMin={parent.height/1100}
          scaleYMax={5}
          initialTransformMatrix={initialTransform}
          constrain={constrain}
          >

          {(zoom) => (
            <svg
              width={width}
              height={height}
              style={{ cursor: zoom.isDragging ? 'grabbing' : 'grab', touchAction: 'none' }}
              ref={zoom.containerRef}
            >
              {/* <RectClipPath id="zoom-clip" width={width} height={height} /> */}
              <g transform={zoom.toString()}>
                <Map happyData={happyData}/>
              </g>
                
            </svg>
          )}

          </Zoom>
      )}
    </ParentSize>
    }
    </div>
  )

}

export default React.memo(App);
