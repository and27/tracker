import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { TransactionType } from "../pages/TransactionsPage";
import { FaTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";

type TableProps = {
  columns: any[];
  data: TransactionType[];
  handleDeleteRow: (id: string) => void;
};

const Table = ({ columns, data, handleDeleteRow }: TableProps) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              <th className="border-b border-b-zinc-200/90 dark:border-b-zinc-700 py-3 px-5 bg-slate-100 bg-transparent text-start text-neutral-500 dark:text-zinc-500">
                Action
              </th>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border-b border-b-zinc-200/90 dark:border-b-zinc-700 py-3 px-5 bg-slate-100 bg-transparent text-start text-neutral-500 dark:text-zinc-500"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="odd:bg-zing-100 odd:dark:bg-transparent even:bg-slate-50 even:dark:bg-transparent 
              hover:bg-zinc-200/30 dark:hover:bg-zinc-950/30 transition-colors duration-100 text-start"
            >
              <td className="border-b border-b-zinc-200/70 dark:border-b-zinc-800 py-2 md:py-4 px-5">
                <div className="flex gap-4">
                  <button
                    className="m-0 p-0 bg-transparent"
                    onClick={() => handleDeleteRow(row.original.id)}
                  >
                    <FaTrashCan color="#888" />
                  </button>
                  <button className="m-0 p-0 bg-transparent">
                    <FaEdit color="#888" />
                  </button>
                </div>
              </td>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="border-b border-b-zinc-200/70 dark:border-b-zinc-800 py-2 md:py-4 px-5 
                  text-neutral-900 dark:text-zinc-100 text-sm md:text-base overflow-hidden whitespace-nowrap"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className="flex justify-center items-center h-96">
          <p className="text-neutral-500 dark:text-neutral-400 text-lg">
            No transactions found
          </p>
        </div>
      )}
      <div className="p-3">
        <div className="flex items-center gap-3 justify-end">
          <button
            className="bg-neutral-100 dark:bg-neutral-800 rounded px-2 md:px-4 py-1"
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </button>
          <button
            className="bg-neutral-100 dark:bg-neutral-800 rounded px-2 md:px-4 py-1"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </button>
          <button
            className="bg-neutral-100 dark:bg-neutral-800 rounded px-2 md:px-4 py-1"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </button>
          <button
            className="bg-neutral-100 dark:bg-neutral-800 rounded px-2 md:px-4 py-1"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </button>
          <span className="flex items-center gap-1">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount().toLocaleString()}
            </strong>
          </span>

          <select
            value={table.getState().pagination.pageSize}
            className="rounded text-neutral-100 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-100 px-2 md:px-4 py-2"
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Table;
