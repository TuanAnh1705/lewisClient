import Banner from "./components/banner";
import { GetFreeConsultingSection } from "./components/form";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-white">
            <Banner />
            <GetFreeConsultingSection/>
        </div>
    );
}