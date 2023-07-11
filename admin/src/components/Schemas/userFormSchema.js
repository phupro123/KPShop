import { string } from "yup";
import { generateFormSchema } from "../Utils/Helpers";

const userFormSchema = () =>
  generateFormSchema({
    fullname: string().required("The user's full name is required."),
    username: string()
      .required("The user's email is required.")
      .email("The user's email is invalid.")
      .nullable(),
    phone: string()
      .required("The user's phone is required.")
      .matches(/^[0-9]{10}$/, "The user's phone is invalid.")
      .nullable(),
    password: string()
      .when("_id", {
        is: (id) => !id,
        then: () => string().required("The user's password is required."),
      })
      .nullable(),
  });

export { userFormSchema };
