import { getMonthName } from "./utils";
import jsPDF from "jspdf";
import Papa from "papaparse"; // For CSV export
import "jspdf-autotable";

export const exportCSV = (headerColumns:any,sortedItems:any) => {
    const csvData = Papa.unparse({
      fields: headerColumns.slice(0, headerColumns.length - 1).flatMap((column:any) =>
        column.exports.map((field:string) => field)
      ),
      data: sortedItems.map((item:any) =>
        headerColumns.flatMap((column:any) =>
          column.exports.map((field:string) => {
              let result;
              switch (field) {
                case "joueur":
                  result = item.name;
                  break;
                case "ville":
                  result = item.city;
                  break;
                case "host":
                  result = item.host.name;
                  break;
                case "match":
                  result = item.address;
                  break;
                case "date":
                  result = `${getMonthName(item.time.toDate().getMonth()).slice(0, 3)} ${item.time.toDate().getDate()},${item.time.toDate().getFullYear()}`;
                  break;
                case "heure":
                  result = `${item.time.toDate().getHours()}:${item.time.toDate().getMinutes()} ${item.time.toDate().getHours() < 12 ? 'am' : 'pm'}`;
                  break;
                default:
                  result = item[field];
                  break;
              }
              return result;
            })
        )
      ),
    });

    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "export.csv";
    link.click();
  };

export  const exportPDF = (headerColumns:any,sortedItems:any) => {
    const pdf:any = new jsPDF();
    pdf.autoTable({
      head: [headerColumns.slice(0, headerColumns.length - 1).flatMap((column:any) =>
        column.exports.map((field:string) => field)
      ),],
      body: sortedItems.map((item:any) =>
        headerColumns.flatMap((column:any) =>
        column.exports.map((field: string) => {
          let result;
          switch (field) {
            case "joueur":
              result = item.name;
              break;
            case "ville":
              result = item.city;
              break;
            case "host":
              result = item.host.name;
              break;
            case "match":
              result = item.address;
              break;
            case "date":
              result = `${getMonthName(item.time.toDate().getMonth()).slice(0, 3)} ${item.time.toDate().getDate()},${item.time.toDate().getFullYear()}`;
              break;
            case "heure":
              result = `${item.time.toDate().getHours()}:${item.time.toDate().getMinutes()} ${item.time.toDate().getHours() < 12 ? 'am' : 'pm'}`;
              break;
            default:
              result = item[field];
              break;
          }
          return result;
        })
        )
      ),
    });

    pdf.save("export.pdf");
  };
