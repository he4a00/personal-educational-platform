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
import DeleteStudentButton from "@/app/components/DeleteStudentButton";

const Users = () => {
  const [searchParam, setSearchParams] = useState("");
  const [sortParam, setSortParam] = useState("");

  const { data: usersData, isLoading } = useQuery({
    queryKey: ["users", searchParam, sortParam],
    queryFn: async () => {
      const { data } = await api.get(
        `/users/?phoneNumber=${searchParam}&eduyear=${sortParam}`
      );
      return data;
    },
  });

  return (
    <div className="p-5">
      <h1 className="mb-5"> عدد الطلاب: {usersData?.totalStudents}</h1>
      <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2 gap-4">
        <Input
          type="text"
          placeholder="البحث برقم الهاتف"
          className="bg-transparent border border-gray-300 rounded-md p-2"
          value={searchParam}
          onChange={(e) => setSearchParams(e.target.value)}
        />
        <SelectSorting setSortParam={setSortParam} />
      </div>
      <Table className="w-full table-auto">
        <TableCaption>A list of your recent users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-right">الاسم الاول</TableHead>
            <TableHead className="text-right">الاسم الثاني</TableHead>
            <TableHead className="text-right">الصف</TableHead>
            <TableHead className="text-right">رقم الهاتف</TableHead>
            <TableHead className="text-right">رقم ولي الامر</TableHead>
            <TableHead className="text-right"> العمليات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                جاري التحميل ...
              </TableCell>
            </TableRow>
          ) : usersData?.students?.length > 0 ? (
            usersData.students.map((user: any) => (
              <TableRow key={user._id}>
                <TableCell className="text-right">{user.firstname}</TableCell>
                <TableCell className="text-right">{user.lastname}</TableCell>
                <TableCell className="text-right">{user.eduyear}</TableCell>
                <TableCell className="text-right">{user.phoneNumber}</TableCell>
                <TableCell className="text-right">
                  {user.parentPhoneNumber}
                </TableCell>
                <TableCell className="text-right">
                  <DeleteStudentButton id={user?._id} />
                </TableCell>
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
