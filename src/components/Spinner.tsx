const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-96">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-zinc-400"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
