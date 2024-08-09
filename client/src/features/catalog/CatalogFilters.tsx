import { Paper } from "@mui/material";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import GameSearch from "./GameSearch";
import CheckboxButtons from "../../app/components/CheckboxButtons";
import { GameParams } from "../../app/models/game";
import { setGameParams } from "./catalogSlice";
import { useAppDispatch } from "../../app/store/configureStore";
import Typography from "../../app/components/Typography";

interface Props {
    consoles: string[];
    gameParams: GameParams;
}

export default function CatalogFilters({ consoles, gameParams }: Props) {
    const dispatch = useAppDispatch();

    const sortOptions = [
        { value: "name", label: "Sort by name" },
        { value: "priceLooseDesc", label: "Loose - High to Low" },
        { value: "priceLoose", label: "Loose - Low to High" },
        { value: "priceCompleteDesc", label: "CIB - High to Low" },
        { value: "priceComplete", label: "CIB - Low to High" },
        { value: "priceNewDesc", label: "New - High to Low" },
        { value: "priceNew", label: "New - Low to High" },
    ]

    return (
        <>
            <Paper sx={{ m: 2, p: 2, boxShadow: 3 }}>
                <GameSearch />
            </Paper>
            <Paper sx={{ m: 2, p: 2, boxShadow: 3 }}>
                <RadioButtonGroup
                    selectedValue={gameParams.orderBy}
                    options={sortOptions}
                    onChange={(e) => dispatch(setGameParams({ orderBy: e.target.value }))}
                />
            </Paper>

            <Paper sx={{ m: 2, p: 2, boxShadow: 3 }}>
                <Typography align="center">Game Consoles</Typography>
                <hr />
                <CheckboxButtons
                    items={consoles}
                    checked={gameParams.consoles}
                    onChange={(items: string[]) => dispatch(setGameParams({ consoles: items }))}
                />
            </Paper>
        </>
    )
}