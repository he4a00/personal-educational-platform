import Classes from "../components/Classes";
import CreateFeedbackForm from "../components/CreateFeedbackForm";
import Hero from "../components/Hero";
import HowItWork from "../components/HowItWork";
import Services from "../components/Services";

export default function Home() {
  return (
    <main>
      <Hero />
      <HowItWork />
      <Services />
      <Classes />
    </main>
  );
}
