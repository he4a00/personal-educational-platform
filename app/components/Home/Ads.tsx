import { Users, Rocket, Book, Trophy } from "lucide-react";

export default function Ads() {
  return (
    <section className="w-full py-12 bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            انضم الي مجتمعنا التعليمي في عالم الرياضيات!
          </h2>
          <div className="bg-white/20 backdrop-blur-lg rounded-lg p-8 shadow-lg transform hover:scale-105 transition-transform duration-300">
            <p className="text-6xl font-extrabold mb-4 animate-pulse">80+</p>
            <p className="text-2xl mb-8">طلاب رائعون في تزايد مستمر!</p>
            <div className="flex  md:flex-row justify-evenly gap-6">
              <div className="flex flex-col items-center">
                <Rocket className="w-12 h-12 mb-2" />
                <p className="text-sm">تعلم سريع الايقاع</p>
              </div>
              <div className="flex flex-col items-center">
                <Book className="w-12 h-12 mb-2" />
                <p className="text-sm">موارد شاملة</p>
              </div>
              <div className="flex flex-col items-center">
                <Trophy className="w-12 h-12 mb-2" />
                <p className="text-sm">ارتقِ بعقلك</p>
              </div>
            </div>
          </div>
          <p className="mt-8 text-lg animate-bounce">
            لا تفوت هذه الفرصة الرائعة!
          </p>
        </div>
      </div>
    </section>
  );
}
