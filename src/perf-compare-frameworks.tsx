import '@joy-ui/react/index.css';
import { Button as JoyButton, Select as JoySelect } from '@joy-ui/react';
import {
  Button as MuiButton,
  Select as MuiSelect,
  MenuItem as MuiMenuItem,
} from '@mui/material';

const n = 500;
const array = Array.from({ length: n }).map((_, i) => i);

const options = [
  { value: 'Joy UI', component: JoyBenchmark },
  { value: 'Material UI', component: MaterialBenchmark },
];

export default function PerfCompareFrameworks({ option }: any) {
  const Component = option.component;
  return (
    <div style={{ padding: '1rem' }}>
      <Component />
    </div>
  );
}
PerfCompareFrameworks.options = options;

const fonts = [
  { label: 'Sans-serif', value: 'sans' },
  { label: 'Serif', value: 'serif' },
  { label: 'Monospace', value: 'mono' },
  { label: 'Cursive', value: 'cursive' },
];

function JoyBenchmark() {
  return (
    <div className="joy">
      {
        // <div>
        //   {array.map((i) => (
        //     <JoyButton key={i}>Button {i + 1}</JoyButton>
        //   ))}
        // </div>
      }
      <div>
        {array.map((i) => (
          <JoySelect.Root key={i} defaultValue="sans">
            <JoySelect.Trigger />
            <JoySelect.Popup>
              {fonts.map((font) => (
                <option key={font.value} value={font.value}>
                  {font.label}
                </option>
              ))}
            </JoySelect.Popup>
          </JoySelect.Root>
        ))}
      </div>
    </div>
  );
}

function MaterialBenchmark() {
  return (
    <div>
      {
        // <div>
        //   {array.map((i) => (
        //     <MuiButton key={i}>Button {i + 1}</MuiButton>
        //   ))}
        // </div>
      }
      <div>
        {array.map((i) => (
          <MuiSelect key={i} defaultValue="sans">
            {fonts.map((font) => (
              <MuiMenuItem key={font.value} value={font.value}>
                {font.label}
              </MuiMenuItem>
            ))}
          </MuiSelect>
        ))}
      </div>
    </div>
  );
}
