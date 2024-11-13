import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import SortDropDown from "@/components/SortDropDown";
import { useCallback, useEffect, useState } from "react";
import { TrafficType } from "./utils/type";
import axios from "axios";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Card, CardContent } from "@/components/ui/card";
import { ChartNoAxesCombined } from "lucide-react";

export default function Traffic() {
  const [sortName, setSortName] = useState<string>("Week");
  const [timePeriod, setTimePeriod] = useState<{ start: string; end: string }>({
    start: "",
    end: "",
  });
  const [data, setData] = useState<TrafficType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [chartData, setChartData] = useState<any>();
  useEffect(() => {
    setIsLoading(true);
    axios
      .get("/api/traffic/week")
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

  const laodChartBar = useCallback(() => {
    if (data && data.length > 0) {
      const newChartData = data.map((item, index) => {
        if (index === 0) {
          setTimePeriod((prev) => ({ ...prev, start: item.name }));
        }
        if (index === data.length - 1) {
          setTimePeriod((prev) => ({ ...prev, end: item.name }));
        }
        return {
          month: item.name || "",
          desktop: item.length || 0,
        };
      });
      setChartData(newChartData);
    }
  }, [data, chartData]);

  useEffect(() => {
    laodChartBar();
  }, [data]);

  const userSortData = [
    {
      name: "Week",
      api: "/api/traffic/week",
    },
    {
      name: "Month",
      api: "/api/traffic/month",
    },
    {
      name: "Year",
      api: "/api/traffic/year",
    },
  ];
  const handleSortApiReq = async (api: string, name: string) => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      setSortName(name);
      const { data } = await axios.get(api);

      setData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#a61fcc",
    },
  } satisfies ChartConfig;

  return (
    <MaxWidthWrapper classNames="mt-10 px-5">
      <SortDropDown
        sortData={userSortData}
        sortName={sortName}
        handleSortApiReq={handleSortApiReq}
        isLoading={isLoading}
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
        <>
          {sortName === "Week" ? (
            <span className="flex gap-2 items-center text-base font-semibold text-gray-700 mt-2">
              Statistics from {timePeriod.start} to {timePeriod.end}
              <ChartNoAxesCombined />
            </span>
          ) : sortName === "Month" ? (
            <span className="flex gap-2 items-center text-base font-semibold text-gray-700 mt-2">
              Statistics of 30 days
              <ChartNoAxesCombined />
            </span>
          ) : sortName === "Year" ? (
            <span className="flex gap-2 items-center text-base font-semibold text-gray-700 mt-2">
              Statistics of 1 Year
              <ChartNoAxesCombined />
            </span>
          ) : null}
          <Card className="mt-5">
            <CardContent>
              <ChartContainer
                config={chartConfig}
                className="min-h-[200px] w-full"
              >
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
        </>
      )}
    </MaxWidthWrapper>
  );
}
