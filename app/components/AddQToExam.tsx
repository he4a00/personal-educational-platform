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
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { QuestionsValidator } from "../utils/validators/examValidator";
import api from "../utils/api";

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
      toast({
        title: "تم اضافة الاسألة بنجاح",
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
          <FormLabel className="font-semibold text-white">الجدول</FormLabel>
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
