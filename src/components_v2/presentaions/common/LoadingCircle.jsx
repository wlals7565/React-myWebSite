import "./styles/LoadingCircle.css"

const LoadingCircle = () => {
  return (
    <div className="loading-container">
      <div className="loading"></div>
      <div id="loading-text">loading</div>
    </div>
  );
};

export default LoadingCircle;
