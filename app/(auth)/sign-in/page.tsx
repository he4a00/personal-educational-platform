"use client";

import { useUserContext } from "@/app/context/UserContext";
import { Button } from "@/components/ui/button";
import { Boxes } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, loading, user }: any = useUserContext();

  const handleLogin = () => {
    login(email, password);
  };

  if (user) {
    redirect("/");
  }

  return (
    <div
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-photo/book-with-green-board-background_1150-3837.jpg?w=1380&t=st=1703534531~exp=1703535131~hmac=a4c2779a4acf7e1c0139775a8ee7d08903cbea8e0787d24492f0ff1aca1c1687')",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="w-full h-full min-h-screen flex items-center justify-center bg"
    >
      <div className="container mx-auto">
        <div className="flex justify-center px-6 my-12">
          <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
            <div className="text-black px-6 pt-6">
              <div className="flex gap-3 items-center ">
                <Boxes className="text-blue-600" />
                <h2 className="text-black  text-2xl font-bold">تسجيل الدخول</h2>
              </div>
              <p>قم بتسجيل الدخول عن طريق البريد الالكتروني وكلمة السر</p>
            </div>
            <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
              <div className="mb-4">
                <div className="md:ml-2">
                  <label className="block mb-2 text-sm font-bold text-gray-700">
                    البريد الالكتروني
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="test13@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-4 md:mr-2 md:mb-0">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="password"
                  >
                    كلمة السر
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border  rounded shadow appearance-none focus:outline-none"
                    type="password"
                    placeholder="******************"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <p className="text-xs italic text-red-500">ادخل كلمة السر</p>
                </div>
              </div>

              <div className="mb-6 text-center">
                <Button
                  type="button"
                  className="w-full"
                  disabled={loading}
                  variant="default"
                  onClick={() => handleLogin()}
                >
                  تسجيل الدخول
                </Button>
              </div>
              <hr className="mb-6 border-t" />

              <div className="text-center flex flex-col gap-5">
                <Link className="text-black" href="/sign-up">
                  <Button className="w-full" variant="outline">
                    انشىء حسابك الان
                  </Button>
                </Link>
                <Link className="text-black" href="/">
                  <Button className="w-full" variant="outline">
                    الصفحة الرئيسية
                  </Button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
