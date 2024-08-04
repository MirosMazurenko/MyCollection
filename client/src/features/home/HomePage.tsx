import NeedHelp from "./NeedHelp";
import ProductCategories from "./ProductCategories";
import ProductHero from "./ProductHero";
import ProductValues from "./ProductValues";

export default function HomePage() {
    return (
        <>
            <ProductHero />
            <ProductValues />
            <ProductCategories />
            <NeedHelp />
        </>
    )
}

