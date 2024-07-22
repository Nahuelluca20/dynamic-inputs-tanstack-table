// import { Column, RowData } from "@tanstack/react-table";

// declare module "@tanstack/react-table" {
//   interface TableMeta<TData extends RowData> extends TableMeta<TData> {
//     editedRows: Record<number, boolean>;
//     setEditedRows: React.Dispatch<
//       React.SetStateAction<Record<number, boolean>>
//     >;
//     revertData: (rowIndex: number, revert: boolean) => void;
//     updateData: (rowIndex: number, columnId: string, value: string) => void;
//     addRow: () => void;
//     removeRow: (rowIndex: number) => void;
//   }
//   interface ColumnMeta<TData extends RowData, TValue>
//     extends Column<Product, unknown> {
//     type?: string;
//     required?: boolean;
//     options?: { label: string; value: string }[];
//   }
// }

export type Product = {
  id: number;
  title: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
};
