import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const UsersSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data } = useQuery({
    queryKey: ["users", searchTerm],
    queryFn: async () => {
      const { data } = await api.get(`/users/?search=${searchTerm}`);
      return data;
    },
  });

  return (
    <div className="flex flex-col gap-5">
      <Input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="رقم الهاتف الخاص بالطلب"
      />

      {data && (
        <div>
          {data?.users?.map((user: any) => (
            <h3 className="text-lg font-bold p-3" key={user._id}>
              {user._id}
            </h3>
          ))}
        </div>
      )}
    </div>
  );
};

export default UsersSearch;
