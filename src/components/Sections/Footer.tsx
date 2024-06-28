export const Footer = () => {
  return (
    <footer className="dark:bg-indigo-950 text-white py-5 md:py-10 text-center flex flex-col items-center gap-5">
      <img src="/logoCard.svg" alt="logo" width="24" height="24" />
      <p className="text-sm md:text-base">
        &copy; 2024 Budget Tracker. All rights reserved.
      </p>
    </footer>
  );
};
