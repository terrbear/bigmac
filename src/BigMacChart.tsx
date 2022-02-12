import Chart from "react-google-charts";
import BMIS from "./data/big-mac-index.json";
import { BigMacIndex } from "./types";
import * as DB from "./DB";

interface Props {
  state: DB.State;
}

const bmi = (s: DB.Salary): number => {
  const b = (BMIS as any)[s.year.toString()][
    s.currency
  ] as unknown as BigMacIndex;
  return s.salary / b.localPrice;
};

export default ({ state }: Props) => {
  const data: Array<[number, number]> = [];

  let salary: DB.Salary | undefined;
  for (const s of state.salaries) {
    if (salary) {
      for (let y = s.year + 1; y < s.year; y++) {
        data.push([y, bmi({ ...s, year: y })]);
      }
    }
    salary = s;

    data.push([s.year, bmi(s)]);
  }

  if (salary && salary.year < 2022) {
    for (let y = salary.year + 1; y <= 2022; y++) {
      data.push([y, bmi({ ...salary, year: y })]);
    }
  }

  if (data.length === 0) {
    return <div>Enter a salary to start plotting...</div>;
  }

  return (
    <Chart
      chartType="ComboChart"
      data={[["Year", "Big Macs"], ...data]}
      width="800px"
      height="600px"
      options={{ hAxis: { format: "" } }}
    />
  );
};
