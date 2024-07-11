import Image from "next/image";
import facebook from "../images/facebook.svg";
import linkedin from "../images/linkedin.svg";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="flex flex-col items-center pt-10 bg-gray-300">
      <div className="flex flex-col items-center p-3">
        <h1 className="text-xl p-2">
          تم تطويرها بواسطة <span className="font-semibold">أحمد هاشم</span>
        </h1>
        <h2>جميع الحقوق محفوظة</h2>
      </div>
    </div>
  );
};

export default Footer;
