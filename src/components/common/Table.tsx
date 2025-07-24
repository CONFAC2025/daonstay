interface TableProps<T> {
  columns: { key: keyof T; label: string }[];
  rows: T[];
}

export const Table = <T extends object>({ columns, rows }: TableProps<T>) => {
  return (
    <table className="w-full text-left border-collapse">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={String(col.key)} className="p-3 md:p-4 text-sm md:text-base bg-v4-surface text-v4-text-muted font-semibold border-b-2 border-white/10 text-center">
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex} className="border-b border-secondary-gray-200">
            {columns.map((col) => (
              <td key={String(col.key)} className="p-3 md:p-4 text-sm md:text-base text-v4-text text-center">
                {row[col.key] as React.ReactNode}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};