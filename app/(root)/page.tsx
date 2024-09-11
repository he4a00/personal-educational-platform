import Hero from "../components/Home/Hero";
import Services from "../components/Home/Services";
import Ads from "../components/Home/Ads";
import Classes from "../components/Home/Classes";

export default function Home() {
  return (
    <main>
      {/* <div className="relative w-full overflow-hidden mt-3 bg-black text-yellow-300 h-14">
        <div className="absolute top-0 left-0 h-full animate-moving-text flex items-center whitespace-nowrap">
          <h1 className="text-center">
            انضم إلينا اليوم واستفد من منصتنا التعليمية المميزة!
          </h1>
        </div>
      </div> */}

      <Hero />
      <Ads />
      <Services />
      <Classes />
    </main>
  );
}
