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
import { FeedbackValidator } from "../utils/validators/feedbackValidator";
import { Textarea } from "@/components/ui/textarea";

interface Feedback {
  title: string;
  desc: string;
  isRead: boolean;
}

const CreateFeedbackForm = () => {
  const form = useForm({
    resolver: zodResolver(FeedbackValidator),
    defaultValues: {
      title: "",
      desc: "",
    },
  });

  const router = useRouter();
  const { toast } = useToast();

  const { mutate: createFeedback, isPending } = useMutation({
    mutationFn: async (formData: any) => {
      try {
        const { data } = await api.post("/feedbacks/", formData);
        return data;
      } catch (error: any) {
        console.log(error);
      }
    },
    onSuccess: () => {
      toast({
        title: "تم ارسال الاقتراح/المشكلة الخاصة بك",
        variant: "default",
      });
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

  function onSubmit(values: z.infer<typeof FeedbackValidator>) {
    createFeedback(values);
  }

  return (
    <div className="w-full flex items-center justify-center ">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">
          إرسال اقتراح/مشكلة
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-gray-700">
                    عنوان المشكلة/الاقتراح
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="border-gray-300 bg-gray-100 text-gray-800 focus:border-blue-500 focus:ring-blue-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="desc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-gray-700">
                    تفاصيل الاقتراح/المشكلة
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="border-gray-300 bg-gray-100 text-gray-800 focus:border-blue-500 focus:ring-blue-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button variant="outline" disabled={isPending} type="submit">
              ارسال
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateFeedbackForm;
