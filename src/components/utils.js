export function parseCsvToRowsAndColumn(csvText, csvColumnDelimiter, tableLines) {
    let rows = csvText.split('\n');
    if (!rows || rows.length === 0) {
      return [];
    }

    rows = rows.slice(0, tableLines);
  
    return rows.map(row => row.split(csvColumnDelimiter));
  }