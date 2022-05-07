import { Button, Dropdown, Modal } from 'react-bootstrap';
import { BsFillAspectRatioFill, BsThreeDotsVertical, BsTrash } from 'react-icons/bs';
import { XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, LineChart, CartesianGrid, Legend, Line } from 'recharts';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector} from 'react-redux';
import { FormControl } from 'react-bootstrap';
import React from 'react';
import API from '../../../util/AxiosConfig';

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </a>
));

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = React.forwardRef(
  ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    const [value, setValue] = useState('');

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child) =>
              !value || child.props.children.toLowerCase().startsWith(value),
          )}
        </ul>
      </div>
    );
  },
);


export default function ChartWide({metric,data,deleteChart}) {
  const newData = data.rows.slice(-3);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const user = useSelector(state => state.authentication.user);
  const { type,id } = useParams()


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


const deleteMetric = async() => {  
await API.delete(`/financial/${data.id}`);
deleteChart(data.id);
}

function formatYAxis(value) {
  return abbreviateNumber(value);
}

const formatter = (value) => abbreviateNumber(value);


  return (
  <div style={{height:'100%',width:'100%', display:'flex', alignItems:'center', justifyContent:'end',flexDirection:'column'}}>
  <div style={{ width:'100%', display:'flex', padding:25, justifyContent:'space-between', alignItems:'center'}}>
  <h2 style={{fontSize:'1rem', fontWeight:'bold',marginRight:6}} className='font-weight-bold'>{metric}</h2>    
  
  <Modal size="xl" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Chart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div style={{width:'80%',height:'500px',margin:'0 auto'}}>
            <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={newData}
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
   </Modal>



  <Dropdown>
    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
      <BsThreeDotsVertical/>
    </Dropdown.Toggle>

    <Dropdown.Menu as={CustomMenu}>
      {user?.user_id == id ? (
      <Dropdown.Item onClick={() => deleteMetric()} eventKey="1"><BsTrash style={{display:'inline'}}/> Delete</Dropdown.Item>
      ): (
        null
      )}
      <Dropdown.Item onClick={handleShow} eventKey="2"><BsFillAspectRatioFill style={{display:'inline'}}/> Showcase</Dropdown.Item>
    </Dropdown.Menu>

  </Dropdown>
  </div>
<ResponsiveContainer style={{padding:20}} width="90%" height="100%">
  <AreaChart
    data={newData}
    margin={{
      top: 0,
      right: 0,
      left: 0,
      bottom: 30,
    }}
  >
    <YAxis dx={-5} axisLine={false} tickFormatter={formatYAxis}/>

    <XAxis
    dy={20}
    dx={-10}
    style={{
    fontWeight:'bold'
  }}
     dataKey='month' axisLine={false}/>
    <Tooltip />
    <Area type="monotone" dataKey="amount" stroke="#5FBBFF" fill="#5FBBFF" />
  </AreaChart>
</ResponsiveContainer>   
</div>    
  )
}
