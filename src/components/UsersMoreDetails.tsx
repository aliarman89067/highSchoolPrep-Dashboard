import { UsersChartData, UserType } from "@/pages/utils/type";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import DeleteDialog from "./DeleteDialog";
import { Dispatch, SetStateAction } from "react";

type Props = {
  data: UsersChartData | null;
  setChartData: Dispatch<SetStateAction<UsersChartData | null>>;
  setData: Dispatch<SetStateAction<UserType | null>>;
};

export default function UsersMoreDetails({
  data,
  setChartData,
  setData,
}: Props) {
  if (!data) return;

  const formatDate = (date: Date) => {
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Get month and add leading zero
    const day = date.getDate().toString().padStart(2, "0"); // Get day and add leading zero
    const year = date.getFullYear(); // Get full year

    return `${month}-${day}-${year}`;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">See Details</Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl w-full h-[90vh] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>New Accounts Info</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {data.map(
            (users) =>
              users.length > 0 &&
              users.data.map((user) => (
                <div
                  key={user._id}
                  className="px-4 py-4 rounded-lg bg-gray-100 flex items-center justify-between w-full"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-3">
                      <img
                        src={user.image}
                        alt={`${user.name} profile Image`}
                        className="w-14 h-14 rounded-full object-cover"
                      />
                      <div className="flex flex-col ">
                        <h3 className="text-[14px] font-medium text-gray-800">
                          {user.name}
                        </h3>
                        <span className="text-sm text-gray-700">
                          {user.email}
                        </span>
                        <span className="text-sm text-gray-700">
                          Join at {formatDate(new Date(user.createdAt))}
                        </span>
                      </div>
                    </div>
                    {user.isPremium ? (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="bg-secondary-foreground hover:bg-secondary-foreground/90 w-[170px] h-12">
                            <div className="flex flex-col">
                              <p>Premium</p>
                              <p className="font-normal underline">
                                See Details
                              </p>
                            </div>
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle className="text-center">
                              User Details
                            </DialogTitle>
                          </DialogHeader>
                          {/* User Info */}
                          <div className="flex justify-center flex-wrap gap-1">
                            <div className="flex flex-col text-center">
                              <span className="px-2 py-1 bg-gray-800 min-w-[100px] text-white text-sm">
                                Name
                              </span>
                              <span className="px-2 py-1 border border-gray-800 text-sm">
                                {user.name}
                              </span>
                            </div>
                            <div className="flex flex-col text-center">
                              <span className="px-2 py-1 bg-gray-800 min-w-[100px] text-white text-sm">
                                Email
                              </span>
                              <span className="px-2 py-1 border border-gray-800 text-sm">
                                {user.email}
                              </span>
                            </div>
                            <div className="flex flex-col text-center">
                              <span className="px-2 py-1 bg-gray-800 min-w-[100px] text-white text-sm">
                                Joining
                              </span>
                              <span className="px-2 py-1 border border-gray-800 text-sm">
                                {formatDate(new Date(user.createdAt))}
                              </span>
                            </div>
                          </div>
                          <DialogTitle className="mt-2 text-center">
                            Package Title
                          </DialogTitle>
                          {/* Package Info */}
                          <div className="flex justify-center flex-wrap gap-1">
                            <div className="flex flex-col text-center">
                              <span className="px-2 py-1 bg-gray-800 min-w-[100px] text-white text-sm">
                                Name
                              </span>
                              <span className="px-2 py-1 border border-gray-800 text-sm">
                                {user.packageName}
                              </span>
                            </div>
                            <div className="flex flex-col text-center">
                              <span className="px-2 py-1 bg-gray-800 min-w-[100px] text-white text-sm">
                                Price
                              </span>
                              <span className="px-2 py-1 border border-gray-800 text-sm">
                                {user.packagePrice}$
                              </span>
                            </div>
                            <div className="flex flex-col text-center">
                              <span className="px-2 py-1 bg-gray-800 min-w-[100px] text-white text-sm">
                                PurchaseAt
                              </span>
                              <span className="px-2 py-1 border border-gray-800 text-sm">
                                {formatDate(new Date(user.purchaseAt))}
                              </span>
                            </div>
                            <div className="flex flex-col text-center">
                              <span className="px-2 py-1 bg-gray-800 min-w-[100px] text-white text-sm">
                                ExpiresAt
                              </span>
                              <span className="px-2 py-1 border border-gray-800 text-sm">
                                {formatDate(new Date(user.expiresAt))}
                              </span>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <Button className="bg-secondary-foreground hover:bg-secondary-foreground/90 w-[170px] cursor-default">
                        Free User
                      </Button>
                    )}
                  </div>
                  <DeleteDialog
                    deleteId={user._id}
                    setChartData={setChartData}
                    setData={setData}
                  />
                </div>
              ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
