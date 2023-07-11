import { number, string } from "yup";
import { generateFormSchema } from "../Utils/Helpers";

const voucherFormSchema = () =>
  generateFormSchema({
    title: string().required("The voucher's title is required.").nullable(),
    name: string().required("The voucher's name is required.").nullable(),
    sale: number()
      .typeError("The voucher's sale is positive integer.")
      .integer("The voucher's sale is positive integer.")
      .positive("The voucher's sale is positive integer.")
      .required("The voucher's sale is required.")
      .nullable(),
    quantity: number()
      .typeError("The voucher's quantity is positive integer.")
      .integer("The voucher's quantity is positive integer.")
      .positive("The voucher's quantity is positive integer.")
      .required("The voucher's quantity is required.")
      .nullable(),
    expiredDate: string()
      .required("The voucher's expired date is required.")
      .nullable(),
    redeemUse: number()
      .typeError("The voucher's redeem use is positive integer.")
      .integer("The voucher's redeem use is positive integer.")
      .positive("The voucher's redeem use is positive integer.")
      .required("The voucher's redeem use is required.")
      .nullable(),
  });

export { voucherFormSchema };
