import {
  User,
  CircleDollarSign,
  BookOpenText,
  ChartNoAxesColumnIncreasing,
} from "lucide-react";

type SideBarItem = {
  id: number;
  name: string;
  icon?: React.ComponentType<any>;
  href: string;
};

export const sideBarData: SideBarItem[] = [
  {
    id: 1,
    name: "Users",
    href: "/users",
    icon: User,
  },
  {
    id: 2,
    name: "Payments",
    href: "/payments",
    icon: CircleDollarSign,
  },
  {
    id: 3,
    name: "Career Forms",
    href: "/career-forms",
    icon: BookOpenText,
  },
  {
    id: 4,
    name: "Traffic",
    href: "/traffic",
    icon: ChartNoAxesColumnIncreasing,
  },
];
