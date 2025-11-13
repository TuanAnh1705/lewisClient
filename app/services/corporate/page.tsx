import Banner from "./components/banner";
import ImgBottom from "./components/imgBottom";
import TailoredSection from "./components/tailored";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-white">
            <Banner />
            <TailoredSection/>
            <ImgBottom/>
        </div>
    );
}