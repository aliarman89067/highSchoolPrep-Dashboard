import {
  ChevronDown,
  DollarSign,
  Loader2,
  LucideTrafficCone,
  PaperclipIcon,
  Users,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from "axios";

export default function TotalNumberCards() {
  const [sortName, setSortName] = useState<string>("Today");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<{
    users: number;
    payments: number;
    careerForms: number;
    traffics: number;
  } | null>(null);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("/api/users/number-today")
      .then(({ data }) => {
        setData({
          ...data,
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <section className="flex px-8 py-6 border border-gray-300 rounded-md flex-col gap-5 mb-8">
      {isLoading ? (
        <div className="flex w-full h-full items-center justify-center text-center py-10">
          <span className="flex gap-2 items-center">
            <h3 className="text-base text-gray-500">Loading</h3>
            <Loader2 className="size-5 animate-spin text-gray-500" />
          </span>
        </div>
      ) : (
        <>
          <div className="flex mr-auto">
            <Sort
              setData={setData}
              setIsLoading={setIsLoading}
              sortName={sortName}
              setSortName={setSortName}
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            <Card className="hover:shadow-lg hover:bg-gray-50 transition-all">
              <CardHeader>
                <CardTitle>Total No of User</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-row gap-2 items-center">
                <span className="text-xl font-semibold text-gray-800">
                  {data?.users}
                </span>
                <Users className="size-6 text-gray-800" />
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg hover:bg-gray-50 transition-all">
              <CardHeader>
                <CardTitle>Total No of Payments</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-row gap-2 items-center">
                <span className="text-xl font-semibold text-gray-800">
                  {data?.payments}
                </span>
                <DollarSign className="size-6 text-gray-800" />
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg hover:bg-gray-50 transition-all">
              <CardHeader>
                <CardTitle>Total No of Forms</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-row gap-2 items-center">
                <span className="text-xl font-semibold text-gray-800">
                  {data?.careerForms}
                </span>
                <PaperclipIcon className="size-6 text-gray-800" />
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg hover:bg-gray-50 transition-all">
              <CardHeader>
                <CardTitle>Total No of Traffic</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-row gap-2 items-center">
                <span className="text-xl font-semibold text-gray-800">
                  {data?.traffics}
                </span>
                <LucideTrafficCone className="size-6 text-gray-800" />
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </section>
  );
}

interface Props {
  setData: Dispatch<
    SetStateAction<{
      users: number;
      payments: number;
      careerForms: number;
      traffics: number;
    } | null>
  >;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setSortName: Dispatch<SetStateAction<string>>;
  sortName: string;
}

function Sort({ setData, setIsLoading, sortName, setSortName }: Props) {
  const apis = {
    today: "/api/users/number-today",
    week: "/api/users/number-week",
    month: "/api/users/number-month",
    year: "/api/users/number-year",
  };

  const handleSort = async ({ name, api }: { name: string; api: string }) => {
    try {
      setIsLoading(true);
      setSortName(name);
      const { data } = await axios.get(api);
      setData({ ...data });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          {sortName} <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
            handleSort({ name: "Today", api: apis.today });
          }}
        >
          Today
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            handleSort({ name: "Week", api: apis.week });
          }}
        >
          Week
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            handleSort({ name: "Month", api: apis.month });
          }}
        >
          Month
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            handleSort({ name: "Year", api: apis.year });
          }}
        >
          Year
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
