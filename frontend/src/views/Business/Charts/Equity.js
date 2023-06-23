import { useEffect, useState } from "react";
import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Cell } from "recharts";

export default function Equity({ data }) {
  const [equity, setEquity] = useState([]);

  useEffect(() => {
    let value = 0;
    const newData = data.map((item, index) => {
      value += Number(item.equity);

      const nameArr = item.name.split(" ");
      const name = nameArr[0];
      return { name: name, value: Number(item.equity) };
    });
    if (value < 99) {
      newData.push({ name: "Unknown", value: 100 - value });
    }

    setEquity(newData);
  }, [data]);

  let renderLabel = function (entry) {
    return entry.name;
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

  return (
    <>
      {equity.length > 0 ? (
        <ResponsiveContainer>
          <PieChart margin={{ top: 10, right: -15, left: -15, bottom: 0 }}>
            <Pie
              isAnimationActive={false}
              dataKey="value"
              data={equity}
              label={renderLabel}
            >
              {equity.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      ) : null}
    </>
  );
}
