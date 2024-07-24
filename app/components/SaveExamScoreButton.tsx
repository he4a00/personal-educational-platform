import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import api from "../utils/api";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

type ScoreProps = {
  score: number;
  dateTaken: Date;
  userId: string;
  examId: string;
  onSaveSuccess: () => void;
};

const SaveExamScoreButton = ({
  score,
  dateTaken,
  userId,
  examId,
  onSaveSuccess,
}: ScoreProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const { mutate: saveScore, isPending } = useMutation({
    mutationFn: async () => {
      const { data } = await api.post(`/exam/saveScore/${examId}`, {
        score,
        dateTaken,
        userId,
      });
      return data;
    },

    onSuccess: () => {
      onSaveSuccess();
      // router.push("/");
    },
    onError: (err: any) => {
      if (err.response.status === 403) {
        toast({
          title: "لقد تم تسليم هذا الامتحان بالفعل",
          description: "لا يمكنك تسليم هذا الامتحان مرة اخرى",
          variant: "destructive",
        });
      }
    },
  });
  return (
    <Button disabled={isPending} onClick={() => saveScore()}>
      تسليم
    </Button>
  );
};

export default SaveExamScoreButton;
