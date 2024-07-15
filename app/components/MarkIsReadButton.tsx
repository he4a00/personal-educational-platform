import { useMutation } from "@tanstack/react-query";
import api from "../utils/api";
import { Button } from "@/components/ui/button";

interface ReadButtonProps {
  feedbackId: string;
  text: string;
  isRead: boolean;
}

const MarkIsReadButton = ({ feedbackId, text, isRead }: ReadButtonProps) => {
  const { mutate: markRead, isPending } = useMutation({
    mutationFn: async () => {
      const { data } = await api.patch(`/feedbacks/${feedbackId}`);
      return data;
    },
    onSuccess: (data) => {},
  });
  return (
    <Button disabled={isPending || isRead === true} onClick={() => markRead()}>
      {text}
    </Button>
  );
};

export default MarkIsReadButton;
