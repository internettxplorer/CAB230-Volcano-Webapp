import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";

import { useState } from "react";

// @ts-ignore
import { useVolcanoTable } from "../api";
import SelectSearch from "../components/SelectSearch";

export default function VolcanoList() {
    const [ search, setSearch ] = useState('Antarctica');
    const { rowData, loading, error } = useVolcanoTable(search);

    const columns = [
        { headerName: "Name", field: "name"}, 
        { headerName: "Country", field: "country"}, 
        { headerName: "Subregion", field: "subregion"} 
    ];

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Ya dun goofed: {error.message}</p>;
    }

    return (
        <div>
            <SelectSearch onSubmit={setSearch} />

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
        </div>
    );
}