"use client";

import { useUserContext } from "@/app/context/UserContext";
import api from "@/app/utils/api";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { Boxes } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";

const SignUp = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [parentPhoneNumber, setParentPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [eduyear, setEduYear] = useState("");

  const { toast }: any = useToast();

  const { mutate: signUp, isPending } = useMutation({
    mutationFn: async () => {
      try {
        const { data } = await api.post(`/users/register`, {
          firstname,
          lastname,
          phoneNumber,
          parentPhoneNumber,
          password,
          eduyear,
        });
        return data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (data) => {
      toast({
        title: "تم اضافتك للمنصة ، برجاء تسجيل الدخول",
        variant: "default",
      });
      redirect("/sign-in");
    },
    onError: (err: any) => {
      if (err.response.status === 409) {
        toast({
          title: "هناك مستخدم بالفعل لهذه البيانات",
          variant: "destructive",
        });
      }
      if (err.response.status === 404) {
        toast({
          title: "تأكد من كتابتك لجميع البيانات",
          variant: "destructive",
        });
      }
    },
  });

  const { user }: any = useUserContext();

  if (user) {
    redirect("/");
  }
  return (
    <div
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-vector/realistic-math-chalkboard-background_23-2148169719.jpg?t=st=1720534960~exp=1720538560~hmac=2fbe269e90af3367bc7590c85677615480a6882869566e87e9085455dd0e7576&w=826')",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="w-full h-full flex items-center justify-center p-4 md:p-12 overflow-hidden"
    >
      <div className="md:container mx-auto">
        <div className="flex justify-center md:px-6 my-12">
          <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none shadow-lg">
            <div className="text-black px-6 pt-6">
              <div className="flex gap-3 items-center">
                <Boxes className="text-blue-600" />
                <h2 className="text-black text-2xl font-bold">
                  {" "}
                  انشئ حسابك الان
                </h2>
              </div>
              <p>قم بأنشاء حسابك الان حتي تستطيع الدخول الي المنصة</p>
            </div>
            <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
              <div className="mb-4 flex flex-wrap -mx-2">
                <div className="w-full md:w-1/2">
                  <label className="block mb-2 text-sm font-bold text-gray-700">
                    الاسم الاول
                  </label>
                  <input
                    required
                    className="w-full md:p-4 p-2 mb-2 md:mb-3 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="الاسم الاول"
                    value={firstname}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="w-full md:w-1/2 px-2">
                  <label className="block mb-2 text-sm font-bold text-gray-700">
                    الاسم الاخير
                  </label>
                  <input
                    required
                    className="w-full md:p-4 p-2 md:mb-3 mb-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="الاسم الاخير"
                    value={lastname}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="w-full md:w-1/2 px-2">
                  <label className="block mb-2 text-sm font-bold text-gray-700">
                    رقم الهاتف
                  </label>
                  <input
                    required
                    className="w-full md:p-4 mb-2 p-2 md:mb-3 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="رقم الهاتف"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="w-full md:w-1/2 px-2">
                  <label className="block mb-2 text-sm font-bold text-gray-700">
                    رقم ولي الامر
                  </label>
                  <input
                    required
                    className="w-full md:p-4 p-2 mb-2 md:mb-3 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="رقم ولي الامر"
                    value={parentPhoneNumber}
                    onChange={(e) => setParentPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="w-full md:w-1/2 px-2">
                  <label className="block mb-2 text-sm font-bold text-gray-700">
                    الصف الدراسي
                  </label>
                  <select
                    required
                    value={eduyear}
                    onChange={(e) => setEduYear(e.target.value)}
                    className="w-full text-black border p-3 mb-2"
                  >
                    <option value="" disabled>
                      اختر الصف الدراسي
                    </option>
                    <option value="الصف الاول الاعدادي">
                      الصف الاول الاعدادي
                    </option>
                    <option value="الصف الثاني الاعدادي">
                      الصف الثاني الاعدادي
                    </option>
                    <option value="الصف الثالث الاعدادي">
                      الصف الثالث الاعدادي
                    </option>
                  </select>
                </div>
                <div className="w-full md:w-1/2 px-2">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="password"
                  >
                    كلمة السر
                  </label>
                  <input
                    required
                    className="w-full md:p-4 p-2 md:mb-3 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                    type="password"
                    placeholder="كلمة السر"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-6 text-center">
                <Button
                  type="button"
                  className="w-full"
                  variant="default"
                  onClick={() => signUp()}
                  disabled={isPending}
                >
                  انشئ الحساب
                </Button>
              </div>
              <hr className="mb-6 border-t" />

              <div className="text-center flex flex-col gap-5">
                <Link className="text-black" href="/sign-in">
                  <Button className="w-full" variant="outline">
                    تسجيل الدخول
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

export default SignUp;
