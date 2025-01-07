import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { FaTrashCan } from "react-icons/fa6";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { defaultColumn } from "./TableDefaultColumn";
import { TableProps } from "../data/types/tableProps";

const Table = ({ columns, data, setData, handleDeleteRow }: TableProps) => {
  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const table = useReactTable({
    data,
    columns,
    defaultColumn: defaultColumn,
    getRowId: (row) => row.id.toString(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    rowCount: data.length,
    state: {
      pagination,
    },
    meta: {
      editingRowId,
      updateData: (rowIndex: number, columnId: string, value: string) => {
        setData((old) =>
          old.map((row, index) =>
            index === rowIndex
              ? {
                  ...row,
                  [columnId]: value,
                }
              : row
          )
        );
      },
    },
  });

  const handleSave = (rowId: string) => {
    setEditingRowId(null);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              <th
                scope="col"
                className="border-b border-b-zinc-200/90 dark:border-b-zinc-700 py-3 px-5 bg-slate-100 bg-transparent text-start text-neutral-600 dark:text-zinc-400"
              >
                Action
              </th>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  scope="col"
                  className="border-b border-b-zinc-200/90 dark:border-b-zinc-700 py-3 px-5 bg-slate-100 bg-transparent text-start text-neutral-600 dark:text-zinc-400"
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
                  {editingRowId === row.original.id ? (
                    // Buttons to save and cancel when the row is in edit mode
                    <>
                      <button
                        className="m-0 p-0 bg-transparent"
                        onClick={() => handleSave(row.original.id)}
                      >
                        <FaSave color="#4CAF50" />
                      </button>
                      <button
                        className="m-0 p-0 bg-transparent"
                        onClick={() => setEditingRowId(null)}
                      >
                        <FaTimes color="#FF5722" />
                      </button>
                    </>
                  ) : (
                    // Buttons to edit and delete when the row is not in edit mode
                    <>
                      <button
                        className="m-0 p-0 bg-transparent"
                        onClick={() => {
                          setEditingRowId(row.original.id);
                        }}
                      >
                        <FaEdit color="#888" />
                      </button>
                      <button
                        className="m-0 p-0 bg-transparent"
                        onClick={() => handleDeleteRow(row.original.id)}
                      >
                        <FaTrashCan color="#888" />
                      </button>
                    </>
                  )}
                </div>
              </td>
              {row.getVisibleCells().map((cell) => {
                return (
                  <td
                    key={cell.id}
                    className="border-b border-b-zinc-200/70 dark:border-b-zinc-800 py-2 md:py-4 px-5
                  text-neutral-900 dark:text-zinc-100 text-sm md:text-base overflow-hidden whitespace-nowrap
                  w-min"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
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
