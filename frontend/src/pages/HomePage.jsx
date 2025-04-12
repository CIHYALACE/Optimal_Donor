import HeroSection from "../components/HeroSection";
import TopicsSection from "../components/TopicsSection";
import Slider from "../components/Slider";
import LatestCampaigns from "../components/LatestCampaigns";

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