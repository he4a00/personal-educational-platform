import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const LessonsSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data } = useQuery({
    queryKey: ["lessons", searchTerm],
    queryFn: async () => {
      const { data } = await api.get(`/lessons/?search=${searchTerm}`);
      return data;
    },
  });

  if (!data) {
    return <h1>لا يوجد درس بهذا الاسم</h1>;
  }

  return (
    <div className="flex flex-col gap-5">
      <Input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="عنوان الدرس"
      />

      {data && (
        <div>
          {data?.lessons?.map((lesson: any) => (
            <h3 className="text-lg font-bold p-3" key={lesson._id}>
              {lesson._id}
            </h3>
          ))}
        </div>
      )}
    </div>
  );
};

export default LessonsSearch;
