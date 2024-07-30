import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

type LikesLessonProps = {
  lessonId: string;
};

const Likes = ({ lessonId }: LikesLessonProps) => {
  const { data: lessonLikes } = useQuery({
    queryKey: ["likes", lessonId],
    queryFn: async () => {
      const data = await api.get(`/lessons/${lessonId}`);
      return data;
    },
  });

  return (
    <div className="text-muted-foreground text-gray-800">
      <h1>
        <span className="font-medium text-blue-600">
          {lessonLikes?.data?.likes}
        </span>{" "}
        لايك
      </h1>
    </div>
  );
};

export default Likes;
