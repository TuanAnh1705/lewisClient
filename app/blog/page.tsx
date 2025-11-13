import Banner from "./components/banner";
import BlogList from "./components/blogList";
import ImgBottom from "./components/imgBottom";


export default function HomePage() {
    return (
        <div className="min-h-screen bg-white">
            <Banner />
            <BlogList/>
            <ImgBottom/>
        </div>
    );
}