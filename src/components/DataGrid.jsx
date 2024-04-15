import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
// CHANGE data grid styling
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";

export default function DataGrid() {
    const [rowData, setRowData] = useState([]);

    const columns = [
        { headerName: "Name", field: "name"}, 
        { headerName: "Country", field: "country"}, 
        { headerName: "ID", field: "id"}
    ];

    // ADD error catching
    // CHANGE may be required later...
    useEffect(() => {
        fetch("http://4.237.58.241:3000/volcanoes?country=Algeria")
            .then(response => response.json())
            .then(response =>
                    response.map(volcano => {
                        return {
                            name: volcano.name,
                            country: volcano.country,
                            id: volcano.id
                        };
                    })
            )
            .then(data => setRowData(data));
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