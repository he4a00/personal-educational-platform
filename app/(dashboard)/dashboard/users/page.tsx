"use client";

import api from "@/app/utils/api";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import SelectSorting from "@/app/components/SelectSorting";

const Users = () => {
  const [searchParam, setSearchParams] = useState("");
  const [sortParam, setSortParam] = useState("");

  const { data: usersData, isLoading } = useQuery({
    queryKey: ["users", searchParam, sortParam],
    queryFn: async () => {
      let endpoint = `/users`;
      const params = [];
      if (searchParam) {
        params.push(`search=${searchParam}`);
      }
      if (sortParam) {
        params.push(`sort=${sortParam}`);
      }
      if (params.length > 0) {
        endpoint += `?${params.join("&")}`;
      }
      const { data } = await api.get(endpoint);
      return data;
    },
  });

  return (
    <div className="p-5">
      <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
        <Input
          type="text"
          placeholder="Search by Name"
          className="bg-transparent border border-gray-300 rounded-md p-2"
          value={searchParam}
          onChange={(e) => setSearchParams(e.target.value)}
        />
        <SelectSorting setSortParam={setSortParam} />
      </div>
      <Table className="w-full">
        <TableCaption>A list of your recent users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">الاسم الاول</TableHead>
            <TableHead>الاسم الثاني</TableHead>
            <TableHead>الصف</TableHead>
            <TableHead>رقم الهاتف</TableHead>
            <TableHead>رقم ولي الامر</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                جاري التحميل ...
              </TableCell>
            </TableRow>
          ) : usersData?.users?.length > 0 ? (
            usersData.users.map((user: any) => (
              <TableRow key={user._id}>
                <TableCell className="font-medium">{user.firstname}</TableCell>
                <TableCell>{user.lastname}</TableCell>
                <TableCell>{user.eduyear}</TableCell>
                <TableCell>{user.phoneNumber}</TableCell>
                <TableCell>{user.parentPhoneNumber}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No users found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Users;
