import { Form as AntdForm } from 'antd';
import type { FormProps as AntdFormProps, FormItemProps as AntdFormItemProps } from 'antd';

export type FormProps = AntdFormProps;
export type FormItemProps = AntdFormItemProps;
export type { FormInstance } from 'antd';

export const Form = AntdForm;
export const FormItem = AntdForm.Item;

/** Re-export useForm hook */
export const useForm = AntdForm.useForm;

export default Form;
