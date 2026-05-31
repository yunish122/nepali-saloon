import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CTA from "../components/home/components/CTA";
import Feature from "../components/home/components/Feature";
import HeroContent from "../components/home/components/Hero-content";

function Homepage() {

    return (
        <main className="space-y-15 ">
            <Navbar />
            <HeroContent></HeroContent>
            <Feature></Feature>
            <CTA></CTA>
            <Footer></Footer>
        </main>

    )
}


export default Homepage;