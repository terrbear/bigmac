import { useReducer } from "react";
import BigMacChart from "./BigMacChart";
import History from "./History";
import * as DB from "./DB";

function App() {
  const [state, dispatch] = useReducer(DB.Dispatch, { salaries: [] });
  return (
    <>
      <div className="mt-20 flex flex-col justify-center items-center">
        <div>
          <h1 className="text-2xl">How are you doing vs inflation?</h1>
        </div>
        <div className="flex flex-row items-center justify-center text-red-700 bg-gray-100">
          {state.salaries.length > 0 && (
            <div className="mt-6 tracking-wide">
              <BigMacChart state={state} />
            </div>
          )}
          <div className="ml-6 mt-6 tracking-wide">
            <History state={state} dispatch={dispatch} />
          </div>
        </div>
        <p className="mt-10 text-gray-700 text-xs">
          This plots the number of big macs you could purchase in a year. More
          big macs means more spending power, at least at McD's. All data is
          kept locally. If you refresh, you'll lose your history. Sorry.
        </p>
      </div>
    </>
  );
}

export default App;
