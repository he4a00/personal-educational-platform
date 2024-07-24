"use client";

import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import api from "../utils/api";

const DeleteExamButton = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();
  const { mutate: deleteExam, isPending } = useMutation({
    mutationFn: async () => {
      const { data } = await api.delete(`/exam/delete/${id}`);
      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exmas"] });
    },
  });
  return (
    <Button disabled={isPending} onClick={() => deleteExam()}>
      <Trash />
    </Button>
  );
};

export default DeleteExamButton;
