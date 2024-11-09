import { cookies } from "next/headers";
import styles from "./Register.module.css";
import { redirect } from "next/navigation";
type SearchParams = { [key: string]: string | string[] | undefined };

export default async function Register({searchParams}:{searchParams: SearchParams}) {
  const registerUser = async (formData: FormData) => {
    "use server";
    const username = formData.get("username");
    const password = formData.get("password");

    if (typeof username === "string" && typeof password === "string") {
      const cookieStore = await cookies();
      cookieStore.set("username", username);
      cookieStore.set("password", password);
      console.log("Registered! ", username, password);
      redirect("/register?submit=success");
    }
  };

  const mySearchParams = await searchParams;
  const { submit } = mySearchParams;
  const showSuccessMessage = submit === "success"

  return (
    <main>
      <div>Register</div>
      <form action={registerUser} className={styles.formRegister}>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" />
        <label htmlFor="password">Password</label>
        <input type="text" name="password" id="password" />
        <input type="submit" disabled={showSuccessMessage} value={"Register"} />
      </form>
      {
        showSuccessMessage && <div className={styles.messageSuccess}>Success!</div>
      }
    </main>
  );
}
