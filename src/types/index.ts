export type Rank = "White" | "Yellow" | "Orange" | "Green" | "Blue" | "Purple" | "Brown" | "Black";

export interface Student {
  id: string;
  userId: string;
  name: string;
  email: string;
  rank: Rank;
  joinedAt: string;
  isActive: boolean;
  attendanceCount: number;
  qrCode: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  timestamp: any;
  classType: string;
  instructorId: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "Uniforms" | "Belts" | "Sparring Gear" | "Accessories";
  imageUrl: string;
  stock: number;
}

export interface Order {
  id: string;
  studentId: string;
  items: Array<{
    productId: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  totalPrice: number;
  status: "Pending" | "Paid" | "Fulfilled" | "Cancelled";
  createdAt: any;
}

export interface ClassSchedule {
  id: string;
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
  startTime: string;
  endTime: string;
  className: string;
  instructor: string;
  level: string;
}

export interface Instructor {
  id: string;
  name: string;
  bio: string;
  rank: string;
  imageUrl: string;
}
