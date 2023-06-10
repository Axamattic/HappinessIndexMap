import React from "react";
import { LegendQuantile, LegendItem, LegendLabel } from '@visx/legend';
import { scaleQuantize } from '@visx/scale';

function Legend (happyData){

    const scoreColour = scaleQuantize({
        domain: [
                Math.round(Math.min(...happyData.happyData.map((f) => f.Score))),
                Math.round(Math.max(...happyData.happyData.map((f) => f.Score))),
            ],
        range: ['#FFEBA6', '#ADFFA6', '#A6EAFF', '#A6B4FF', '#FFA6D1',  '#FFA6A6'],
    })

    const styles = {
        legendItemContainer : {
            display: 'flex', 
            flexDirection: 'row', 
            height: 50, 
            backgroundColor: '#CDD8EE', 
            marginBottom: 10, 
            borderRadius: 10,
            alignItems : 'center',
            padding: 10
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
                position: 'absolute',
                top: 150,
                backgroundColor: '#EFF6FF', 
                width: 240, 
                height: 470, 
                borderRadius: 10,
                marginLeft: 50,
                padding: 10
            }}>
                <LegendQuantile
                    scale={scoreColour}
                    direction="column-reverse"
                    itemDirection="row-reverse"
                    labelMargin="0 20px 0 0"
                    shapeMargin="1px 0 0"
                >
                    {(labels)=> labels.map((label)=>{
                        //const size = sizeScale(label.datum) ?? 0;
                        const color = scoreColour(label.datum);
                        return(
                           <LegendItem style={styles.legendItemContainer} key={`legend-${label.text}-${label.index}`}>
                               <div style={{width: 40, height: 40, backgroundColor: color, borderRadius: 10}}/>
                                <LegendLabel style={{fontSize: 14, marginLeft: 10, color: '#4270CF', fontFamily: "Inter-Bold"}}>
                                    {labelRender(label.index)}
                                </LegendLabel>
                           </LegendItem>
                        )
                    })}
                </LegendQuantile>
        </div>
    )

}


export default Legend;