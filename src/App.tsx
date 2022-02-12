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
        <p className="mt-2">
          <a
            href="https://github.com/terrbear/bigmac"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              width="24"
              height="24"
              fill="currentColor"
              className="text-red-700 mr-3 text-opacity-50 transform"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.606 9.606 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48C19.137 20.107 22 16.373 22 11.969 22 6.463 17.522 2 12 2z"
              ></path>
            </svg>
          </a>
        </p>
      </div>
    </>
  );
}

export default App;
