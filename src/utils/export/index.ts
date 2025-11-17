export interface ExportColumn<T = Record<string, unknown>> {
  key: keyof T | string;
  label: string;
  formatter?: (value: unknown, item: T) => string;
}

export interface ExportOptions<T = Record<string, unknown>> {
  filename?: string;
  columns: ExportColumn<T>[];
  data: T[];
}

function convertToCSV<T>(data: T[], columns: ExportColumn<T>[]): string {
  if (!data.length || !columns.length) return "";

  const headers = columns.map((col) => col.label).join(",");

  const rows = data.map((item) => {
    return columns
      .map((col) => {
        const value = (item as Record<string, unknown>)[String(col.key)];
        const formattedValue = col.formatter
          ? col.formatter(value, item)
          : value;

        const stringValue = String(formattedValue || "");
        if (
          stringValue.includes(",") ||
          stringValue.includes('"') ||
          stringValue.includes("\n")
        ) {
          return `"${stringValue.replace(/"/g, '""')}"`;
        }
        return stringValue;
      })
      .join(",");
  });

  return [headers, ...rows].join("\n");
}

async function convertToExcel<T>(
  data: T[],
  columns: ExportColumn<T>[]
): Promise<ArrayBuffer> {
  const XLSX = await import("xlsx");

  const worksheetData = [
    columns.map((col) => col.label),
    ...data.map((item) => {
      return columns.map((col) => {
        const value = (item as Record<string, unknown>)[String(col.key)];
        const formattedValue = col.formatter
          ? col.formatter(value, item)
          : value;
        return formattedValue;
      });
    }),
  ];

  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Dados");

  // Converte para ArrayBuffer
  return XLSX.write(workbook, { type: "array", bookType: "xlsx" });
}

function downloadFile(
  content: string | ArrayBuffer,
  filename: string,
  mimeType: string = "text/csv"
): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.style.display = "none";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

export function exportToCSV<T = Record<string, unknown>>(
  options: ExportOptions<T>
): void {
  const { filename = "export", columns, data } = options;

  try {
    const csvContent = convertToCSV(data, columns);
    const fullFilename = `${filename}.csv`;

    downloadFile(csvContent, fullFilename, "text/csv;charset=utf-8;");

    console.log(
      `Exportação concluída: ${data.length} registros exportados para ${fullFilename}`
    );
  } catch (error) {
    console.error("Erro ao exportar dados:", error);
    throw new Error("Falha ao exportar dados");
  }
}

export async function exportToExcel<T = Record<string, unknown>>(
  options: ExportOptions<T>
): Promise<void> {
  const { filename = "export", columns, data } = options;

  try {
    const excelBuffer = await convertToExcel(data, columns);
    const fullFilename = `${filename}.xlsx`;

    downloadFile(
      excelBuffer,
      fullFilename,
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    console.log(
      `Exportação Excel concluída: ${data.length} registros exportados para ${fullFilename}`
    );
  } catch (error) {
    console.error("Erro ao exportar dados para Excel:", error);
    throw new Error("Falha ao exportar dados para Excel");
  }
}
