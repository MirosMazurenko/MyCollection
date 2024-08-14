import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '../../app/components/Typography';
import productCurvyLines from '../../app/assets/images/homePageBodyImages/productCurvyLines.png';
import Checklist from '../../app/assets/images/homePageBodyImages/Checklist.jpg';
import Dollar from '../../app/assets/images/homePageBodyImages/dollar.png';
import CIB from '../../app/assets/images/homePageBodyImages/CIB.png';

const item: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

function ProductValues() {
  return (
    <Box
      component="section"
      sx={{ display: 'flex', overflow: 'hidden', bgcolor: 'secondary.light' }}
    >
      <Container sx={{ mt: 15, mb: 30, display: 'flex', position: 'relative' }}>
        <Box
          component="img"
          src={productCurvyLines}
          alt="curvy lines"
          sx={{ pointerEvents: 'none', position: 'absolute', top: -180 }}
        />
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src={Checklist}
                alt="checklist"
                sx={{ height: 55 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
                TRACK YOUR COLLECTION
              </Typography>
              <Typography variant="h5">
                {
                  'Keep an eye on your cherished video games, from the latest releases to rare classics. Ensure you never lose track of your prized possessions.'
                }

              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src={Dollar}
                alt="dollar"
                sx={{ height: 55 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
                DISCOVER GAME VALUES
              </Typography>
              <Typography variant="h5">
                {
                  "Uncover the true worth of each game in your collection. Find out how much your treasures are worth in today's market."
                }
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src={CIB}
                alt="clock"
                sx={{ height: 45, mt: 1 }}
              />
              <Typography variant="h6" sx={{ mb: 2, mt: 5 }}>
                CHOOSE YOUR GAME CONDITION
              </Typography>
              <Typography variant="h5">
                {'Decide the best condition for your collection. Loose games offer affordability and easy playability. Complete in Box (CIB) games provide a sense of nostalgia with original packaging and manuals. New games ensure pristine condition and maximum value.'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ProductValues;