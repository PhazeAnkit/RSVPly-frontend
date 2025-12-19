"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authApi } from "@/features/auth/auth.api";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function LoginPage() {
  const router = useRouter();
  const loginStore = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      const res = await authApi.login(data);
      loginStore.login({
        user: res.data.data.user,
        token: res.data.data.accessToken,
      });
      toast.success("Logged in successfully");
      router.push("/events");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <h1 className="text-2xl font-semibold text-center">Login to RSVPly</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input placeholder="Email" {...register("email")} />
        <Input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        <Button className="w-full" disabled={isSubmitting}>
          Login
        </Button>
      </form>

      <p className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="/register" className="underline">
          Register
        </a>
      </p>
    </div>
  );
}
