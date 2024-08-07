"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "../utils/api";
import { classes } from "../constants";
import { useToast } from "@/components/ui/use-toast";
import { ExamValidation } from "../utils/validators/examValidator";

const AddExamForm = () => {
  const form = useForm({
    resolver: zodResolver(ExamValidation),
    defaultValues: {
      title: "",
      eduyear: "",
      section: "",
      maxScore: 15,
      durationInMinutes: 30,
    },
  });

  const router = useRouter();
  const { toast } = useToast();

  const { mutate: createLesson, isPending } = useMutation({
    mutationFn: async (formData: any) => {
      try {
        const { data } = await api.post("/exam", formData);
        return data;
      } catch (error: any) {
        throw new Error(error);
      }
    },
    onSuccess: (data) => {
      router.push(`/dashboard/exams/add-exam/${data._id}`);
    },
    onError: (err: any) => {
      if (err.response.status === 403) {
        toast({
          title: "غير مسموح لك بأنشاء الدرس",
          description: "رجاء تواصل مع استاذك.",
          variant: "destructive",
        });
      }
    },
  });

  function onSubmit(values: z.infer<typeof ExamValidation>) {
    createLesson(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-6 w-full bg-[#f9fafb] p-8 rounded-lg shadow-md"
      >
        <div className="flex flex-col gap-5">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="font-semibold text-gray-700">
                  عنوان الامتحان
                </FormLabel>
                <FormControl className="w-full">
                  <Input
                    className="w-full border border-gray-300 bg-white text-gray-900 rounded-md focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="section"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="font-semibold text-gray-700">
                  القسم
                </FormLabel>
                <FormControl className="w-full">
                  <Input
                    className="w-full border border-gray-300 bg-white text-gray-900 rounded-md focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maxScore"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="font-semibold text-gray-700">
                  عدد الاسئلة
                </FormLabel>
                <FormControl className="w-full">
                  <Input
                    className="w-full border border-gray-300 bg-white text-gray-900 rounded-md focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="durationInMinutes"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="font-semibold text-gray-700">
                  وقت الامتحان
                </FormLabel>
                <FormControl className="w-full">
                  <Input
                    className="w-full border border-gray-300 bg-white text-gray-900 rounded-md focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    {...field}
                    placeholder="الوقت بالدقيقة"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="eduyear"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <select
                    className="border border-gray-300 bg-white text-gray-900 rounded-md p-2 pr-8 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    {...field}
                  >
                    <option value="" disabled>
                      اختر الصف
                    </option>
                    {classes.map((cla, index) => (
                      <option key={index} value={cla.name}>
                        {cla.name}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button variant="outline" disabled={isPending} type="submit">
          اضافة
        </Button>
        <Link
          className="text-center font-semibold text-xl text-blue-600 hover:underline"
          href="/dashboard"
        >
          العودة للصفحة الرئيسية
        </Link>
      </form>
    </Form>
  );
};

export default AddExamForm;
