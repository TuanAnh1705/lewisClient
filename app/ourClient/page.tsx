import Banner from "./components/banner";
import BottomSection from "./components/bottom";
import ImgBottom from "./components/imgBottom";
import TestimonialSection from "./components/testimonial";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-white">
            <Banner />
            <TestimonialSection/>
            <BottomSection/>
            <ImgBottom/>
        </div>
    );
}