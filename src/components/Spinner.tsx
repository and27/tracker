type SpinnerProps = {
  size?: number;
  height?: number;
};
const Spinner: React.FC<SpinnerProps> = ({ size = 32, height = 96 }) => {
  return (
    <div className={`flex justify-center items-center h-${height}`}>
      <div
        className={`animate-spin rounded-full h-${size} w-${size} border-t-2 border-b-2 border-zinc-400`}
      ></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
