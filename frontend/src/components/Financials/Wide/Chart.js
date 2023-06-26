import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function Chart() {
  const data = [
    {
      name: "January",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "February",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "March",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "April",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "May",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
  ];

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "end",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          padding: 25,
        }}
      ></div>

      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          padding: 25,
        }}
      >
        <h2
          style={{ fontSize: "1rem", fontWeight: "bold", marginRight: 6 }}
          className="font-weight-bold"
        >
          Views reporting
        </h2>
        <span className="views-date">March 10 - March 16</span>
      </div>
      <ResponsiveContainer style={{ padding: 20 }} width="90%" height="100%">
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
              fontWeight: "bold",
            }}
            dataKey="name"
            axisLine={false}
          />
          <Tooltip />
          <Area type="monotone" dataKey="pv" stroke="#5FBBFF" fill="#5FBBFF" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
