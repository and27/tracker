import { useState } from "react";
import AccountSummary from "../components/AccountSummary";
import SidebarMenu from "../components/SidebarMenu";
import TransactionOverviewList from "../components/TransactionOverviewList";
import { FaBars, FaX } from "react-icons/fa6";

function OverviewPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <div className="bg-neutral-50 dark:bg-neutral-900">
        <button
          id="toggleSidebar"
          className="relative block lg:hidden bg-teal-500 text-white px-4 py-2 mx-9 z-20 ml-auto"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <FaX /> : <FaBars />}
        </button>
        <div className="grid grid-cols-12">
          <SidebarMenu isOpen={isSidebarOpen} />
          <main className="col-span-10 p-10">
            <h1 className="text-2xl lg:text-3xl mb-6 font-outfit">
              Welcome, here is your account overview
            </h1>
            <div className="md:grid md:grid-cols-6 gap-6">
              <AccountSummary />
              <TransactionOverviewList />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default OverviewPage;
