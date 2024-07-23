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
    <h1 className="flex items-center text-lg">{lessonLikes?.data.likes}</h1>
  );
};

export default Likes;
