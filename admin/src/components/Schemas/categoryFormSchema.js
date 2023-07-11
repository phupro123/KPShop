import { string } from "yup";
import { generateFormSchema } from "../Utils/Helpers";

const categoryFormSchema = () =>
  generateFormSchema({
    name: string().required("The category's name is required.").nullable(),
  });

export { categoryFormSchema };
