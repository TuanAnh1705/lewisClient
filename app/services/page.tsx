import Banner from "./components/banner";
import ImgBottom from "./components/imgBottom";
import OurServices from "./components/ourServices";
import WhyChooseUs from "./components/whyChooseUs";
import YourJourney from "./components/yourJourney";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-white">
            <Banner />
            <OurServices/>
            <YourJourney/>
            <WhyChooseUs />
            <ImgBottom/>
        </div>
    );
}