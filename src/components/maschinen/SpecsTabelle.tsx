interface SpecsTabelleProps {
  specs: Record<string, string | number>;
}

export function SpecsTabelle({ specs }: SpecsTabelleProps) {
  const entries = Object.entries(specs).filter(([, v]) => v !== null && v !== undefined && v !== "");

  if (entries.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200">
      <table className="w-full text-sm">
        <tbody className="divide-y divide-gray-100">
          {entries.map(([key, value], idx) => (
            <tr key={key} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="py-2.5 px-4 font-semibold text-[#0F1F3D] w-1/2 align-top">{key}</td>
              <td className="py-2.5 px-4 text-gray-700">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
