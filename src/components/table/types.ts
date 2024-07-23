/* eslint-disable @typescript-eslint/no-unused-vars */
import "@tanstack/react-table";
import { RowData } from "@tanstack/react-table";
import { z } from "zod";

type SafeParseReturnType<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: z.ZodError;
    };

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (
      rowIndex: number,
      columnId: string,
      value: string | number
    ) => void;
    editedRows: Record<number, boolean>;
    setEditedRows: React.Dispatch<React.SetStateAction<object>>;
    revertData: (rowIndex: number, isCancel: boolean) => void;
    removeRow: (rowIndex: number) => void;
    addRow: () => void;
  }

  interface ColumnMeta<TData extends RowData, TValue> {
    type?: "text" | "number" | "select";
    required?: boolean;
    options?: { label: string; value: string }[];
    validation?: (value: TValue) => SafeParseReturnType<TValue>;
  }
}

export type Product = {
  id: number;
  title: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
};
