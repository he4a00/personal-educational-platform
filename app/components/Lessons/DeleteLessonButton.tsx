"use client";

import api from "@/app/utils/api";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import Swal from "sweetalert2";

const DeleteLessonButton = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();
  const {
    mutate: deleteLesson,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: async () => {
      const { data } = await api.delete(`/lessons/delete/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lessons"] });
    },
  });

  const handleDelete = () => {
    Swal.fire({
      title: "هل انت متأكد؟",
      text: "هذا الفعل لا يمكن التراجع عنه!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "حذف",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteLesson();
        if (isSuccess) {
          Swal.fire({
            // title: "Deleted!",
            // text: "Your file has been deleted.",
            icon: "success",
          });
          queryClient.invalidateQueries({ queryKey: ["lessons"] });
        }
      }
    });
  };

  return (
    <Button disabled={isPending} onClick={() => handleDelete()}>
      <Trash />
    </Button>
  );
};

export default DeleteLessonButton;
