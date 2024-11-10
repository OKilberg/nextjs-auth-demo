import { users } from "@/data/users";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Profile() {
  const logout = async () => {
    "use server";
    console.log("Logout");
    const cookieStore = await cookies();
    cookieStore.delete("username");
    cookieStore.delete("password");
    redirect("/");
  };

  console.log(users)

  return (
    <main>
      <div>Your Auth-Protected Profile Page!</div>
      <form action={logout}>
        <button type="submit">Logout</button>
      </form>
    </main>
  );
}
