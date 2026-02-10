import TextField from '@mui/material/TextField';

export default function Component() {
  return (
    <div>
      <Row />
      <Row />
      <Row />
      <Row />
      <Row />
      <Row />
      <Row />
      <Row />
      <Row />
      <Row />
    </div>
  );
}

function Row() {
  return (
    <div>
      <TextField />
      <TextField />
      <TextField />
      <TextField />
      <TextField />
    </div>
  );
  // return (
  //   <div>
  //     <Button>Test</Button>
  //     <Button>Test</Button>
  //     <Button>Test</Button>
  //     <Button>Test</Button>
  //     <Button>Test</Button>
  //   </div>
  // )
}
