import Button from '../../app/components/Button';
import Typography from '../../app/components/Typography';
import ProductHeroLayout from './ProductHeroLayout';
import backgroundImage from '../../app/assets/images/homePageBodyImages/videogamescollage.png';

export default function ProductHero() {
    return (
        <ProductHeroLayout
            sxBackground={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundColor: '#7fc7d9', // Average color of the background image.
                backgroundPosition: 'center',
            }}
        >
            {/* Increase the network loading priority of the background image. */}
            <img
                style={{ display: 'none' }}
                src={backgroundImage}
                alt="increase priority"
            />

            <Typography color="inherit" align="center" variant="h3" marked="center">
                TRACK AND VALUE YOUR GAME COLLECTION
            </Typography>
            <Typography
                color="inherit"
                align="center"
                variant="h5"
                sx={{ mb: 4, mt: { xs: 4, sm: 10 } }}
            >
                Stay on top of the market with the latest prices and trends for your favorite games.
            </Typography>
            <Button
                color="secondary"
                variant="contained"
                size="large"
                component="a"
                href="/premium-themes/onepirate/sign-up/"
                sx={{ minWidth: 200 }}
            >
                START TRACKING
            </Button>
            <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
                Join our community and never miss out on important updates and deals for your game collection.
            </Typography>
        </ProductHeroLayout>
    );
}