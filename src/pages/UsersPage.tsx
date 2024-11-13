import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import UserPageChart from "@/components/UserPageChart";
import UserPageList from "@/components/UserPageList";
import { useState } from "react";
import { UsersChartData, UserType } from "./utils/type";

export default function UsersPage() {
  const [data, setData] = useState<null | UserType>(null);
  const [usersData, setUsersData] = useState<UsersChartData | null>(null);

  return (
    <MaxWidthWrapper classNames="mt-10 px-5">
      <UserPageChart
        usersData={usersData}
        setUsersData={setUsersData}
        setData={setData}
      />
      <div className="my-14 w-full h-[2px] rounded-full bg-gray-300" />
      <UserPageList setData={setData} data={data} setChartData={setUsersData} />
    </MaxWidthWrapper>
  );
}
