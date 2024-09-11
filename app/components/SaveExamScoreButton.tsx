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
      // variant="outline"
      className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 flex items-center justify-center mb-4"
      disabled={isPending}
      onClick={() => saveScore()}
    >
      حفظ النتيجة
      <Save size={20} className="mr-2" />
    </Button>
  );
};

export default SaveExamScoreButton;
