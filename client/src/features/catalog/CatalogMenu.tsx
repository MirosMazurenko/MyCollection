import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useState } from "react";

interface Props {
    consoles: string[];
}

export default function CatalogMenu({ consoles }: Props) {
    const [value, setValue] = useState(0);

    return (
        <>
            <BottomNavigation
                sx={{ m: 2, display: 'flex', flexWrap: 'wrap', }}
                showLabels
                value={value}
                onChange={(_event, newValue) => {
                    setValue(newValue);
                }}
            >
                {consoles.map((console, index) =>
                    <BottomNavigationAction
                        key={index}
                        label={console}
                        sx={{
                            backgroundColor: value === index ? '#d3d3d3' : 'inherit',
                            border: '1px solid black',
                            flex: `1 0 ${100 / 5}%`, // Adjust '5' to the number of buttons per row
                            boxSizing: 'border-box', // Include border in width calculation
                            maxWidth: `${100 / 5}%`, // Ensures max-width is same as calculated width
                        }}
                    />
                )}
            </BottomNavigation>
        </>
    )
}