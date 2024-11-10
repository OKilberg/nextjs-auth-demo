import styles from "./Register.module.css";
import { redirect } from "next/navigation";
import { registerUser as dataRegisterUser } from "@/data/users";
type SearchParams = { [key: string]: string | string[] | undefined };

export default async function Register({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const registerUser = async (formData: FormData) => {
    "use server";
    const username = formData.get("username");
    const password = formData.get("password");

    if (typeof username === "string" && typeof password === "string") {
      const userWasRegistered = dataRegisterUser(username, password);

      if (userWasRegistered) {
        console.log("Registered! ", username, password);
        redirect("/register?submit=success");
      }
      
      console.log("Unable to register user.", username, password);
      redirect("/register?submit=error");
    }
  };

  const mySearchParams = await searchParams;
  const { submit } = mySearchParams;
  const showSuccessMessage = submit === "success";
  const showErrorMessage = submit === "error";

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
      {showSuccessMessage && (
        <div className={styles.messageSuccess}>Success!</div>
      )}
      {showErrorMessage && (
        <div className={styles.messageError}>Could Not Register User.</div>
      )}
    </main>
  );
}
