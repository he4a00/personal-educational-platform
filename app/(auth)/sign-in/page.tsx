"use client";

import { useUserContext } from "@/app/context/UserContext";
import { Button } from "@/components/ui/button";
import { Boxes } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";

const SignIn = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, user }: any = useUserContext();

  const handleLogin = () => {
    login(phoneNumber, password);
  };

  useEffect(() => {
    if (user) {
      redirect("/");
    }
  }, [user]);

  return (
    <div
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-vector/realistic-math-chalkboard-background_23-2148169719.jpg?t=st=1720534960~exp=1720538560~hmac=2fbe269e90af3367bc7590c85677615480a6882869566e87e9085455dd0e7576&w=826')",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="w-full h-full min-h-screen flex items-center justify-center bg"
    >
      <div className="mx-auto">
        <div className="flex justify-center px-6 my-12">
          <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
            <div className="text-black px-6 pt-6">
              <div className="flex gap-3 items-center">
                <Boxes className="text-blue-600" />
                <h2 className="text-black text-2xl font-bold">تسجيل الدخول</h2>
              </div>
              <p>قم بتسجيل الدخول عن طريق البريد الالكتروني وكلمة السر</p>
            </div>
            <form className="w-full px-8 pt-6 pb-8 mb-4 bg-white rounded">
              <div className="mb-4">
                <div className="md:ml-2">
                  <label className="block mb-2 text-sm font-bold text-gray-700">
                    رقم الهاتف
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="01003030303"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
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
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none"
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
                  onClick={handleLogin}
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
