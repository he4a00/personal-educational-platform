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
import { useToast } from "@/components/ui/use-toast";
import { UnlockedLessonValidation } from "../utils/validators/unlockedLessonVaidator";

const UnlockLesson = () => {
  const form = useForm({
    resolver: zodResolver(UnlockedLessonValidation),
    defaultValues: {
      userId: "",
      lessonId: "",
    },
  });

  const router = useRouter();
  const { toast } = useToast();

  const { mutate: unlockLesson, isPending } = useMutation({
    mutationFn: async (formData: any) => {
      try {
        const { data } = await api.post("/owned", formData);
        return data;
      } catch (error: any) {
        console.log(error);
      }
    },
    onSuccess: (data) => {
      router.push("/");
    },
    onError: (err: any) => {
      if (err.response && err.response.status === 403) {
        toast({
          title: "غير مسموح لك بفتح هذا الدرس",
          description: "رجاء تواصل مع استاذك.",
          variant: "destructive",
        });
      }
      if (err.response && err.response.status === 409) {
        toast({
          title: "هذا الدرس مفتوح بالفعل لهذا الطالب",
          variant: "destructive",
        });
      }
    },
  });

  function onSubmit(values: z.infer<typeof UnlockedLessonValidation>) {
    unlockLesson({
      userId: values.userId,
      lessonId: values.lessonId,
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-6 w-full bg-[#f9fafb] p-8 rounded-lg shadow-md"
      >
        <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-gray-700">
                الأي دي الخاص بالطالب
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
          name="lessonId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-gray-700">
                الأي دي الخاص بالدرس المراد فتحه
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

export default UnlockLesson;
