type Column<T> = {
  title: string;
  getData: (item: T) => string;
};
type TableProps<T> = {
  items: T[] | null;
  columns: Column<T>[];
};
export function Table<T>({ items, columns }: TableProps<T>) {
  if (!items) return null;

  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.title}>{column.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td key={column.title}>{column.getData(item)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
