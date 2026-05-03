import { DatePicker as AntdDatePicker } from 'antd';
import type { DatePickerProps as AntdDatePickerProps } from 'antd';

const { RangePicker: AntdRangePicker } = AntdDatePicker;

export type DatePickerProps = AntdDatePickerProps;
export type { RangePickerProps } from 'antd/es/date-picker';

export const DatePicker = AntdDatePicker;
export const RangePicker = AntdRangePicker;

export default DatePicker;
