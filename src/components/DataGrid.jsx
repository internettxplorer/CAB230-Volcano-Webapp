import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";

import { useVolcanoTable } from "../API";
// CHANGE data grid styling
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";

/**
 * @desc Clickable table with volcano information from API using ag-grid
 * 
 * @todo search query with user input
 * @todo error catching
 * @todo styling
 */
export default function DataGrid() {
    // const [rowData, setRowData] = useState([]);

    // const [ search, setSearch ] = useState('Ecuador');
    // const { rowData, loading, error } = useVolcanoTable();

    const columns = [
        { headerName: "Name", field: "name"}, 
        { headerName: "Country", field: "country"}, 
        { headerName: "ID", field: "id"} // CHANGE to display subregion instead
    ];

    /**
     * Need to change fetch so that it takes a dynamic query e.g. ${country}
     * based on user input from dropdown list...
     * 
     * 15.04.2024 plan: Refactor code to isolate fetch query
     *  */ 
    // useEffect(() => {
    //     fetch("http://4.237.58.241:3000/volcanoes?country=Algeria")
    //         .then(response => response.json())
    //         .then(response =>
    //                 response.map(volcano => {
    //                     return {
    //                         name: volcano.name,
    //                         country: volcano.country,
    //                         id: volcano.id
    //                     };
    //                 })
    //         )
    //         .then(data => setRowData(data));
    // }, []);


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