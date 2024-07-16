import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dispatch, SetStateAction } from "react";

interface SelectSortingProps {
  setSortParam: Dispatch<SetStateAction<string>>;
}

const SelectSorting = ({ setSortParam }: SelectSortingProps) => {
  return (
    <div>
      <Select onValueChange={setSortParam}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="ترتيب حسب:" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="الصف الاول الاعدادي">
            الصف الاول الاعدادي
          </SelectItem>
          <SelectItem value="الصف الثاني الاعدادي">
            الصف الثاني الاعدادي
          </SelectItem>
          <SelectItem value="الصف الثالث الاعدادي">
            الصف الثالث الاعدادي
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectSorting;
