interface GeneratedTransactionProps {
  generatedTransaction: {
    description: string;
    date: string;
    amount: number;
    category: { name: string };
    paymentMethod: { name: string };
    type: string;
  };
  handleClick: () => void;
}

const GeneratedTransaction: React.FC<GeneratedTransactionProps> = ({
  generatedTransaction,
  handleClick,
}) => {
  return (
    <div className="flex flex-col gap-1 shadow-md ">
      <p>
        📝Description:
        <br />
        {generatedTransaction?.description}
      </p>
      <div className="my-3 flex gap-2">
        <p>💰 ${generatedTransaction?.amount.toFixed(2)}</p>
        <p>📅 {generatedTransaction?.date}</p>
      </div>
      <div>
        <p>🏷️Category: {generatedTransaction?.category.name}</p>
        <p>💳Payment Method: {generatedTransaction?.paymentMethod.name}</p>
        <p>
          📊Type:{" "}
          {generatedTransaction?.type === "income" ? "Income 💵" : "Expense 💸"}
        </p>
      </div>
      <button
        className="w-full bg-indigo-600 hover:bg-indigo-800 text-white font-semibold py-2 px-4 mt-4 rounded-lg transition duration-300"
        onClick={handleClick}
      >
        Confirm Transaction ✅
      </button>
    </div>
  );
};

export default GeneratedTransaction;
