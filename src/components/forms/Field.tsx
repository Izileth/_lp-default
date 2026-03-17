import type { ReactNode } from "react";

interface FieldProps {
  label: string;
  children: ReactNode;
  note?: string;
}

export function Field({ label, children, note }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-bold uppercase tracking-[0.12em] text-gray-500">{label}</label>
      {children}
      {note && <p className="text-[11px] text-gray-400">{note}</p>}
    </div>
  );
}
