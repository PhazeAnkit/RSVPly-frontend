"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authApi } from "@/features/auth/auth.api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const schema = z.object({
  userName: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  Location: z.string().min(2),
  contactNumber: z.string().min(6),
});

export default function RegisterPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      await authApi.register(data);
      toast.success("Account created. Please login.");
      router.push("/login");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <h1 className="text-2xl font-semibold text-center">
        Create your RSVPly account
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input placeholder="Username" {...register("userName")} />
        <Input placeholder="Email" {...register("email")} />
        <Input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        <Input placeholder="Location" {...register("Location")} />
        <Input placeholder="Contact Number" {...register("contactNumber")} />

        <Button className="w-full" disabled={isSubmitting}>
          Register
        </Button>
      </form>

      <p className="text-center text-sm">
        Already have an account?{" "}
        <a href="/login" className="underline">
          Login
        </a>
      </p>
    </div>
  );
}
