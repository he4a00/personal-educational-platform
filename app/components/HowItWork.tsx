import { Button } from "@/components/ui/button";
import Link from "next/link";

const HowItWork = () => {
  return (
    <div className="relative flex flex-col items-center w-full p-10 bg-white shadow-md rounded-lg mt-10">
      <span className="absolute right-0 top-0 m-4 px-3 py-1 bg-red-600 text-white text-sm font-bold rounded-full">
        مهم جدا!
      </span>
      <div className="flex flex-col items-center container">
        <h1 className="text-4xl font-bold p-5">كيف تعمل المنصة؟</h1>
        <p className="text-xl font-semibold p-5 text-center">
          تعرف على كيفية عمل منصتنا من خلال هذا المقال المهم، حيث يوضح لك المسار
          الطبيعي للاستخدام وطريقة الدفع الخاصة بالدروس المدفوعة.
        </p>
        <Link className="p-5" href="/how-it-work">
          <Button className="text-lg font-semibold p-3 px-6 bg-yellow-500 text-white rounded-md shadow-md hover:bg-yellow-600 transition duration-300">
            ابدأ الآن
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HowItWork;
