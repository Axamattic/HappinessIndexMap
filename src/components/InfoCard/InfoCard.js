import React from "react"; 
import { Text } from "@visx/text";
import { useCountryContext } from "../../context/countryContext";
import './index.css';

function InfoCard ({mousePos, width, height}) {

    const countryContext = useCountryContext();

    const calculateYPos = (y) => {
        // if mouse Y pos is greater than height/2
        // will minus the info card from value

        if(y > height/2){
            return y - 430
        }else{
            return y
        }
    }


    const styles = {
        container: {
            position:'absolute',
            top: calculateYPos(mousePos.y), 
            left: mousePos.x + 10,
            width: 300,
            height: 380,
            backgroundColor: '#E1ECFC',
            borderRadius: 20,
            padding: 15

        },
        header:{
            fontSize: 20,
            color: '#4E7CF6'
        },
        subtitle:{
            fontSize: 16,
            fontWeight: 600,
            color: '#4C72C8',
        },
        dataPointContainer: {
            margin: 0,
            padding: 0
        },
        dataPoint:{
            fontSize: 16,
            color: '#4C72C8',
            fontWeight: 500,
        },
        score:{
            display: 'flex',
            width: 40,
            height: 40,
            backgroundColor: countryContext.countryColour,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100
        }
    }

   
    return(
         <div className="infoCardContainer" style={styles.container}>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <h2 style={styles.header}>{countryContext.country.properties.name}</h2>
                <div style={styles.score}>
                    <h5 style={{fontSize: 14}}>{countryContext.currentDataPoint ? Number(countryContext.currentDataPoint.Score).toFixed(2) : 'N/A'}</h5>
                </div>
            </div>

                <div style={styles.dataPointContainer}>
                    <h3 style={styles.subtitle}>GDP per capita</h3>
                    <h4 style={styles.dataPoint}>{ countryContext.currentDataPoint ? countryContext.currentDataPoint['GDP per capita'] : 'No available data'}</h4>
                </div>
                <div style={styles.dataPointContainer}>
                    <h3 style={styles.subtitle}>Freedom to make life choices</h3>
                    <h4 style={styles.dataPoint}>{ countryContext.currentDataPoint ? countryContext.currentDataPoint['Freedom to make life choices'] : 'No available data'}</h4>
                </div>
                <div style={styles.dataPointContainer}>
                    <h3 style={styles.subtitle}>Healthy life expectancy </h3>
                    <h4 style={styles.dataPoint}>{ countryContext.currentDataPoint ? countryContext.currentDataPoint['Healthy life expectancy'] : 'No available data'}</h4>
                </div>
                <div style={styles.dataPointContainer}>
                    <h3 style={styles.subtitle}>Social support</h3>
                    <h4 style={styles.dataPoint}>{countryContext.currentDataPoint ? countryContext.currentDataPoint['Social support'] : 'No available data'}</h4>
                </div>
            </div>
    )

    

}



export default InfoCard;