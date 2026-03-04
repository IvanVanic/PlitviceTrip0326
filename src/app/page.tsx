import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import Itinerary from "@/components/Itinerary";
import Accommodation from "@/components/Accommodation";
import ParkGuide from "@/components/ParkGuide";
import DrivingLogistics from "@/components/DrivingLogistics";
import FoodGuide from "@/components/FoodGuide";
import Activities from "@/components/Activities";
import BudgetCalculator from "@/components/BudgetCalculator";
import WeatherPacking from "@/components/WeatherPacking";
import GearShopping from "@/components/GearShopping";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Navigation />
      <Itinerary />
      <Accommodation />
      <ParkGuide />
      <DrivingLogistics />
      <FoodGuide />
      <Activities />
      <BudgetCalculator />
      <WeatherPacking />
      <GearShopping />
      <Footer />
    </main>
  );
}
