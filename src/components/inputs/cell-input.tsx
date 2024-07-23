import { Row, Column, Table } from "@tanstack/react-table";
import { ChangeEvent, useEffect, useState } from "react";
import { Product } from "../table/types";

type Option = {
  label: string;
  value: string;
};

export default function CellInput({
  getValue,
  row,
  column,
  table,
}: {
  getValue: () => string | number;
  row: Row<Product>;
  column: Column<Product>;
  table: Table<Product>;
}) {
  const initialValue = getValue();
  const columnMeta = column.columnDef.meta;
  const tableMeta = table.options.meta;
  const [value, setValue] = useState(initialValue);
  const [validationMessage, setValidationMessage] = useState("");

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onBlur = (e: ChangeEvent<HTMLInputElement>) => {
    displayValidationMessage(e);
    tableMeta?.updateData(row.index, column.id, value);
  };

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    displayValidationMessage(e);
    setValue(e.target.value);
    tableMeta?.updateData(row.index, column.id, e.target.value);
  };

  const displayValidationMessage = <
    T extends HTMLInputElement | HTMLSelectElement
  >(
    e: ChangeEvent<T>
  ) => {
    if (columnMeta?.validation) {
      const isValid = columnMeta.validation(e.target.value);
      if (isValid.success) {
        e.target.setCustomValidity("");
        setValidationMessage("");
      } else {
        e.target.setCustomValidity(String(isValid.error.errors[0].message));
        setValidationMessage(String(isValid.error.errors[0].message));
      }
    } else if (e.target.validity.valid) {
      setValidationMessage("");
    } else {
      setValidationMessage(e.target.validationMessage);
    }
  };

  if (tableMeta?.editedRows[Number(row.id)]) {
    return columnMeta?.type === "select" ? (
      <div>
        <select
          className="max-w-[100px] invalid:border-red-500"
          onChange={onSelectChange}
          value={initialValue}
          required={columnMeta?.required}
        >
          {columnMeta?.options?.map((option: Option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="text-red-500">{validationMessage}</span>
      </div>
    ) : (
      <div>
        <input
          className="max-w-[100px] invalid:border-red-500"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={onBlur}
          type={columnMeta?.type || "text"}
          required={columnMeta?.required}
        />
        <span className="text-red-500">{validationMessage}</span>
      </div>
    );
  }

  return (
    <span className="w-full flex min-w-[100px] text-ellipsis line-clamp-2 max-h-[100px]">
      {value}
    </span>
  );
}
