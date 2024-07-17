import LinkButton from "../LinkButton";

const Scurve = () => (
  <section className="mx-auto py-[8rem] bg-neutral-900 px-5">
    <div className="grid grid-cols-1 md:grid-cols-2 max-w-[1280px] mx-auto items-center">
      <div className="flex flex-col gap-5">
        <h2 className="text-3xl font-bold">Why people join to tracker</h2>
        <p className="text-base w-11/12">
          Tracker allows you to track your expenses and income, and provides
          insights into your spending habits. It helps you to manage your
          finances better and save more money.
        </p>
        <LinkButton to="/login">Learn More</LinkButton>
      </div>
      <img src="scurveImage.svg" alt="scurve" className="md:px-10" />
    </div>
  </section>
);

export default Scurve;
