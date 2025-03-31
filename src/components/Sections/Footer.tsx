export const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white py-5 md:py-8 text-center flex flex-col items-center gap-5">
      <img src="/logoCard.svg" alt="logo" width="24" height="24" />
      <p className="text-sm md:text-base">
        &copy; {new Date().getFullYear()}{" "}
        <span className="font-semibold text-neutral-700 dark:text-neutral-200">
          Tracker
        </span>
        . Todos los derechos reservados.
      </p>
    </footer>
  );
};
