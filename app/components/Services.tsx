import Image from "next/image";
import arrowSVG from "../images/arrow.svg";
import book from "../images/book.svg";
import repeat from "../images/repeat.svg";
import pen from "../images/pen.svg";

const Services = () => {
  return (
    <>
      <svg
        className="opacity-80"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#d1d5db"
          fill-opacity="1"
          d="M0,160L40,176C80,192,160,224,240,208C320,192,400,128,480,122.7C560,117,640,171,720,197.3C800,224,880,224,960,218.7C1040,213,1120,203,1200,192C1280,181,1360,171,1400,165.3L1440,160L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
        ></path>
      </svg>
      <div className=" p-30 pb-30 w-full bg-gray-300 opacity-80">
        <div
          className="flex flex-col items-center justify-center
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
    </>
  );
};

export default Services;
