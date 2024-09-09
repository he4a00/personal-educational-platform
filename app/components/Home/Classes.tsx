import Image from "next/image";
import Link from "next/link";
import arrowSVG from "../../images/arrow.svg";
import algebra from "../../images/algebra.jpg";
import bag from "../../images/bag.svg";
import { classesInfo } from "@/app/constants";

const Classes = () => {
  return (
    <>
      <div className="p-10 pt-40">
        <div
          className="flex flex-col items-center justify-center p-10
      "
        >
          <h1 className="text-5xl font-bold text-gray-900 text-center p-2">
            الصفوف الدراسية
          </h1>
          <Image className="p-2" src={bag} alt="" width={150} height={150} />
          <Image
            className="p-2 animate-bounce"
            src={arrowSVG}
            alt=""
            width={40}
            height={40}
          />
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4 p-3 gap-x-16 rounded-lg">
          {classesInfo.map((classItem, index) => (
            <div key={index} className="flex flex-col items-center">
              <Image
                alt=""
                width={500}
                height={300}
                src={algebra}
                className=" transition-all duration-500 hover:rotate-2 rounded-lg"
              />
              <div className="flex flex-col items-center bg-white opacity-90 p-5 shadow-lg w-[400px] relative bottom-5 rounded-lg">
                <Link
                  href={`/lessons/${classItem.name}`}
                  className="text-xl font-semibold p-2"
                >
                  {classItem.name}
                </Link>
                <hr />
                <p className="p-2">{classItem.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Classes;
