/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box, Skeleton, Button } from "@mui/material";
import theme from "../../app/theme/theme";
import { CollectionItem } from "../../app/models/gameCollection";
import { useAppDispatch } from "../../app/store/configureStore";
import { toast } from "react-toastify";
import { removeGameCollectionItemAsync } from "./gameCollectionSlice";

interface Props {
    items: CollectionItem[];
}

export default function GameCollectionList({ items }: Props) {
    const dispatch = useAppDispatch();

    const handleButtonClick = (gameId: number, gameCondition: string) => {
        dispatch(removeGameCollectionItemAsync({ gameId: gameId, gameCondition: gameCondition }))
            .unwrap()
            .then(() => {
                toast.success('Game successfully removed from collection!');
            })
            .catch((_error: any) => {
                toast.error('Something went wrong!');
            });
    };

    return (
        <Box>
            <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>Game</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>Game Console</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>Game Condition</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>Price</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!items ? (
                            Array.from(new Array(19)).map((_, index) => (
                                <TableRow key={index}>
                                    <TableCell colSpan={6}>
                                        <Skeleton variant="rectangular" height={40} animation="wave" />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            items.map((item, index) => (
                                <TableRow
                                    key={index}
                                    sx={{
                                        '&:hover': { backgroundColor: theme.palette.action.selected },
                                    }}
                                >
                                    <TableCell component="th" scope="row">{item.name}</TableCell>
                                    <TableCell align="right">{item.consoleName.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}</TableCell>
                                    <TableCell align="right">{item.gameCondition}</TableCell>
                                    <TableCell align="right">{(() => {
                                        switch (item.gameCondition) {
                                            case 'Loose':
                                                return `$${item.loosePrice}`;
                                            case 'Cib':
                                                return `$${item.completePrice}`;
                                            case 'New':
                                                return `$${item.newPrice}`;
                                            default:
                                                return 'N/A';
                                        }
                                    })()}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button sx={{ backgroundColor: "red" }} onClick={() => handleButtonClick(item.gameId, item.gameCondition)} variant="contained">Remove from collection</Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}