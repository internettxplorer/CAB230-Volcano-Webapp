import Select from "react-select";

export default function SelectSearch() {
    const options = [
        { value: "Algeria", label: "Algeria" },
        { value: "Antarctica", label: "Antarctica" },
        { value: "Argentina", label: "Argentina" }
    ];

    return (
        <div>
            <Select options={options} />
        </div>
    )
}

