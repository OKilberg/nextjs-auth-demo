import { getHasCorrectLoginCredentials } from "@/data/users";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import styles from "./Login.module.css";
type SearchParams = { [key: string]: string | string[] | undefined };

export default async function Login({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const loginUser = async (formData: FormData) => {
    "use server";
    const username = formData.get("username");
    const password = formData.get("password");

    if (typeof username === "string" && typeof password === "string") {
      const hasCorrectLoginCredentials = getHasCorrectLoginCredentials(
        username,
        password
      );

      /*
      const hasCorrectLoginCredentials =
          usersSingleton.hasCorrectLoginCredentials(username, password);
          */

      if (hasCorrectLoginCredentials) {
        console.log("Logging in as: ", username, password);
        const cookieStore = await cookies();
        cookieStore.set("username", username);
        cookieStore.set("password", password);
        console.log("Login Successful! ", username, password);
        redirect("/profile");
      }

      console.log("Incorrect username or password", username, password);
      redirect("/login?submit=error");
    }
  };

  const mySearchParams = await searchParams;
  const { submit } = mySearchParams;
  const showSuccessMessage = submit === "success";
  const showErrorMessage = submit === "error";

  return (
    <main>
      <div>Login</div>
      <form action={loginUser} className={styles.formLogin}>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" />
        <label htmlFor="password">Password</label>
        <input type="text" name="password" id="password" />
        <input type="submit" disabled={showSuccessMessage} value={"Login"} />
      </form>
      {showSuccessMessage && (
        <div className={styles.messageSuccess}>Success!</div>
      )}
      {showErrorMessage && (
        <div className={styles.messageError}>
          Incorrect username or password.
        </div>
      )}
    </main>
  );
}
