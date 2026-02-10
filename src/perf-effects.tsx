'use client';
import * as React from 'react';

const rows = 1000;
const effects = 100;

export default function Component() {
  return (
    <div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i}>
          <Row />
        </div>
      ))}
    </div>
  );
}

function Row() {
  for (let i = 0; i < effects; i++) {
    React.useEffect(() => {
      // no-op
    }, []);
  }
  for (let i = 0; i < effects; i++) {
    React.useLayoutEffect(() => {
      // no-op
    }, []);
  }
  for (let i = 0; i < effects; i++) {
    React.useInsertionEffect(() => {
      // no-op
    }, []);
  }

  return <div>Row</div>;
}
