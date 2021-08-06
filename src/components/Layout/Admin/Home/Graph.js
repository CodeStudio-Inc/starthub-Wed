import React from 'react'
import { Line } from 'react-chartjs-2'

const Graph = ({graph,object_key}) => {
    return(
        <div style={{width:'100%'}}>
             {graph.datasets[0].data[0] === undefined ? null : <div className="revenue">
                <h3>{object_key && object_key.split('-').splice(1)}</h3>
                <Line
                    data={graph}
                    width={100}
                    height={30}
                />
            </div>}
        </div>
    )
}

export default Graph