import Classes from "../components/Classes";
import Hero from "../components/Hero";
import HowItWork from "../components/HowItWork";
import Services from "../components/Services";

export default function Home() {
  return (
    <main>
      <div className="w-full flex items-center justify-center mt-3 bg-black text-yellow-300 h-14">
        <div className="absolute h-2 animate-moving-text bg-black flex items-center w-full">
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
