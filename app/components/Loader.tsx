import logo from "@/app/images/logo.png";
import Image from "next/image";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <span className="animate-spin relative flex h-20 w-20 rounded-sm bg-purple-600 opacity-75"></span>
    </div>
  );
};

export default Loader;
