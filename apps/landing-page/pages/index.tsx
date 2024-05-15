import Navbar from "../components/navigation/Navbar";
import HeroSection from "../components/page-sections/HeroSection";
import PopularNow from "../components/page-sections/PopularNow";
import AllGames from "../components/page-sections/AllGames";
import Footer from "../components/navigation/Footer";

export function Index() {
  return (
    <div className="flex flex-col ">
      <Navbar />
      <HeroSection />
      <PopularNow />
      <AllGames />
      <div className="flex py-16 bg-zinc-900">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-2 gap-8">
          <div className="flex col-span-1 flex-col space-y-8 text-zinc-200">
            <p className="text-white font-semibold text-3xl">
              THE STORY OF CHIMOMBE
            </p>
            <p>
              Oral tradition holds that Chimombe came from Kankhoma which is
              beyond Lusaka due to a family dispute with his father. Further,
              Chimombe was a magician and rainmaker of some repute and was an
              important person to Kalindawalo. Whilst Chimombe’s descendants
              deny being a Nsenga, they were a very small group of Va-Soli (or
              Va-Sorl), as they are referred to in Rhodesia. They held a
              position of some importance under Kalindawalo who were later
              scattered by Ngoni incursions early in the nineteenth century. The
              Va-Sori are stated to have formed a branch of the Luba migration
              that came from the Lunda-Luba Empire of the Congo, establishing
              them in Zambia around 1600.
            </p>
            <p>
              Chimombe moved south and set himself up at Masokoti on the Chewore
              River at the foot of the escarpment. The Korekore leader
              Nyamapfeka was determined to …
            </p>
            <div className="flex">
              <div className="flex bg-primary-original text-sm rounded-full px-6 py-2 text-white font-medium uppercase">
                Learn More
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Index;
