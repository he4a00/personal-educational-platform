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
  const [email, setEmail] = useState("");
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
          email,
          password,
          eduyear,
        });
        return data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (data) => {
      console.log(data);
      redirect("/");
    },
    onError: (err: any) => {
      console.log(err.response.status);

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
          "url('https://img.freepik.com/free-photo/book-with-green-board-background_1150-3837.jpg?w=1380&t=st=1703534531~exp=1703535131~hmac=a4c2779a4acf7e1c0139775a8ee7d08903cbea8e0787d24492f0ff1aca1c1687')",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="w-full h-full flex items-center justify-center overflow-hidden"
    >
      <div className="container mx-auto">
        <div className="flex justify-center md:px-6 my-12">
          <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
            <div className="text-black px-6 pt-6">
              <div className="flex gap-3 items-center ">
                <Boxes className="text-blue-600" />
                <h2 className="text-black  text-2xl font-bold">
                  {" "}
                  انشئ حسابك الان
                </h2>
              </div>
              <p>قم بأنشاء حسابك الان حتي تستطيع الدخول الي المنصة</p>
            </div>
            <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
              <div className="mb-4">
                <div className="md:ml-2">
                  <label className="block mb-2 text-sm font-bold text-gray-700">
                    الاسم الاول
                  </label>
                  <input
                    required
                    className="w-full p-4 mb-3 text-sm leading-tight text-gray-700 border rounded  appearance-none focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="احمد"
                    value={firstname}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="md:ml-2">
                  <label className="block mb-2 text-sm font-bold text-gray-700">
                    الاسم الاخير
                  </label>
                  <input
                    required
                    className="w-full p-4 mb-3 text-sm leading-tight text-gray-700 border rounded  appearance-none focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="هاشم"
                    value={lastname}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="md:ml-2">
                  <label className="block mb-2 text-sm font-bold text-gray-700">
                    رقم الهاتف
                  </label>
                  <input
                    required
                    className="w-full p-4 mb-3 text-sm leading-tight text-gray-700 border rounded  appearance-none focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="01001000101"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="md:ml-2">
                  <label className="block mb-2 text-sm font-bold text-gray-700">
                    البريد الالكتروني
                  </label>
                  <input
                    required
                    className="w-full p-4 mb-3 text-sm leading-tight text-gray-700 border rounded  appearance-none focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="test13@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="md:ml-2">
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
                <div className="mb-4 md:mr-2 md:mb-0">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="password"
                  >
                    كلمة السر
                  </label>
                  <input
                    required
                    className="w-full p-4 mb-3 text-sm leading-tight text-gray-700 border  rounded  appearance-none focus:outline-none"
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
                  variant="default"
                  onClick={() => signUp()}
                  disabled={isPending}
                >
                  انشئ الحساب
                </Button>
              </div>
              <hr className="mb-6 border-t" />

              <div className="text-center">
                <Link className="text-black" href="/sign-in">
                  <Button className="w-full" variant="outline">
                    تسجيل الدخول
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
