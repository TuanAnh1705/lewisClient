import FinancialExpertise from "./components/financial";
import GuidingPrinciples from "./components/GuidingPrinciples";
import WhyChooseUs from "./components/whyChooseUs";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
        <FinancialExpertise/>
        <GuidingPrinciples/>
        <WhyChooseUs/>
    </div>
  );
}