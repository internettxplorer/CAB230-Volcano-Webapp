import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useVolcanoTable } from "../hooks/useVolcanoTable";
import SelectSearch from "../components/SelectSearch";

export default function VolcanoList() {
    const [ search, setSearch ] = useState();
    const { rowData, loading, error } = useVolcanoTable(search);

    const nav = useNavigate();

    const columns = [
        { headerName: "Name", field: "name"}, 
        { headerName: "Country", field: "country"}, 
        { headerName: "Subregion", field: "subregion"} ,
        { headerName: "ID", field: "id"}
    ];

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Ya dun goofed: {error.message}</p>;
    }

    return (
        // CHANGE to mantine format
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
                    paginationPageSize={7}
                    onRowClicked={(row) => nav(`/volcano/${row.data.id}`)}
                />
            </div>
        </div>
    );
}