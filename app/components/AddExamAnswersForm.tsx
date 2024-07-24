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
import { useParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { AnswersValidation } from "../utils/validators/examValidator";
import api from "../utils/api";
import { Checkbox } from "@/components/ui/checkbox";

const AddExamAnswersForm = () => {
  const { id } = useParams<{ id: string }>();
  const form = useForm({
    resolver: zodResolver(AnswersValidation),
    defaultValues: {
      answers: [
        {
          answerText: "",
          isCorrect: false,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "answers",
  });

  const { toast } = useToast();

  const { mutate: addAnswers, isPending } = useMutation({
    mutationFn: async (formData: any) => {
      try {
        const { data } = await api.post(`/exam/answers/${id}`, formData);
        return data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      toast({
        title: "تم اضافة الاجابات بنجاح",
      });
    },
    onError: (error: any) => {
      if (error.response?.status === 401) {
        toast({
          title: "غير مسموح لك بفعل هذا الحدث",
          variant: "destructive",
        });
      }
    },
  });

  function onSubmit(values: z.infer<typeof AnswersValidation>) {
    const cleanedValues = {
      ...values,
      answers: values.answers.filter(
        (answer) => answer.answerText.trim() !== ""
      ),
    };
    console.log("Submitting cleaned values:", cleanedValues); // Log cleaned values to verify
    addAnswers(cleanedValues);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-10 w-full bg-[#f9fafb] shadow-md p-12 rounded-lg"
      >
        <div className="flex flex-col gap-4 justify-center">
          {fields.map((item, index) => (
            <div key={item.id} className="flex flex-col gap-2">
              <div className="flex flex-row w-full items-center">
                <FormField
                  control={form.control}
                  name={`answers.${index}.answerText`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">الأجابة</FormLabel>
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
                <FormField
                  control={form.control}
                  name={`answers.${index}.isCorrect`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={field.ref}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                variant="destructive"
                onClick={(e) => {
                  e.preventDefault();
                  remove(index);
                }}
              >
                حذف الاجابة
              </Button>
            </div>
          ))}
        </div>
        <Button
          type="button"
          variant="secondary"
          onClick={() => append({ answerText: "", isCorrect: false })}
        >
          اضافة اجابة
        </Button>
        <Button variant="secondary" disabled={isPending} type="submit">
          تسجيل
        </Button>
      </form>
    </Form>
  );
};

export default AddExamAnswersForm;
