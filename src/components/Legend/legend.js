import React from "react";
import { LegendQuantile, LegendItem, LegendLabel } from '@visx/legend';
import { scaleQuantize } from '@visx/scale';

function Legend (happyData){

    const scoreColour = scaleQuantize({
        domain: [
                Math.round(Math.min(...happyData.happyData.map((f) => f.Score))),
                Math.round(Math.max(...happyData.happyData.map((f) => f.Score))),
            ],
        range: ['#A0FF98', '#FFE68D', '#8EE4FF', '#99A9FF', '#FF9CCC',  '#FF9898'],
    })

    const styles = {
        legendItemContainer : {

        }
    }

    const labelRender = (index) => {
        if(index == 0){
            
        }

        switch (index) {
            case 0:
                return `${index + 1} - The Most Happy`
            case 1:
                return `${index + 1}`
            case 2:
                return `${index + 1}`
            case 3:
                return `${index  + 1}`
            case 4:
                return `${index  + 1}`
            case 5:
                return `${index + 1} -  The Least Happy`  
            default:
                break;
        }
    }

    return(
        <div 
            style={{
                flexDirection: 'column-reverse',
                width: '90%', 
                borderRadius: 4,
                padding: 10,
            }}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <LegendQuantile
                        scale={scoreColour}
                        labelMargin="0 20px 0 0"
                        shapeMargin="1px 0 0"
                        style={{flex: 1, display: 'flex', flexDirection: 'row'}}
                    >
                        {(labels)=> labels.map((label)=>{
                            //const size = sizeScale(label.datum) ?? 0;
                            const color = scoreColour(label.datum);
                            return(
                            <LegendItem style={styles.legendItemContainer} key={`legend-${label.text}-${label.index}`}>
                                <div style={{width: 30, height: 30, backgroundColor: color, borderRadius: 10}}/>
                            </LegendItem>
                            )
                        })}
                        
                    </LegendQuantile>
                </div>
                
                <div 
                    style={{
                        display: 'flex', flexDirection: 'row', justifyContent: 'space-between'
                    }}>
                    <h5 style={{color: '#fff'}}>Most Happy</h5>
                    <h5 style={{color: '#fff'}}>Least Happy</h5>
                </div>
        </div>
    )

}


export default Legend;