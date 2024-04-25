import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import {
    Container,
    Box,
    Title,
    Space,
} from "@mantine/core";

import { useVolcanoTable } from "../hooks/useVolcanoTable";
import SelectSearch from "../components/SelectSearch";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";

export default function VolcanoList() {
    const [ search, setSearch ] = useState({ country: "", populatedWithin: "null" });
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
        <Container size="110rem" style={{ paddingTop: 20, paddingBottom: 15 }}>
            <Title order={4} size="40" mt="10" style={{ fontFamily: "Kayak Sans Bold" }}>
                Search the database
            </Title>
            <Space h="lg" />
            <SelectSearch selected={search} setSelection={setSearch} />
            {/* <Box className="ag-theme-balham" style={{ height: "300px", width: "600px", marginLeft: "16px" }}>
                <AgGridReact
                        columnDefs={columns}
                        rowData={rowData}
                        pagination={true}
                        paginationPageSize={7}
                        onRowClicked={(row) => nav(`/volcano/${row.data.id}`)}
                />
            </Box> */}
            <div
                className="ag-theme-balham"
                style={{ height: "300px", width: "600px", marginLeft: "16px", borderRadius: "20" }}
            >
                <AgGridReact
                    columnDefs={columns}
                    rowData={rowData}
                    pagination={true}
                    paginationPageSize={7}
                    onRowClicked={(row) => nav(`/volcano/${row.data.id}`)}
                />
            </div>
        </Container>
    );
}