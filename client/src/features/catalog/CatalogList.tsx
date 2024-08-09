import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box, Button } from "@mui/material";
import { Game } from "../../app/models/game";
import theme from "../../app/theme/theme";

interface Props {
    games: Game[];
}

export default function CatalogList({ games }: Props) {

    return (
        <Box sx={{ m: 2 }}>
            <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>Game</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>Game Console</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>Loose price</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>CIB price</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>New price</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {games.map((game) => (
                            <TableRow
                                key={game.id}
                                sx={{
                                    '&:hover': { backgroundColor: theme.palette.action.selected },
                                }}
                            >
                                <TableCell component="th" scope="row">{game.name}</TableCell>
                                <TableCell align="right">{game.consoleName.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}</TableCell>
                                <TableCell align="right">${game.loosePrice}</TableCell>
                                <TableCell align="right">${game.completePrice}</TableCell>
                                <TableCell align="right">${game.newPrice}</TableCell>
                                <TableCell align="right">
                                    <Button variant="contained">add to collection</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}