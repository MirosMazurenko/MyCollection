import { Grid } from "@mui/material";
import AppPagination from "../../app/components/AppPagination";
import { setPageNumber } from "./catalogSlice";
import { useAppDispatch } from "../../app/store/configureStore";
import { MetaData } from "../../app/models/pagination";

interface Props {
    metaData: MetaData;
}

export default function CatalogPagination({ metaData }: Props) {
    const dispatch = useAppDispatch();

    return (
        <Grid item xs={9} sx={{ m: 2, display: 'flex', justifyContent: 'flex-start' }}>
            {metaData &&
                <AppPagination
                    metaData={metaData}
                    onPageChange={(page: number) => dispatch(setPageNumber({ pageNumber: page }))}
                />}
        </Grid>
    )
}