import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
// CHANGE styling later
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";

export default function DataGrid() {
    // const table = {
    //     columns: [
    //       { headerName: "Make", field: "make" },
    //       { headerName: "Model", field: "model" },
    //       { headerName: "Price", field: "price" },
    //     ],
    //     rowData: [
    //       { make: "Toyota", model: "Camry", price: 28000 },
    //       { make: "Ford", model: "Focus", price: 16700 },
    //       { make: "Hyundai", model: "Kona", price: 23500 },
    //     ]
    //   };

    const [rowData, setRowData] = useState([]);

    const columns = [
        { headerName: "Name", field: "name"}, 
        { headerName: "Country", field: "country"}, 
        { headerName: "ID", field: "id"}
    ];

    useEffect(() => {
        fetch("http://4.237.58.241:3000/volcanoes?country=Algeria")
            .then(response => response.json())
            .then(data =>
                    data.map(volcano => {
                        return {
                            name: volcano.name,
                            country: volcano.country,
                            id: volcano.id
                        };
                    })
            )
            .then(d => setRowData(d));
    }, []);

    return (
        <div
            className="ag-theme-balham"
            style={{ height: "300px", width: "600px" }}
        >
            <AgGridReact
                columnDefs={columns}
                rowData={rowData}
                pagination={true}
                paginationPageSize={10}
            />
        </div>
      );
}