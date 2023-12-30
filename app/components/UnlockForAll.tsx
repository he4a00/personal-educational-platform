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
import { UnlockForAllValidation } from "../utils/validators/unlockedLessonVaidator";
const UnlockForAll = () => {
  const form = useForm({
    resolver: zodResolver(UnlockForAllValidation),
    defaultValues: {
      lessonId: "",
    },
  });

  const router = useRouter();
  const { toast } = useToast();

  const { mutate: unlockForAll, isPending } = useMutation({
    mutationFn: async (formData: any) => {
      try {
        const { data } = await api.post("/owned/all", formData);
        return data;
      } catch (error: any) {
        console.log(error);
      }
    },
    onSuccess: (data) => {
      console.log(data);
      // router.push("/");
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
  function onSubmit(values: z.infer<typeof UnlockForAllValidation>) {
    unlockForAll({
      lessonId: values.lessonId,
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-10 w-full bg-[#101012] p-12 rounded-lg"
      >
        <FormField
          control={form.control}
          name="lessonId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-white">
                الأي دي الخاص بالدرس المراد فتحه
              </FormLabel>
              <FormControl>
                <Input
                  className="border border-[#1F1F22] bg-[#121417] text-white  !important focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 !important"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button variant="secondary" disabled={isPending} type="submit">
          اضافة
        </Button>
        <Link
          className="text-center font-semibold text-xl text-white"
          href="/dashboard"
        >
          العودة للصفحة الرئيسية
        </Link>
      </form>
    </Form>
  );
};

export default UnlockForAll;
