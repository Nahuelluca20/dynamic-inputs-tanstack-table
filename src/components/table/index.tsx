import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Product } from "./types";
import { data as defaultData } from "./data";
import { useState } from "react";

export default function TableComponent() {
  const [data, setData] = useState(() => [...defaultData]);
  const columnHelper = createColumnHelper<Product>();
  const columns = [
    columnHelper.accessor("id", { header: "id", meta: { type: "number" } }),
    columnHelper.accessor("title", { header: "Title", meta: { type: "text" } }),
    columnHelper.accessor("category", {
      header: "category",
      meta: { type: "text" },
    }),
    columnHelper.accessor("price", {
      header: "Price",
      meta: { type: "number" },
    }),
    columnHelper.accessor("discountPercentage", {
      header: "Discount Percentage",
      meta: { type: "number" },
    }),
    columnHelper.accessor("rating", {
      header: "Rating",
      meta: { type: "number" },
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
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
      </table>
    </div>
  );
}
