import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Dispatch, SetStateAction } from "react";
import { Popover, PopoverContent } from "./ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";

type Props = {
  sortData: {
    name: string;
    api: string;
  }[];
  handleSortApiReq: (api: string, name: string) => void;
  sortName: string;
  userTypeData?: {
    one: { name: string; api: string; id: string };
    two: { name: string; api: string; id: string };
  }[];
  setTypesData?: Dispatch<SetStateAction<{ order: string; type: string }>>;
  typesData?: { order: string; type: string };
  isLoading: boolean;
};

export default function pDown({
  sortData,
  handleSortApiReq,
  sortName,
  isLoading,
  userTypeData,
  setTypesData,
  typesData,
}: Props) {
  const handleTypes = (e: string) => {
    const typesDataParse = JSON.parse(e);
    if (typesDataParse.id === "1" || typesDataParse.id === "2") {
      // @ts-ignore
      setTypesData((prev) => ({ ...prev, order: typesDataParse.api }));
    } else if (typesDataParse.id === "3" || typesDataParse.id === "4") {
      // @ts-ignore
      setTypesData((prev) => ({ ...prev, type: typesDataParse.api }));
    }
  };

  return (
    <div className="flex justify-between items-center">
      {/* Sort By Dates */}
      <DropdownMenu>
        <DropdownMenuTrigger disabled={isLoading} asChild>
          <Button disabled={isLoading}>
            {sortName} <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[150px]">
          <DropdownMenuLabel>Pick the date</DropdownMenuLabel>
          {sortData.map((item, index) => (
            <div key={index}>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleSortApiReq(item.api, item.name)}
              >
                {item.name}
              </DropdownMenuItem>
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Sort By Types */}
      {typesData && (
        <Popover>
          <PopoverTrigger asChild>
            <Button>
              Types <ChevronDown />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] sm:w-[350px] flex items-center justify-center flex-col mr-2">
            {userTypeData?.map((item, index) => (
              <div key={index}>
                <RadioGroup
                  onValueChange={(e) => handleTypes(e)}
                  className={`flex gap-2 ${index === 0 && "mb-5"}`}
                >
                  <div className="flex items-center space-x-1 w-[100px] sm:w-[150px]">
                    <RadioGroupItem
                      checked={
                        item.one.api === typesData.order ||
                        item.one.api === typesData.type
                      }
                      value={JSON.stringify({
                        api: item.one.api,
                        id: item.one.id,
                      })}
                      id={item.one.id}
                    />
                    <Label
                      htmlFor={item.one.id}
                      className="text-base text-gray-800 font-normal"
                    >
                      {item.one.name}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-1 w-[100px] sm:w-[150px]">
                    <RadioGroupItem
                      checked={
                        item.two.api === typesData.order ||
                        item.two.api === typesData.type
                      }
                      value={JSON.stringify({
                        api: item.two.api,
                        id: item.two.id,
                      })}
                      id={item.two.id}
                    />
                    <Label
                      htmlFor={item.two.id}
                      className="text-base text-gray-800 font-normal"
                    >
                      {item.two.name}
                    </Label>
                  </div>
                </RadioGroup>
                {index === 0 && (
                  <div className="w-full h-[1px] rounded-full bg-gray-300 mb-3"></div>
                )}
              </div>
            ))}
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}
