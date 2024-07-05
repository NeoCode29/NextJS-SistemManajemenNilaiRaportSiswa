import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { HiOutlineDotsVertical } from "react-icons/hi";

const DropdownMenuStudent = () => {
    return <DropdownMenu>
    <DropdownMenuTrigger>
      <HiOutlineDotsVertical/>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem>Details</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Edit</DropdownMenuItem>
      <DropdownMenuItem>Delete</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
}

export default DropdownMenuStudent;