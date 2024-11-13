import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import SortDropDown from "@/components/SortDropDown";
import axios from "axios";
import { useEffect, useState } from "react";
import { CareerType } from "./utils/type";
import { Button } from "@/components/ui/button";
import fileDowload from "js-file-download";

export default function CareerForms() {
  const [sortName, setSortName] = useState<string>("Sort");
  const [data, setData] = useState<CareerType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPdfLoading, setIsPdfLoading] = useState<boolean>(false);

  const userSortData = [
    {
      name: "Today",
      api: "/api/career-forms/today",
    },
    {
      name: "Week",
      api: "/api/career-forms/week",
    },
    {
      name: "Month",
      api: "/api/career-forms/month",
    },
    {
      name: "Year",
      api: "/api/career-forms/year",
    },
  ];

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("/api/career-forms/getAll")
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

  const handleDonwloadResume = async (resumeLink: string) => {
    setIsPdfLoading(true);
    if (resumeLink) {
      try {
        const response = await fetch(resumeLink);
        if (!response.ok) {
          console.log("Something went wrong" + response.status);
          return;
        }
        const result = await response.blob();
        fileDowload(result, `${Date.now()}.pdf`);
      } catch (error) {
        console.log(error);
      } finally {
        setIsPdfLoading(false);
      }
    }
  };
  return (
    <MaxWidthWrapper classNames="mt-10 px-5">
      <SortDropDown
        isLoading={isLoading}
        sortData={userSortData}
        sortName={sortName}
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
        <div className="w-full mt-6 flex flex-col gap-6 md:gap-3">
          {data?.map((form) => (
            <div
              key={form._id}
              className="w-full rounded-md bg-gray-100 flex gap-1 overflow-hidden flex-col md:flex-row"
            >
              <div className="flex-1 flex-col">
                <div className="bg-gray-800 h-5 w-full text-white text-sm flex items-center justify-center">
                  Canditate Info
                </div>
                <div className="flex gap-8 px-2 py-1 max-md:justify-center">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1 text-sm text-gray-800">
                      <span className="font-medium">First Name</span>
                      <span>{form.firstName}</span>
                    </div>
                    <div className="flex flex-col gap-1 text-sm text-gray-800">
                      <span className="font-medium">Last Name</span>
                      <span>{form.lastName}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 text-sm text-gray-800">
                    <div className="flex flex-col gap-1">
                      <span className="font-medium">Email</span>
                      <span>{form.email}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-medium">Contact</span>
                      <span>{form.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex-col">
                <div className="bg-gray-800 h-5 w-full text-white text-sm flex items-center justify-center">
                  Location & Position
                </div>
                <div className="flex gap-3 px-2 py-1 max-md:justify-center">
                  <div className="flex col gap-8 text-sm text-gray-800">
                    <div className="flex flex-col gap-1">
                      <span className="font-medium">City</span>
                      <span>{form.city}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-medium">Applied Position</span>
                      <span>{form.position}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex-col items-center w-full">
                <div className="bg-gray-800 h-5 w-full text-white text-sm flex items-center justify-center">
                  Resume
                </div>
                <Button
                  disabled={isPdfLoading}
                  type="button"
                  onClick={() => handleDonwloadResume(form.resume)}
                  className="px-6 py-6 text-sm font-normal flex my-2 mx-auto"
                >
                  Download <br /> Resume / CV
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </MaxWidthWrapper>
  );
}
