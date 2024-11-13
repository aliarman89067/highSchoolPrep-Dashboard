import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import SortDropDown from "@/components/SortDropDown";
import axios from "axios";
import { useEffect, useState } from "react";
import { UserType } from "./utils/type";

export default function PaymentPage() {
  const [sortName, setSortName] = useState<string>("Sort");
  const [data, setData] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("/api/payments/getAll")
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

  const userSortData = [
    {
      name: "Today",
      api: "/api/payments/today",
    },
    {
      name: "Week",
      api: "/api/payments/week",
    },
    {
      name: "Month",
      api: "/api/payments/month",
    },
    {
      name: "Year",
      api: "/api/payments/year",
    },
  ];
  const handleSortApiReq = async (api: string, name: string) => {
    try {
      setSortName(name);
      const { data } = await axios.get(`${api}`);
      setData(data);
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
    <MaxWidthWrapper classNames="mt-10 px-5">
      <SortDropDown
        isLoading={isLoading}
        sortName={sortName}
        sortData={userSortData}
        handleSortApiReq={handleSortApiReq}
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
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mt-6 gap-3">
          {data?.map((user) => (
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
                    <span className="text-[15px] text-gray-700">Package: </span>
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
          ))}
        </div>
      )}
    </MaxWidthWrapper>
  );
}
