"use client";

import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import api from "../utils/api";
import Swal from "sweetalert2";

const DeleteStudentButton = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();
  const {
    mutate: deleteExam,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: async () => {
      const { data } = await api.delete(`/users/delete/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
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
        deleteExam();
        if (isSuccess) {
          Swal.fire({
            // title: "Deleted!",
            // text: "Your file has been deleted.",
            icon: "success",
          });
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

export default DeleteStudentButton;
