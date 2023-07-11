import { string, number } from "yup";
import { generateFormSchema } from "../Utils/Helpers";

const productFormSchema = () =>
  generateFormSchema({
    title: string().required("The product's name is required.").nullable(),
    price: number()
      .typeError("The product's price is positive integer.")
      .integer("The product's price is positive integer.")
      .positive("The product's price is positive integer.")
      .required("The product's price is required.")
      .nullable(),
    info: string().required("The product's info is required.").nullable(),
    discount: number()
      .typeError("The product's discount is positive integer.")
      .integer("The product's discount is positive integer.")
      .positive("The product's discount is positive integer.")
      .required("The product's discount is required.")
      .nullable(),
    category: string()
      .required("The product's category is required.")
      .nullable(),
    brand: string().required("The product's brand is required.").nullable(),
  });

export { productFormSchema };
