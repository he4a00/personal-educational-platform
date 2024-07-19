import Image from "next/image";
import arrowSVG from "../images/arrow.svg";
import book from "../images/book.svg";
import repeat from "../images/repeat.svg";
import pen from "../images/pen.svg";

const Services = () => {
  return (
    <div className="pt-40">
      <div className="w-full ">
        <div
          className="flex flex-col items-center justify-center pb-10
      "
        >
          <h1 className="text-4xl font-semibold text-gray-900 text-center p-2">
            ما الذي ستقدمه المنصة لك ؟
          </h1>
          <Image
            className="p-2 animate-bounce"
            src={arrowSVG}
            alt=""
            width={40}
            height={40}
          />
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4 p-3">
          <div className="flex flex-col justify-center items-center">
            <Image src={book} alt="" width={150} height={150} />
            <h1 className="text-2xl font-bold text-black p-5 bg-yellow-400 border-4 rounded-md opacity-70">
              امتحانات مستمرة علي كل درس
            </h1>
          </div>
          <div className="flex flex-col justify-center items-center">
            <Image
              src={repeat}
              alt=""
              width={150}
              height={150}
              className="animate-spin"
            />
            <h1 className="text-2xl font-semibold text-black p-5 bg-yellow-400 border-4 rounded-md opacity-80">
              مراجعة الدروس بطريقة مستمرة
            </h1>
          </div>
          <div className="flex flex-col justify-center items-center">
            <Image
              className="hover:animate-pulse"
              src={pen}
              alt=""
              width={150}
              height={150}
            />
            <h1 className="text-2xl font-semibold text-black p-5 bg-yellow-400 border-4 rounded-md opacity-70">
              واجبات مستمرة علي كل درس
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
