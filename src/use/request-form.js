import {useField, useForm} from "vee-validate";
import * as yup from 'yup';

export function useRequestForm(fn) {
  const {isSubmitting, handleSubmit} = useForm({
    initialValues: {
      status: 'active'
    }
  });

  const {value: name, errorMessage: nError, handleBlur: nBlur} = useField(
    'name',
    yup.string()
      .trim()
      .required('Имя не может быть пустым')
  );

  const {value: phone, errorMessage: pError, handleBlur: pBlur} = useField(
    'phone',
    yup.string()
      .trim()
      .required('Телефон не может быть пустым')
  );

  const {value: amount, errorMessage: aError, handleBlur: aBlur} = useField(
    'amount',
    yup.number()
      .required('Введите сумму')
      .min(0, 'Сумма не может быть меньше нуля')
  );

  const {value: status} = useField('status');

  const onSubmit = handleSubmit(fn)

  return {
    status,
    isSubmitting,
    onSubmit,
    name,
    nBlur,
    nError,
    phone,
    pBlur,
    pError,
    amount,
    aError,
    aBlur
  }
}