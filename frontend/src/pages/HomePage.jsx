import HeroSection from "../components/layout/HeroSection";
import TopicsSection from "../components/sections/TopicsSection";
import Slider from "../components/sections/Slider";
import LatestCampaigns from "../components/sections/LatestCampaigns";

export default function HomePage() {
    return (
        <>
            <HeroSection />
            <Slider />
            <TopicsSection />
            <LatestCampaigns />
        </>
    )
}