import { useMutation } from "@tanstack/react-query";
import api from "../utils/api";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Save } from "lucide-react";

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
    <Button
      variant="outline"
      className="flex items-center gap-2 bg-gradient-to-r from-green-400 to-blue-500 text-white p-4 shadow-lg rounded-full hover:from-green-300 hover:to-blue-400 transition-transform transform hover:scale-110"
      disabled={isPending}
      onClick={() => saveScore()}
    >
      <Save size={20} />
      حفظ النتيجة
    </Button>
  );
};

export default SaveExamScoreButton;
