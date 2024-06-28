import TransactionForm from "../components/Forms/TransactionForm";

const TransactionFormPage = () => {
  return (
    <main className="col-span-10 p-6 w-1/2 ">
      <h1 className="text-2xl lg:text-3xl mb-6">Create new transaction</h1>
      <TransactionForm />
    </main>
  );
};

export default TransactionFormPage;
