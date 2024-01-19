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
        title: " تم ارسال الاقتراح/المسشكلة الخاصة بك",
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
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-center gap-10 w-full bg-[#101012] p-12 rounded-lg"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-white">
                  عنوان المشكلة/الاقتراح
                </FormLabel>
                <FormControl>
                  <Input
                    className="border border-[#1F1F22] bg-[#121417] text-white !important focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 !important"
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
                <FormLabel className="font-semibold text-white">
                  تفاصيل الاقتراح/المشكلة
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="border border-[#1F1F22] bg-[#121417] text-white  !important focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 !important"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button variant="secondary" disabled={isPending} type="submit">
            ارسال
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateFeedbackForm;
