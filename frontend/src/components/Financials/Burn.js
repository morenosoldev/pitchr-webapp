import React from 'react'
import { ResponsiveContainer,AreaChart,Area } from 'recharts';
import { AiFillFire } from 'react-icons/ai';

export default function Burn({data}) {    
let SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];

function abbreviateNumber(number){
    // what tier? (determines SI symbol)
    var tier = Math.log10(Math.abs(number)) / 3 | 0;

    // if zero, we don't need a suffix
    if(tier == 0) return number;

    // get suffix and determine scale
    var suffix = SI_SYMBOL[tier];
    var scale = Math.pow(10, tier * 3);

    // scale the number
    var scaled = number / scale;

    // format number and add suffix
    return scaled.toFixed(1) + suffix;
}


  return (
    <div className='chart-pitch red'>
    <div style={{display:'flex'}}>
       <span className='chart-title'>
        BURN
      </span>  
      </div>
      <ResponsiveContainer height='100%' width='100%'>
<AreaChart
width={150}
height={150}
margin={{ top: 0, right: -15, left: -15, bottom: 25 }}
data={data}
>     
<Area type="monotone" dataKey="uv" stroke="#FFFFFF" fill="#E5E5E5" />
</AreaChart>

      </ResponsiveContainer>



<div className="chart-value">       
<div style={{display:'flex',alignItems:'center'}}>
<AiFillFire/>
<p>
{abbreviateNumber(data[data.length - 1].uv)}
</p>
</div>  

<div>
  <p className='pitch-undertitle'>
   Burn rate
  </p>
</div>
</div>
      
    </div>
  )
}
