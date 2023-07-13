import { FormInstance } from 'antd';
import { TablePaginationConfig } from 'antd';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { IUser } from './user';


export interface IConfig {
    user: IUser;
  }

export interface IDynamicForm {
    formFields: formFields[];
    selectedType?: number | null;
    onFinish?: (values: any) => void;
    cancel?: () => void;
    isEdit?: boolean;
    isLoading?: boolean;
    initialValues?: any;
    form?: FormInstance;
    stepButtons?: React.ReactNode;
    className?: string;
    isHiddenBtn?: boolean;
    btnText?: string;
    btnIcon?: React.ReactNode;
    btnSize?: 'small' | 'middle' | 'large';
  }

  export  interface formFields {
    label: string;
    name: string;
    component: React.ReactNode;
    responsive: any;
    rules: { required?: boolean; message?: string }[];
    type?: number;
    children?: formFields[];
    hide?: boolean;
    valuePropName?: string;
    disabled?: boolean;
  }

  export interface ITableQueryParams<T> {
    pagination: TablePaginationConfig;
    filters?: Record<string, FilterValue | null>;
    sorter?: SorterResult<T> | SorterResult<T>[];
    include?: string[];
    typeWithFilters?: string[];
  }
  
  export interface IListComponents {
    className?: string;
    onChange?: (value: any, item: any) => void;
    value?: any;
    maxTagCount?: number;
    showSearch?: boolean;
    mode?: 'multiple' | 'tags';
    allowClear?: boolean;
    disabled?: boolean;
  }
  