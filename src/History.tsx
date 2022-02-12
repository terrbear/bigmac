import { useState } from "react";
import * as DB from "./DB";

interface Props {
  state: DB.State;
  dispatch: React.Dispatch<DB.Action>;
}

export default ({ state, dispatch }: Props) => {
  const [year, setYear] = useState<number>();
  const [salary, setSalary] = useState<number>();
  const [currency, setCurrency] = useState("USD");

  const addSalary = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch({
      type: DB.ActionType.AddSalary,
      salary: { year: year ?? 0, salary: salary ?? 0, currency },
    });

    setYear(undefined);
    setSalary(undefined);
  };

  const removeSalary = (i: number) => {
    dispatch({
      type: DB.ActionType.RemoveSalary,
      index: i,
    });
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        {state.salaries.length > 0 && (
          <table className="w-full">
            <thead>
              <tr>
                <th>Year</th>
                <th>Salary</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {state.salaries.map((salary, i) => {
                return (
                  <tr key={i}>
                    <td className="text-right">{salary.year}</td>
                    <td className="text-right">
                      {new Intl.NumberFormat(undefined, {
                        currency: salary.currency,
                      }).format(salary.salary)}
                    </td>
                    <td>
                      <button type="button" onClick={() => removeSalary(i)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        {state.salaries.length === 0 && (
          <p>Enter your first salary to start plotting...</p>
        )}
      </div>
      <form onSubmit={addSalary}>
        <div className="flex">
          <input
            type="number"
            className="w-1/2 text-right"
            placeholder="Year"
            value={year ?? ""}
            onChange={(e) => setYear(parseInt(e.target.value, 10))}
          />
          <input
            type="number"
            className="ml-1 w-full text-right"
            placeholder="Salary"
            value={salary ?? ""}
            onChange={(e) => setSalary(parseInt(e.target.value, 10))}
          />
          <select
            className="ml-1"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="USD">USD</option>
            <option value="NZD">NZD</option>
          </select>
          <button className="ml-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};
