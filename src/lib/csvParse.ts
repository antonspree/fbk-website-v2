/** Minimaler RFC-4180-ähnlicher CSV-Parser (Komma oder Semikolon). */

function detectDelimiter(headerLine: string): "," | ";" {
  const commas = (headerLine.match(/,/g) ?? []).length;
  const semis = (headerLine.match(/;/g) ?? []).length;
  return semis > commas ? ";" : ",";
}

function parseLine(line: string, delimiter: "," | ";"): string[] {
  const out: string[] = [];
  let field = "";
  let inQuotes = false;
  let i = 0;
  while (i < line.length) {
    const c = line[i];
    if (inQuotes) {
      if (c === '"') {
        if (line[i + 1] === '"') {
          field += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i++;
        continue;
      }
      field += c;
      i++;
    } else {
      if (c === '"') {
        inQuotes = true;
        i++;
        continue;
      }
      if (c === delimiter) {
        out.push(field.trim());
        field = "";
        i++;
        continue;
      }
      field += c;
      i++;
    }
  }
  out.push(field.trim());
  return out;
}

export function parseCsv(text: string): { headers: string[]; rows: Record<string, string>[] } {
  const normalized = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n").trim();
  if (!normalized) return { headers: [], rows: [] };

  const lines: string[] = [];
  let buf = "";
  let q = false;
  for (let i = 0; i < normalized.length; i++) {
    const c = normalized[i];
    if (c === '"') q = !q;
    if (c === "\n" && !q) {
      if (buf.trim()) lines.push(buf);
      buf = "";
    } else {
      buf += c;
    }
  }
  if (buf.trim()) lines.push(buf);

  if (lines.length === 0) return { headers: [], rows: [] };

  const delimiter = detectDelimiter(lines[0]);
  const headers = parseLine(lines[0], delimiter).map((h) =>
    h.replace(/^\uFEFF/, "").trim().toLowerCase()
  );

  const rows: Record<string, string>[] = [];
  for (let li = 1; li < lines.length; li++) {
    const cells = parseLine(lines[li], delimiter);
    if (cells.every((c) => c === "")) continue;
    const row: Record<string, string> = {};
    headers.forEach((h, idx) => {
      row[h] = cells[idx] ?? "";
    });
    rows.push(row);
  }

  return { headers, rows };
}
