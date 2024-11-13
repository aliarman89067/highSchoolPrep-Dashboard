import SortDropDown from "@/components/SortDropDown";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DeleteDialog from "@/components/DeleteDialog";
import { UsersChartData, UserType } from "@/pages/utils/type";

type Props = {
  data: UserType | null;
  setData: Dispatch<SetStateAction<UserType | null>>;
  setChartData: Dispatch<SetStateAction<UsersChartData | null>>;
};

export default function UserPageList({ data, setData, setChartData }: Props) {
  // Hooks
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sortName, setSortName] = useState<string>("Sort");
  const [typesData, setTypesData] = useState<{ order: string; type: string }>({
    order: "",
    type: "",
  });

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("/api/users/getAll")
      .then(({ data }) => {
        setData(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!typesData.order && !typesData.type) return;
    setIsLoading(true);
    if (typesData.order && !typesData.type) {
      axios
        .get(typesData.order)
        .then(({ data }) => setData(data))
        .catch((error) => {
          console.log(error);
        })
        .finally(() => setIsLoading(false));
    } else if (!typesData.order && typesData.type) {
      axios
        .get(typesData.type)
        .then(({ data }) => setData(data))
        .catch((error) => {
          console.log(error);
        })
        .finally(() => setIsLoading(false));
    } else if (typesData.order && typesData.type) {
      if (
        typesData.order === "/api/users/newest-oldest" &&
        typesData.type === "/api/users/premium"
      ) {
        axios
          .get("/api/users/newest-oldest-premium")
          .then(({ data }) => setData(data))
          .catch((error) => {
            console.log(error);
          })
          .finally(() => setIsLoading(false));
      } else if (
        typesData.order === "/api/users/oldest-newest" &&
        typesData.type === "/api/users/free"
      ) {
        axios
          .get("/api/users/oldest-newest-free")
          .then(({ data }) => setData(data))
          .catch((error) => {
            console.log(error);
          })
          .finally(() => setIsLoading(false));
      } else if (
        typesData.order === "/api/users/newest-oldest" &&
        typesData.type === "/api/users/free"
      ) {
        axios
          .get("/api/users/newest-oldest-free")
          .then(({ data }) => setData(data))
          .catch((error) => {
            console.log(error);
          })
          .finally(() => setIsLoading(false));
      } else if (
        typesData.order === "/api/users/oldest-newest" &&
        typesData.type === "/api/users/premium"
      ) {
        axios
          .get("/api/users/oldest-newest-premium")
          .then(({ data }) => setData(data))
          .catch((error) => {
            console.log(error);
          })
          .finally(() => setIsLoading(false));
      }
    }
  }, [typesData]);

  const userSortData = [
    {
      name: "Today",
      api: "/api/users/today",
    },
    {
      name: "Week",
      api: "/api/users/week",
    },
    {
      name: "Month",
      api: "/api/users/month",
    },
    {
      name: "Year",
      api: "/api/users/year",
    },
  ];

  const userTypeData = [
    {
      one: {
        id: "1",
        name: "Newest to Oldest",
        api: "/api/users/newest-oldest",
      },
      two: {
        id: "2",
        name: "Oldest to Newest",
        api: "/api/users/oldest-newest",
      },
    },
    {
      one: {
        id: "3",
        name: "Premium",
        api: "/api/users/premium",
      },
      two: {
        id: "4",
        name: "Free",
        api: "/api/users/free",
      },
    },
  ];

  const handleSortApiReq = async (api: string, name: string) => {
    try {
      setIsLoading(true);
      const searchParams = new URLSearchParams();
      if (typesData.order && !typesData.type) {
        if (typesData.order === "/api/users/newest-oldest") {
          searchParams.append("order", "-1");
        } else if (typesData.order === "/api/users/oldest-newest") {
          searchParams.append("order", "1");
        }
      } else if (!typesData.order && typesData.type) {
        if (typesData.type === "/api/users/premium") {
          searchParams.append("type", "true");
        } else if (typesData.type === "/api/users/free") {
          searchParams.append("type", "false");
        }
      } else if (typesData.order && typesData.type) {
        if (
          typesData.order === "/api/users/newest-oldest" &&
          typesData.type === "/api/users/premium"
        ) {
          searchParams.append("order", "-1");
          searchParams.append("type", "true");
        } else if (
          typesData.order === "/api/users/oldest-newest" &&
          typesData.type === "/api/users/free"
        ) {
          searchParams.append("order", "1");
          searchParams.append("type", "false");
        } else if (
          typesData.order === "/api/users/newest-oldest" &&
          typesData.type === "/api/users/free"
        ) {
          searchParams.append("order", "-1");
          searchParams.append("type", "false");
        } else if (
          typesData.order === "/api/users/oldest-newest" &&
          typesData.type === "/api/users/premium"
        ) {
          searchParams.append("order", "1");
          searchParams.append("type", "true");
        }
      }

      const { data } = await axios.get(`${api}?${searchParams.toString()}`);
      setData(data);
      setSortName(name);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (date: Date) => {
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Get month and add leading zero
    const day = date.getDate().toString().padStart(2, "0"); // Get day and add leading zero
    const year = date.getFullYear(); // Get full year

    return `${month}-${day}-${year}`;
  };
  return (
    <>
      <SortDropDown
        sortName={sortName}
        sortData={userSortData}
        handleSortApiReq={handleSortApiReq}
        userTypeData={userTypeData}
        isLoading={isLoading}
        setTypesData={setTypesData}
        typesData={typesData}
      />
      {isLoading ? (
        <div className="w-full h-[80vh] flex items-center justify-center">
          <p className="text-base text-gray-600">Loading...</p>
        </div>
      ) : // @ts-ignore
      !isLoading && data?.length < 1 ? (
        <div className="w-full h-[80vh] flex items-center justify-center">
          <p className="text-base text-gray-600">No Data Founds</p>
        </div>
      ) : !isLoading && !data ? (
        <div className="w-full h-[80vh] flex items-center justify-center">
          <p className="text-base text-gray-600">Something went wrong</p>
        </div>
      ) : (
        <div className="w-full mt-6 space-y-5">
          <span className="flex gap-2 items-center text-base font-semibold text-gray-700 mt-2">
            {sortName} - {data?.length} results found
          </span>
          {data?.map((user) => (
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
                    <span className="text-sm text-gray-700">{user.email}</span>
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
                          <p className="font-normal underline">See Details</p>
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
                setData={setData}
                setChartData={setChartData}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
