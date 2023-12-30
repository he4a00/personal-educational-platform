import Image from "next/image";
import facebook from "../images/facebook.svg";
import linkedin from "../images/linkedin.svg";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="flex flex-col items-center pt-36 bg-gray-300">
      <div className="flex flex-col gap-5 p-2 items-center justify-center w-full">
        <div className="flex flex-row">
          <Link href="https://www.facebook.com/ahmmedhashem0">
            <Image src={facebook} width={50} height={50} alt="" />
          </Link>
          <Link href="https://www.facebook.com/ahmmedhashem0">
            <Image src={linkedin} width={70} height={70} alt="" />
          </Link>
        </div>

        <div>
          <h3 className="font-mono text-xl font-semibold">
            هذه المنصة هدفها الاول والوحيد هو مساعددة الطلاب علي تكرار الدروس
            بطريقة مجانية{" "}
          </h3>
          <h6>الحقوق محفوظة</h6>
        </div>
      </div>
    </div>
  );
};

export default Footer;
