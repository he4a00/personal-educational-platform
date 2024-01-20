import Classes from "../components/Classes";
import CreateFeedbackForm from "../components/CreateFeedbackForm";
import Hero from "../components/Hero";
import Services from "../components/Services";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Classes />
      <div>
        <h3 className="text-2xl text-center p-6 font-bold">
          تقديم اقتراح او تبليغ عن مشكلة في المنصة
        </h3>
        <CreateFeedbackForm />
      </div>
    </main>
  );
}
