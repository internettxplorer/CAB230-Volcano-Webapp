import { useState } from "react";
import { useNavigate, redirect } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import {
    Container,
    Box,
    Title,
    Space,
    Loader
} from "@mantine/core";

import { useVolcanoTable } from "../hooks/useVolcanoTable";
import SelectSearch from "../components/SelectSearch";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

/**
 * @desc Volcano database page with searchable select widget and table displaying search results
 */
export default function VolcanoList() {
    const [ search, setSearch ] = useState({ country: "null", populatedWithin: "null" });
    const { rowData, loading, error } = useVolcanoTable(search);
    const nav = useNavigate();

    const columns = [
        { headerName: "Name", field: "name"}, 
        { headerName: "Country", field: "country"}, 
        { headerName: "Subregion", field: "subregion"} ,
        { headerName: "ID", field: "id"}
    ];

    if (loading) {
        return <Loader color="yellow" ml="180px" mt="80px" />
    }

    if (error) {
        return redirect('/fetch-error');
    }

    return (
        <Container size="110rem" style={{ paddingTop: 20, paddingBottom: 15 }}>
            <Title order={4} size="40" mt="10" style={{ fontFamily: "Kayak Sans Bold" }}>
                Search the database
            </Title>
            <Space h="lg" />
            <SelectSearch selected={search} setSelection={setSearch} />
            <Box className="ag-theme-material-dark" style={{ height: "500px", width: "820px", marginLeft: "16px" }}>
                <AgGridReact
                        columnDefs={columns}
                        rowData={rowData}
                        pagination={true}
                        paginationPageSize={10}
                        onRowClicked={(row) => nav(`/volcano/${row.data.id}`)}
                />
            </Box>
        </Container>
    );
}