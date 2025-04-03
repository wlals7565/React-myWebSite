import dayjs from "dayjs";

const TestPage = () => {
  dayjs().set()
  return (
    <div style={{display: 'flex'}}>
      <div style={{outline: "2px solid black", margin: '0 0 0 0'}}>test1</div>
      <div style={{outline: "2px solid black", margin: '0 0 0 0'}}>test2</div>
    </div>
  );
};

export default TestPage;
