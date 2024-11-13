import images from "@/content/images";
import { sideBarData } from "@/context/sideBarData";
import { Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import MaxWidthWrapper from "./MaxWidthWrapper";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import axios from "axios";

export default function SideBar() {
  const logout = async () => {
    try {
      await axios.get("/api/users/logout-user", {
        withCredentials: true,
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const { pathname } = useLocation();
  return (
    <>
      <MaxWidthWrapper classNames="flex lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <div className="w-12 h-12 rounded-full bg-gray-800 text-white flex items-center justify-center mt-10 mx-6">
              <Menu />
            </div>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>
                <div className="flex items-center gap-3 h-fit">
                  <img
                    src={images.logo}
                    alt="Logo"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <h3 className="text-gray-600 text-ls font-semibold">
                    High School Prep
                  </h3>
                </div>
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col justify-between">
              <div className="flex flex-col gap-3 mt-10">
                {sideBarData.map(({ id, name, href, icon: Icon }) => {
                  const isActive = pathname === href;
                  return (
                    <Link
                      to={href}
                      key={id}
                      className={`flex items-center gap-3 py-2 px-2 rounded-sm cursor-pointer transition-all group ${
                        isActive
                          ? "bg-purple-600 hover:opacity-90"
                          : "bg-gray-200 hover:bg-gray-300"
                      } `}
                    >
                      <div className="text-gray-500">
                        {Icon && (
                          <Icon
                            className={`w-5 h-5 ${
                              isActive ? "text-white" : "text-gray-500"
                            }`}
                          />
                        )}
                      </div>
                      <span
                        className={`${
                          isActive ? "text-white" : "text-gray-500"
                        }`}
                      >
                        {name}
                      </span>
                    </Link>
                  );
                })}
              </div>
              <Button onClick={logout} className="mb-5">
                Logout
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </MaxWidthWrapper>
      <div className="hidden lg:flex flex-col flex-[1] shadow-lg border-r border-gray-100 sticky top-0 h-screen px-6 py-4 bg-gray-50">
        <div className="flex items-center gap-3 h-fit">
          <img
            src={images.logo}
            alt="Logo"
            className="w-10 h-10 rounded-full object-cover"
          />
          <h3 className="text-gray-600 text-ls font-semibold">
            High School Prep
          </h3>
        </div>
        <div className="flex flex-col justify-between h-screen">
          <div className="mt-7 flex flex-col gap-2">
            {sideBarData.map(({ id, name, href, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <Link
                  to={href}
                  key={id}
                  className={`flex items-center gap-3 py-2 px-2 rounded-sm cursor-pointer transition-all group ${
                    isActive
                      ? "bg-purple-600 hover:opacity-90"
                      : "bg-gray-200 hover:bg-gray-300"
                  } `}
                >
                  <div className="text-gray-500">
                    {Icon && (
                      <Icon
                        className={`w-5 h-5 ${
                          isActive ? "text-white" : "text-gray-500"
                        }`}
                      />
                    )}
                  </div>
                  <span
                    className={`${isActive ? "text-white" : "text-gray-500"}`}
                  >
                    {name}
                  </span>
                </Link>
              );
            })}
          </div>
          <Button onClick={logout} className="mb-5">
            Logout
          </Button>
        </div>
      </div>
    </>
  );
}
