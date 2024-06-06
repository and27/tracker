import SidebarMenu from "../components/SidebarMenu";
import TransactionForm from "../components/TransactionForm";

const TransactionFormPage = () => {
  return (
    <div className="grid grid-cols-12">
      <SidebarMenu />
      <main className="col-span-10 p-6 w-1/2 ">
        <h1 className="text-2xl lg:text-3xl mb-6">Create new transaction</h1>
        <TransactionForm />
      </main>
    </div>
  );
};

export default TransactionFormPage;
