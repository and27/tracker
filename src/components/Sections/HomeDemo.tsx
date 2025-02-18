const HomeDemo = () => {
  return (
    <div
      id="demo"
      className="flex flex-col justify-center items-center mx-auto bg-indigo-950 py-[8rem] px-5"
    >
      <h2 className="text-3xl font-bold text-center mb-[4rem] mx-auto">
        How it works
      </h2>
      <div className="h-[315px] w-[560px]">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/_pvB1nDEIzo?si=tji0pWOua6kVaJab"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default HomeDemo;
