"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFieldArray, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { QuestionsValidator } from "../utils/validators/examValidator";
import api from "../utils/api";
import { MathJax } from "better-react-mathjax";
import { EditableMathField, addStyles } from "react-mathquill";

addStyles();

const latexToolbar = [
  { symbol: "\\frac{a}{b}", display: "كسر" },
  { symbol: "\\sqrt{x}", display: "جذر تربيعي" },
  { symbol: "\\sum", display: "مجموع" },
  { symbol: "\\int", display: "تكامل" },
  { symbol: "\\pi", display: "باي" },
];

const AddQToExam = () => {
  const { id } = useParams<{ id: string }>();
  const form = useForm({
    resolver: zodResolver(QuestionsValidator),
    defaultValues: {
      questions: [
        {
          questionText: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  const { toast } = useToast();
  const router = useRouter();

  const { mutate: addQToExam, isPending } = useMutation({
    mutationFn: async (formData: any) => {
      try {
        const { data } = await api.post(`/exam/questions/${id}`, formData);
        return data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      router.push("/dashboard/exams");
      toast({
        title: "تم اضافة الاسئلة بنجاح",
      });
    },
    onError: (error: any) => {
      if (error.response.status === 401) {
        toast({
          title: "غير مسموح لك بفعل هذا الحدث",
          variant: "destructive",
        });
      }
    },
  });

  function onSubmit(values: z.infer<typeof QuestionsValidator>) {
    addQToExam(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-10 w-full bg-[#101012] p-12 rounded-lg"
      >
        <div className="flex flex-col gap-4">
          <FormLabel className="font-semibold text-white">الأسئلة</FormLabel>
          {fields.map((item, index) => (
            <div key={item.id} className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name={`questions.${index}.questionText`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-white">
                      السؤال
                    </FormLabel>

                    <FormControl>
                      <Input
                        className="w-full border border-gray-300 bg-white text-gray-900 rounded-md focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button variant="destructive" onClick={() => remove(index)}>
                حذف السؤال
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="secondary"
            onClick={() => append({ questionText: "" })}
          >
            اضافة سؤال
          </Button>
        </div>
        <Button variant="secondary" disabled={isPending} type="submit">
          اضافة
        </Button>
      </form>
    </Form>
  );
};

export default AddQToExam;
