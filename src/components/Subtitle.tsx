interface ISubtitle {
  title: string;
}
const Subtitle = (props: ISubtitle) => (
  <h2 className="text-lg lg:text-xl font-outfit text-neutral-600 dark:text-neutral-400">
    {props.title}
  </h2>
);

export default Subtitle;
