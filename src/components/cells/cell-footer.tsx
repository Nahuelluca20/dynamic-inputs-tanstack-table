import { Table } from "@tanstack/react-table";
import { Product } from "../table/types";

export const CellFooter = ({ table }: { table: Table<Product> }) => {
  const meta = table.options.meta;
  return (
    <div className="footer-buttons">
      <button className="add-button" onClick={meta?.addRow}>
        Add New +
      </button>
    </div>
  );
};
