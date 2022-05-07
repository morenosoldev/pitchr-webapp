import React, {useState} from 'react'
import { ResponsiveContainer,AreaChart,LineChart,CartesianGrid,Area,YAxis,XAxis,Tooltip,Legend,Line } from 'recharts';
import { BsCurrencyDollar } from 'react-icons/bs';
import { Button,Modal } from 'react-bootstrap';

export default function MRR({data}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    let SI_SYMBOL = ["", "k", "M", "B", "T", "P", "E"];
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


const formatter = (value) => abbreviateNumber(value);

  return (
<>
<Modal
        show={show}
        fullscreen={true}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
            <div style={{width:'80%',height:'500px',margin:'0 auto'}}>
            <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data.rows}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis dataKey="amount" tickFormatter={formatter}/>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="amount" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

   <div onClick={handleShow} className='chart-pitch'>
    <div style={{display:'flex'}}>
     <span className='chart-title'>
      {data.name}
    </span>  
    </div>
    <ResponsiveContainer style={{padding:0}} height='100%' width='100%'>
     <AreaChart
width={150}
height={175}
margin={{ top: 0, right: -0, left: -0, bottom: 25  }}
data={data.rows}
>

<Area type="monotone" dataKey="amount" stroke="#FFFFFF" fill="#E5E5E5" />
</AreaChart> 
  </ResponsiveContainer> 

<div className="chart-value"> 
<div style={{display:'flex',alignItems:'center', justifyContent:'end'}}>
<p>
{abbreviateNumber(data.rows[data.rows.length - 1].amount)}
</p>
</div>        
</div>
   
  </div>
</> 
  )
}
