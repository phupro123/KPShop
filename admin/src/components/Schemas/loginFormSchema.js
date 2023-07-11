import { string } from "yup";
import { generateFormSchema } from "../Utils/Helpers";

const loginFormSchema = () =>
  generateFormSchema({
    username: string()
      .required("The email is required.")
      .email("The email is invalid")
      .nullable(),
    password: string().required("The password is required.").nullable(),
  });

export { loginFormSchema };
