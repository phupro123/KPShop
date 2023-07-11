import { string } from "yup";
import { generateFormSchema } from "../Utils/Helpers";

const brandFormSchema = () =>
  generateFormSchema({
    name: string().required("The brand's name is required.").nullable(),
    category: string().required("The brand's category is required.").nullable(),
  });

export { brandFormSchema };
