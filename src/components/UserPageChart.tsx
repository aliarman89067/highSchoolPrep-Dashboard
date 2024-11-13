import { UsersChartData, UserType } from "@/pages/utils/type";
import axios from "axios";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
} from "recharts";
import UsersMoreDetails from "./UsersMoreDetails";
import PaymentsMoreDetails from "./PaymentsMoreDetails";

type Props = {
  usersData: UsersChartData | null;
  setUsersData: Dispatch<SetStateAction<UsersChartData | null>>;
  setData: Dispatch<SetStateAction<UserType | null>>;
};

export default function UserPageChart({
  usersData,
  setUsersData,
  setData,
}: Props) {
  const [premiumUsers, setPremiumUsers] = useState<UsersChartData | null>(null);
  const [chartData, setChartData] = useState<any>();
  const [premiumChartData, setPremiumChartData] = useState<any>();

  useEffect(() => {
    axios
      .get("/api/users/week-for-chart-users")
      .then(({ data: usersData }) => {
        axios
          .get("/api/users/week-for-chart-premium")
          .then(({ data: premiumUsersData }) => {
            setUsersData(usersData);
            setPremiumUsers(premiumUsersData);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const laodChartBar = useCallback(() => {
    if (usersData && usersData.length > 0) {
      const newChartData = usersData.map((item) => {
        return {
          month: item.dayName || "",
          desktop: item.data.length || 0,
        };
      });
      setChartData(newChartData);
    }
    // Second Loader
    if (premiumUsers && premiumUsers.length > 0) {
      const newChartData = premiumUsers.map((item) => {
        return {
          date: item.dayName || "",
          desktop: item.data.length || 0,
        };
      });
      setPremiumChartData(newChartData);
    }
  }, [usersData, premiumUsers]);

  useEffect(() => {
    laodChartBar();
  }, [usersData, premiumUsers]);

  const usersChartConfig = {
    desktop: {
      label: "Desktop",
      color: "#a61fcc",
    },
  } satisfies ChartConfig;

  const premiumChartConfig = {
    visitors: {
      label: "Visitors",
    },
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;
  return (
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <CardHeader className="justify-between items-start flex-row">
          <div className="flex flex-col gap-1">
            <CardTitle>New Accounts - Data</CardTitle>
            <CardDescription>1 Week Results</CardDescription>
          </div>
          <UsersMoreDetails
            data={usersData}
            setChartData={setUsersData}
            setData={setData}
          />
        </CardHeader>
        <CardContent>
          <ChartContainer config={usersChartConfig}>
            <BarChart
              accessibilityLayer
              data={chartData}
              margin={{
                top: 40,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8}>
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      {/* Second Chart */}
      <Card>
        <CardHeader className="justify-between items-start flex-row">
          <div className="flex flex-col gap-1">
            <CardTitle>New Payments - Data</CardTitle>
            <CardDescription>1 Week Results</CardDescription>
          </div>
          <PaymentsMoreDetails data={premiumUsers} />
        </CardHeader>
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
          <ChartContainer
            config={premiumChartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <AreaChart data={premiumChartData}>
              <defs>
                <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-desktop)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-desktop)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-mobile)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-mobile)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      });
                    }}
                    indicator="dot"
                  />
                }
              />
              <Area
                dataKey="mobile"
                type="natural"
                fill="url(#fillMobile)"
                stroke="var(--color-mobile)"
                stackId="a"
              />
              <Area
                dataKey="desktop"
                type="natural"
                fill="url(#fillDesktop)"
                stroke="var(--color-desktop)"
                stackId="a"
              />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
