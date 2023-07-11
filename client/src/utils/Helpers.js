import { object } from "yup";

const setDocumentTitle = (title) => {
  window.document.title = `${title} - KPShop`;
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const generateFormSchema = (shape) => object().shape(shape);

export { setDocumentTitle, generateFormSchema };
