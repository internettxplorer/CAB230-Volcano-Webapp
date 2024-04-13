import { AgGridReact } from "ag-grid-react";
// CHANGE styling later
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";

export default function DataGrid() {
    const table = {
        columns: [
          { headerName: "Make", field: "make" },
          { headerName: "Model", field: "model" },
          { headerName: "Price", field: "price" },
        ],
        rowData: [
          { make: "Toyota", model: "Camry", price: 28000 },
          { make: "Ford", model: "Focus", price: 16700 },
          { make: "Hyundai", model: "Kona", price: 23500 },
        ]
      };
    
      return (
        <div
            className="ag-theme-balham"
            style={{ height: "300px", width: "600px" }}
        >
            <AgGridReact
                columnDefs={table.columns}
                rowData={table.rowData}
                pagination
            />
        </div>
      );
}