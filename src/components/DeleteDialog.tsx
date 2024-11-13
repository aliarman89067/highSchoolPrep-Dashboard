import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { UsersChartData, UserType } from "@/pages/utils/type";

type Props = {
  deleteId: string;
  setData: Dispatch<SetStateAction<UserType | null>>;
  setChartData: Dispatch<SetStateAction<UsersChartData | null>>;
};

export default function DeleteDialog({
  deleteId,
  setData,
  setChartData,
}: Props) {
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/users/deleteUser/${id}`);
      setData((prev: UserType | null) => {
        if (prev) {
          return prev.filter((item) => item._id !== deleteId);
        }
        return null;
      });
      // @ts-ignore
      setChartData((prev: UsersChartData | null) =>
        prev?.map((prevUsers) => {
          if (prevUsers.data.length > 0) {
            // Filter out the user with the given id
            const filteredData = prevUsers.data.filter(
              (user) => user._id !== id
            );
            // Return a new object with updated `data` array
            return { ...prevUsers, data: filteredData };
          }
          return prevUsers; // If no data, just return the user as is
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          className="opacity-60 hover:opacity-100 transition-all"
        >
          Delete <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the user
            account and remove the data from the database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDelete(deleteId)}
            className="bg-red-500 hover:bg-red-500 hover:opacity-90"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
