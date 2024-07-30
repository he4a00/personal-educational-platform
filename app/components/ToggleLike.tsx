"use client";

import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Heart, ThumbsUp, ThumbsUpIcon } from "lucide-react";
import api from "../utils/api";
import { useUserContext } from "../context/UserContext";

interface LikesProps {
  lessonId: string;
}

const ToggleLike = ({ lessonId }: LikesProps) => {
  const queryClient = useQueryClient();
  const { user }: any = useUserContext();

  const {
    data: userLikes,
    isLoading: isLikesLoading,
    error: likesError,
  } = useQuery({
    queryKey: ["userLikes", user?.user?._id],
    queryFn: async () => {
      const { data } = await api.get(`/likes/user/likes`);
      return data;
    },
    enabled: !!user?.user?._id, // Only run the query if the user is logged in
  });

  const { mutate: toggleLike, isPending } = useMutation({
    mutationFn: async () => {
      const { data } = await api.post(`/likes/toggleLike/${lessonId}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userLikes", user?.user?._id],
      });
      queryClient.invalidateQueries({ queryKey: ["likes", lessonId] });
    },
  });

  const handleToggleLike = () => {
    toggleLike();
  };

  const isLiked = userLikes?.likes.some(
    (like: any) => like.lessonId === lessonId
  );

  if (isLikesLoading) return <div>Loading...</div>;
  if (likesError) return <div>Error loading likes</div>;

  return (
    <Button
      className="bg-transparent hover:bg-transparent p-3 hover:bg-slate-100 transition-all 0.5s ease-linear"
      variant="outline"
      onClick={handleToggleLike}
      disabled={isPending}
    >
      {isLiked ? (
        <p className="text-blue-600 m-2">الغاء الاعجاب</p>
      ) : (
        <p className="m-2">اعجاب</p>
      )}
      {isLiked ? (
        <ThumbsUpIcon
          className="h-6 w-6 text-blue-500  fill-current"
          aria-label="Unlike"
        />
      ) : (
        <ThumbsUpIcon className="w-5 h-5 mr-2" />
      )}
    </Button>
  );
};

export default ToggleLike;
