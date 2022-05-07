import React, { useEffect,useState } from 'react';
import { BsChevronDown } from 'react-icons/bs';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ViewsService from '../../../store/services/views.service';
import { useSelector } from 'react-redux';
import './style.css'

export default function Views () {
  const user = useSelector(state => state.authentication.user);
  const [data,setData] = useState([]);
  useEffect(() => {
    async function getViews(){
    const data = await ViewsService.getProfileViews(user.user_id)
    const views = data?.map(view => {
      return {...view, "count": view.count, "name": view.updatedAt.split(" ")[0]}
    });
    console.log(views);
  setData(views);
    }

  getViews();
  }, [])
  

    return (
    <div style={{height:'100%',width:'100%', display:'flex', alignItems:'center', justifyContent:'end',flexDirection:'column'}}>
          <div style={{display:'flex', justifyContent:'space-between', width:'100%', padding:25}}>
        <div className='chart-btns'>
            <a href='#' className='chart-btn chart-btn-active'>
                Views
            </a>
           
        </div>
            
        <div style={{display:'flex',alignItems:'center'}}>
            <span className='font-weight-light'>
                Weekly
            </span>
            <BsChevronDown className='font-weight-light' style={{marginLeft:5}}/>
        </div>
        </div>
     
        <div style={{ width:'100%', display:'flex', alignItems:'center', padding:25}}>
        <h2 style={{fontSize:'1rem', fontWeight:'bold',marginRight:6}} className='font-weight-bold'>Views reporting</h2>    
        <span className='views-date'>
            {data[0]?.updatedAt} - {data[data.length -1]?.updatedAt}
        </span>
        </div>
      <ResponsiveContainer style={{padding:20}} width="90%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 30,
          }}
        >
          <YAxis dx={-20} axisLine={false} />
          <XAxis
          dy={20}
           style={{
            fontWeight:'bold'
        }}
           dataKey='name' axisLine={false}/>
          <Tooltip />
          <Area type="monotone" dataKey="count" stroke="#5FBBFF" fill="#5FBBFF" />
        </AreaChart>
      </ResponsiveContainer>   
    </div>    
    );
  }
