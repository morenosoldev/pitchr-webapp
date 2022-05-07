import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

export default function MauWide() {
    const data = [
        {
          name: 'January',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'February',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'March',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'April',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'May',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
      ];


  return (
    <div style={{height:'100%',width:'100%', display:'flex', alignItems:'center', justifyContent:'end',flexDirection:'column'}}>
  <div style={{ width:'100%', display:'flex',flexDirection:'column', padding:25}}>
  <h2 style={{fontSize:'1rem', fontWeight:'bold',marginRight:6}} className='font-weight-bold'>MAU</h2>    
  <span className='views-date'>
      Monthly active users
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
    <Area type="monotone" dataKey="pv" stroke="#5FBBFF" fill="#5FBBFF" />
  </AreaChart>
</ResponsiveContainer>   
</div>    
  )
}
