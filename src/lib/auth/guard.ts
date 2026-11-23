import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";

export async function requireAdmin() {
  const session = await getSession();
  if (!session || session.user.role !== "admin") {
    redirect("/admin/masuk");
  }
  return session;
}

export async function assertAdmin() {
  const session = await getSession();
  if (!session || session.user.role !== "admin") {
    throw new Error("Unauthorized");
  }
  return session;
}
