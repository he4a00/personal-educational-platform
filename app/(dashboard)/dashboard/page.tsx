"use client";

import { useUserContext } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user, loading }: any = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!user) {
      router.push("/");
    } else if (user?.user?.type !== "teacher") {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>; // or a loading spinner
  }

  if (!user || user?.user?.type !== "teacher") {
    return null; // or a redirect to home
  }

  return <></>;
}
