import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { useState } from "react";

interface Props {
    items: string[];
    checked?: string[];
    onChange: (items: string[]) => void;
}

export default function CheckboxButtons({ items, checked, onChange }: Props) {
    const [checkedItems, setCheckedItems] = useState(checked || []);

    function handleChecked(value: string) {
        const currentIndex = checkedItems.findIndex(item => item === value);
        let newChecked: string[] = [];
        if (currentIndex === -1) newChecked = [...checkedItems, value];
        else newChecked = checkedItems.filter(item => item !== value);
        setCheckedItems(newChecked);
        onChange(newChecked);
    }

    function transformLabel(label: string) {
        return label
            .replace(/-/g, ' ') // Replace hyphens with spaces
            .replace(/\b\w/g, (c) => c.toUpperCase()); // Capitalize first letter of each word
    }

    return (
        <>
            <FormGroup>
                {items.map((item) => (
                    <FormControlLabel
                        control={<Checkbox
                            checked={checkedItems.indexOf(item) !== -1}
                            onClick={() => handleChecked(item)}
                        />}
                        label={transformLabel(item)} // Apply the transformation here
                        key={item}
                    />
                ))}
            </FormGroup>
        </>
    )
}