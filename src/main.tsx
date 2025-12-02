// import './wdyr';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ReactDOMClient from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './index.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#262626',
    },
  },
});

// import Component from './demo-date-pickers'
// import Component from './demo-employees';
// import Component from './demo-virtualization';
// import Component from './debug';
// import Component from './debug-r18';
// import Component from './demo-base-ui/select';
import Component from './demo-base-ui/detached-triggers';
// import Component from './material-ui'
// import Component from './perf-charts';
// import Component from './perf-effects';
// import Component from './perf-bui-combobox';

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <div style={{ colorScheme: 'dark', padding: '2em' }}>
        <CssBaseline />
        <PerfToolsContainer />
      </div>
    </ThemeProvider>
  );
}

let setShowBenchmark = (_: boolean) => {};

function PerfToolsContainer() {
  const [shouldRemoveOutliers, setShouldRemoveOutliers] = React.useState(false);

  const runBenchmark = (iterations = 10, warmupIterations = 5) => {
    const results = [] as number[];

    for (let i = 0; i < warmupIterations + iterations; i++) {
      ReactDOM.flushSync(() => {
        setShowBenchmark(false);
      });
      const start = performance.now();
      ReactDOM.flushSync(() => {
        setShowBenchmark(true);
      });
      if (i < warmupIterations) {
        continue;
      }
      const end = performance.now();
      const elapsed = end - start;
      results.push(Math.round(elapsed * 10) / 10);
    }

    logResults(shouldRemoveOutliers ? removeOutlliers(results) : results);
  };

  return (
    <div>
      <div>
        <button onClick={() => setShowBenchmark((prev) => !prev)}>Toggle</button>
        <button onClick={() => runBenchmark(10, 5)} style={{ marginLeft: 8 }}>
          Run 10
        </button>
        <button onClick={() => runBenchmark(20, 5)} style={{ marginLeft: 8 }}>
          Run 20
        </button>
        <button onClick={() => runBenchmark(50, 5)} style={{ marginLeft: 8 }}>
          Run 50
        </button>
        <label style={{ marginLeft: 8 }}>
          <input
            type="checkbox"
            style={{ marginRight: 4 }}
            checked={shouldRemoveOutliers}
            onChange={(ev) => setShouldRemoveOutliers(ev.target.checked)}
          />
          Remove outliers
        </label>
      </div>
      <Container />
    </div>
  );
}

function Container() {
  const [showBenchmark, setShowBenchmarkLocal] = React.useState(true);

  setShowBenchmark = setShowBenchmarkLocal;

  if (!showBenchmark) {
    return null;
  }

  return <Component />;
}

function logResults(results: number[]) {
  console.log(results);
  console.log(
    'Average:',
    Math.round((results.reduce((a, b) => a + b, 0) / results.length) * 10) / 10,
  );
  console.log(
    'Std Dev:',
    (() => {
      const avg = results.reduce((a, b) => a + b, 0) / results.length;
      const squareDiffs = results.map((value) => {
        const diff = value - avg;
        return diff * diff;
      });
      const avgSquareDiff = squareDiffs.reduce((a, b) => a + b, 0) / squareDiffs.length;
      return +Math.sqrt(avgSquareDiff).toFixed(2);
    })(),
  );
}

function removeOutlliers(data: number[]) {
  const sortedData = data.slice().sort((a, b) => a - b);
  const q1Index = Math.floor(sortedData.length / 4);
  const q3Index = Math.floor((sortedData.length * 3) / 4);
  const q1 = sortedData[q1Index];
  const q3 = sortedData[q3Index];
  const iqr = q3 - q1;
  const lowerBound = q1 - 1.5 * iqr;
  const upperBound = q3 + 1.5 * iqr;

  return data.filter((value) => value >= lowerBound && value <= upperBound);
}

// ReactDOM.render(<App />, document.getElementById('root')!);
ReactDOMClient.createRoot(document.getElementById('root')!).render(<App />);
