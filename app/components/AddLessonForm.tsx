"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LessonValidation } from "@/app/utils/validators/lessonValidator";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "../utils/api";
import { classes } from "../constants";
import { useToast } from "@/components/ui/use-toast";

const CreateSummaryForm = ({ student }: any) => {
  const form = useForm({
    resolver: zodResolver(LessonValidation),
    defaultValues: {
      title: "",
      unit: "",
      classroom: "",
      videoURL: "",
      price: "",
      isPaid: false,
      desc: "",
      section: "",
    },
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const router = useRouter();
  const { toast } = useToast();

  const { mutate: createLesson, isPending } = useMutation({
    mutationFn: async (formData: any) => {
      try {
        const { data } = await api.post("/lessons", formData);
        return data;
      } catch (error: any) {
        throw new Error(error);
      }
    },
    onSuccess: (data) => {
      router.push("/");
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

  function onSubmit(values: z.infer<typeof LessonValidation>) {
    const formData = new FormData();
    formData.append("videoURL", selectedFile as Blob);
    formData.append("title", values.title);
    formData.append("unit", values.unit);
    formData.append("isPaid", String(values.isPaid));
    formData.append("desc", values.desc);
    formData.append("price", values.price);
    formData.append("classroom", values.classroom);
    formData.append("section", values.classroom);
    createLesson(formData);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-6 w-full bg-[#f9fafb] p-8 rounded-lg shadow-md"
      >
        <div className="flex flex-row gap-4 w-full">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="font-semibold text-gray-700">
                  عنوان الدرس
                </FormLabel>
                <FormControl>
                  <Input
                    className="border border-gray-300 bg-white text-gray-900 rounded-md focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="unit"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="font-semibold text-gray-700">
                  الوحدة
                </FormLabel>
                <FormControl>
                  <Input
                    className="border border-gray-300 bg-white text-gray-900 rounded-md focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-row gap-4 items-center justify-center">
          <FormField
            control={form.control}
            name="desc"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="font-semibold text-gray-700">
                  الوصف
                </FormLabel>
                <FormControl>
                  <Input
                    className="border border-gray-300 bg-white text-gray-900 rounded-md focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="classroom"
            render={({ field }) => (
              <FormItem className="flex-1">
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

        <div className="flex flex-row gap-4 w-full">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="font-semibold text-gray-700">
                  السعر
                </FormLabel>
                <FormControl>
                  <Input
                    className="border border-gray-300 bg-white text-gray-900 rounded-md focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
              <FormItem className="flex-1">
                <FormLabel className="font-semibold text-gray-700">
                  القسم
                </FormLabel>
                <FormControl>
                  <Input
                    className="border border-gray-300 bg-white text-gray-900 rounded-md focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="videoURL"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-gray-700">
                اضافة الفيديو
              </FormLabel>
              <FormControl>
                <Input
                  type="file"
                  onChange={handleFileChange}
                  value={field.value}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                  className="border border-gray-300 bg-white text-gray-900 p-2 rounded-md focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                />
              </FormControl>
              {selectedFile && (
                <span className="text-gray-900">{selectedFile.name}</span>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

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

export default CreateSummaryForm;
