interface ISubtitle {
  title: string;
}
const Subtitle = (props: ISubtitle) => (
  <h2 className="text-lg lg:text-xl mb-4 font-outfit text-neutral-700 dark:text-neutral-400">
    {props.title}
  </h2>
);

export default Subtitle;
