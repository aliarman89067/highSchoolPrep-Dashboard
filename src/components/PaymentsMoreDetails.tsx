import { UsersChartData } from "@/pages/utils/type";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

type Props = {
  data: UsersChartData | null;
};
export default function PaymentsMoreDetails({ data }: Props) {
  if (!data) return;
  console.log(data);

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
      <DialogContent className="max-w-3xl w-full max-h-[90vh] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>New Accounts Info</DialogTitle>
        </DialogHeader>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
          {data?.map((user) => {
            return user.data.map((user) => (
              <div className="w-full p-3 ronuded-md bg-gray-100 hover:shadow-lg transition-all border border-gray-200">
                <div className="flex flex-col gap-1 items-center">
                  <img
                    src={user.image}
                    alt="User Image"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <h3 className="text-gray-600 text-[18px] font-medium">
                    {user.name}
                  </h3>
                  <div className="flex flex-col gap-2 mt-2">
                    <span className="text-sm text-gray-600 font-semibold">
                      <span className="text-[15px] text-gray-700">
                        Package:{" "}
                      </span>
                      {user.packageName}
                    </span>
                    <span className="text-sm text-gray-600 font-semibold">
                      <span className="text-[15px] text-gray-700">Price: </span>{" "}
                      {user.packagePrice}$
                    </span>
                    <span className="text-sm text-gray-600 font-semibold">
                      <span className="text-[15px] text-gray-700">
                        Purchase At:{" "}
                      </span>
                      {formatDate(new Date(user.purchaseAt))}
                    </span>
                    <span className="text-sm text-gray-600 font-semibold">
                      <span className="text-[15px] text-gray-700">
                        Expires At:{" "}
                      </span>
                      {formatDate(new Date(user.expiresAt))}
                    </span>
                  </div>
                </div>
              </div>
            ));
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
