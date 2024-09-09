import { Button } from "@/components/ui/button";
import { BookOpen, BrainCircuit, Rocket } from "lucide-react";

export default function Services() {
  return (
    <div className="w-full mt-44 mx-auto p-6 bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 shadow-lg overflow-hidden relative">
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0iI2ZmZiI+PC9yZWN0Pgo8cmVjdCB3aWR0aD0iNDIuNDIiIGhlaWdodD0iNDIuNDIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMwLDMwKSByb3RhdGUoNDUpIiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjAuMDUiPjwvcmVjdD4KPC9zdmc+')]"></div>
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-white drop-shadow-lg">
        🚀 ارتقِ بتعلمك! 🧠
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureCard
          icon={<BookOpen className="w-12 h-12" />}
          title="واجبات متميزة بعد كل درس"
          description="تغلب على التحديات بعد كل درس!"
          bgColor="from-yellow-300 to-orange-400"
          textColor="text-yellow-900"
        />
        <FeatureCard
          icon={<BrainCircuit className="w-12 h-12" />}
          title="مراجعات متميزة"
          description="نمي عقلك مع مراجعات مميزة!"
          bgColor="from-blue-300 to-cyan-400"
          textColor="text-blue-900"
        />
        <FeatureCard
          icon={<Rocket className="w-12 h-12" />}
          title="ارتقِ بقوة الامتحانات"
          description="ارتقِ بمهاراتك مع اختبارات مبنية على الدروس!"
          bgColor="from-green-300 to-emerald-400"
          textColor="text-green-900"
        />
      </div>
      <Button className="mt-8 bg-white text-purple-600 font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 mx-auto block">
        ابدأ رحلتك الان!
      </Button>
    </div>
  );
}

function FeatureCard({ icon, title, description, bgColor, textColor }: any) {
  return (
    <div
      className={`bg-gradient-to-br ${bgColor} rounded-xl p-6 shadow-md transition-all duration-300 hover:scale-105 hover:rotate-1`}
    >
      <div className="flex flex-col items-center">
        <div className="mb-4 text-white">{icon}</div>
        <h2 className={`${textColor} text-xl font-bold text-center mb-2`}>
          {title}
        </h2>
        <p className={`${textColor} text-sm text-center`}>{description}</p>
      </div>
    </div>
  );
}
