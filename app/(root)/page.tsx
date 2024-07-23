import Classes from "../components/Classes";
import Hero from "../components/Hero";
import HowItWork from "../components/HowItWork";
import Services from "../components/Services";

export default function Home() {
  return (
    <main>
      <div className="relative w-full overflow-hidden mt-3 bg-black text-yellow-300 h-14">
        <div className="absolute top-0 left-0 h-full animate-moving-text flex items-center whitespace-nowrap">
          <h1 className="text-center">
            تجريبي : تم اضافة نظام اللايك علي جميع الدروس
          </h1>
        </div>
      </div>

      <Hero />
      <HowItWork />
      <Services />
      <Classes />
    </main>
  );
}
