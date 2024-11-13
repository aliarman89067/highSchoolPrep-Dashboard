export type UserType = {
  _id: string;
  name: string;
  email: string;
  image: string;
  isPremium: boolean;
  packageName: string;
  purchaseAt: Date;
  expiresAt: Date;
  packagePrice: number;
  createdAt: string;
  playedSubUnits: {
    gradeName: string;
    subjectName: string;
    subjectId: string;
    unitId: string;
    unitName: string;
    playedTime: string;
  }[];
}[];

export type CareerType = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  position: string;
  resume: string;
  createdAt: string;
}[];

export type TrafficType = {
  _id: string;
  length: number;
  name: string;
}[];

export type UsersChartData = {
  length: number;
  dayName: string;
  data: UserType;
}[];
