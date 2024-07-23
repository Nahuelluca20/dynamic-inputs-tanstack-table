import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Product } from "./types";
import { data as defaultData } from "./data";
import { useState } from "react";
import CellInput from "../inputs/cell-input";
import CellEdit from "../cells/cell-edit";
import { CellFooter } from "../cells/cell-footer";

export default function TableComponent() {
  const [data, setData] = useState(() => [...defaultData]);
  const [originalData, setOriginalData] = useState(() => [...defaultData]);
  const [editedRows, setEditedRows] = useState({});
  const columnHelper = createColumnHelper<Product>();
  const columns = [
    columnHelper.accessor("id", {
      header: "id",
      meta: { type: "number" },
    }),
    columnHelper.accessor("title", {
      header: "Title",
      meta: { type: "text", required: true },
      cell: CellInput,
    }),
    columnHelper.accessor("category", {
      header: "category",
      meta: {
        type: "select",
        required: true,
        options: [
          { value: "beauty", label: "beauty" },
          { value: "fragrances", label: "fragrances" },
          { value: "groceries", label: "groceries" },
          { value: "kitchen-accessories", label: "kitchen-accessories" },
        ],
      },
      cell: CellInput,
    }),
    columnHelper.accessor("price", {
      header: "Price",
      meta: { type: "number", required: true },
      cell: CellInput,
    }),
    columnHelper.accessor("discountPercentage", {
      header: "Discount Percentage",
      meta: { type: "number", required: true },
      cell: CellInput,
    }),
    columnHelper.accessor("rating", {
      header: "Rating",
      meta: { type: "number", required: true },
      cell: CellInput,
    }),
    columnHelper.display({
      id: "edit",
      cell: CellEdit,
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      editedRows,
      setEditedRows,
      updateData: (rowIndex, columnId, value) => {
        setData((old) => {
          const updated = [...old];
          updated[rowIndex] = { ...updated[rowIndex], [columnId]: value };
          return updated;
        });
      },
      revertData: (rowIndex: number, revert: boolean) => {
        if (revert) {
          setData((old) =>
            old.map((row, index) =>
              index === rowIndex ? originalData[rowIndex] : row
            )
          );
        } else {
          setOriginalData((old) =>
            old.map((row, index) => (index === rowIndex ? data[rowIndex] : row))
          );
        }
      },
      removeRow: (rowIndex: number) => {
        const setFilterFunc = (old: Product[]) =>
          old.filter((_row: Product, index: number) => index !== rowIndex);
        setData(setFilterFunc);
        setOriginalData(setFilterFunc);
      },
      addRow: () => {
        const newRow: Product = {
          id: Math.floor(Math.random() * 10000),
          title: "",
          category: "",
          price: 0,
          discountPercentage: 0,
          rating: 0,
          stock: 0,
        };
        const setFunc = (old: Product[]) => [...old, newRow];
        setData(setFunc);
        setOriginalData(setFunc);
      },
    },
  });

  return (
    <div>
      <h1 className="mb-10">Table</h1>
      <table className="text-start max-w-[200px] border-2 border-red-200">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th className="text-start bg-red-400 py-2 px-8" key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
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
            <tr key={row.id} className="">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-8 py-2 border-b-2 border-red-200 "
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={table.getCenterLeafColumns().length} align="right">
              <CellFooter table={table} />
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
