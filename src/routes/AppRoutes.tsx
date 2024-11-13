import SideBar from "@/components/SideBar";
import CareerForms from "@/pages/CareerForms";
import PaymentPage from "@/pages/PaymentPage";
import Traffic from "@/pages/Traffic";
import UsersPage from "@/pages/UsersPage";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function Layout() {
  const loginSchema = z.object({
    email: z.string().min(1, { message: "Email is required" }),
    password: z.string().min(1, { message: "Password is required" }),
  });

  type LoginSchema = z.infer<typeof loginSchema>;

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [customError, setCustomError] = useState<string>("");
  const { pathname } = useLocation();
  useEffect(() => {
    axios
      .get("/api/users/check-admin")
      .then(({ data }) => {
        if (data.success) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsAdmin(false);
      })
      .finally(() => {
        setIsLoading(false); // Set loading to false once the API call is complete
      });
  }, [pathname]);

  if (isLoading) {
    return <div>Loading...</div>; // Show loading while checking admin status
  }

  const onSubmit = async (values: LoginSchema) => {
    setCustomError("");
    try {
      const { data } = await axios.post("/api/users/login-admin", {
        ...values,
      });
      if (data.success) {
        setIsAdmin(true);
      } else {
        setCustomError("Email or password is wrong");
      }
    } catch (error) {
      console.log(error);
      setCustomError("Something went wrong try again");
    }
  };

  if (!isAdmin) {
    return (
      <div className="w-full h-screen bg-black/30 flex justify-center">
        <div className="flex flex-col max-w-2xl w-full h-fit p-2 rounded-lg bg-black/30 mt-10">
          <div className="w-full h-full bg-white p-4 rounded-md flex flex-col gap-2">
            <h1 className="text-lg font-medium text-gray-800 text-center">
              Admin Login
            </h1>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {customError && (
                  <p className="text-sm text-red-500 mt-2">{customError}</p>
                )}
                <Button className="mt-4">Login</Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    ); // Show error message if not an admin
  }

  return (
    <div className="flex gap-2 w-full min-h-screen flex-col lg:flex-row">
      <SideBar />
      <div className="flex-[4] overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Layout route */}
      <Route path="/" element={<Layout />}>
        {/* Child routes */}
        <Route path="/" element={<Navigate to="/users" />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="payments" element={<PaymentPage />} />
        <Route path="career-forms" element={<CareerForms />} />
        <Route path="traffic" element={<Traffic />} />
      </Route>
      <Route path="*" element={<Navigate to="/users" />} />
    </Routes>
  );
}
