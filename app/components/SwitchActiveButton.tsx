"use client";

import api from "@/app/utils/api";
import { Switch } from "@/components/ui/switch";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type SwitchProps = {
  isActive: boolean;
  id: string;
};

const SwitchActiveButton = ({ id, isActive }: SwitchProps) => {
  const queryClient = useQueryClient();
  const { mutate: toggleActivity, isPending } = useMutation({
    mutationFn: async ({ isActive, id }: SwitchProps) => {
      const { data } = await api.patch(`/exam/update/${id}`, { isActive });
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["exams"] });
    },
  });

  const handleSwitchChange = (checked: boolean) => {
    toggleActivity({ id, isActive: checked });
  };

  return (
    <Switch
      disabled={isPending}
      checked={isActive}
      onCheckedChange={handleSwitchChange}
    />
  );
};

export default SwitchActiveButton;
