import type { AdminTableColumn } from '@/types/admin';

type AdminDataTableProps<T extends { id: string }> = {
  title: string;
  columns: AdminTableColumn<T>[];
  rows: T[];
};

export function AdminDataTable<T extends { id: string }>({ columns, rows, title }: AdminDataTableProps<T>) {
  return (
    <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04]">
      <div className="border-b border-white/10 px-6 py-5">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-arena-violet">Command log</p>
        <h2 className="mt-2 text-2xl font-black text-white">{title}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/10 text-left text-sm">
          <thead className="bg-white/[0.03] text-xs uppercase tracking-[0.2em] text-slate-400">
            <tr>{columns.map((column) => <th className="px-6 py-4" key={String(column.key)}>{column.label}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-white/10 text-slate-200">
            {rows.map((row) => (
              <tr className="transition hover:bg-arena-cyan/5" key={row.id}>
                {columns.map((column) => <td className="whitespace-nowrap px-6 py-4" key={String(column.key)}>{String(row[column.key])}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
