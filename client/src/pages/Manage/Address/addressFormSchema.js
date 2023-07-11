import { string } from 'yup';
import { generateFormSchema } from '../../../utils/Helpers';

const addressFormSchema = (isRequiredMnemonicName = true) =>
    generateFormSchema({
        fullname: string().required('Vui lòng nhập tên.').nullable(),
        mnemonicName: string()
            .when({
                is: () => isRequiredMnemonicName,
                then: () => string().required('Vui lòng nhập tên gợi nhớ.'),
            })
            .nullable(),
        phone: string()
            .required('Vui lòng nhập số điện thoại.')
            .matches(/^[0-9]{10}$/, 'Số điện thoại không hợp lệ.')
            .nullable(),
        address: string().required('Vui lòng nhập địa chỉ.').nullable(),
    });

export { addressFormSchema };
