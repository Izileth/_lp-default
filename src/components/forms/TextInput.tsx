interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  prefix?: string;
  placeholder?: string;
}

export function TextInput({ value, onChange, prefix, placeholder }: TextInputProps) {
  return (
    <div className="relative">
      {prefix && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-400 select-none">
          {prefix}
        </span>
      )}
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full border border-gray-200 rounded bg-white px-3 py-3 text-gray-900 text-sm font-medium placeholder-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 transition-all ${
          prefix ? "pl-8" : ""
        }`}
      />
    </div>
  );
}
