
import { ILoginParams, ILoginResult } from '../../models/login';
import { APIS } from '../index';
import { useCreate, useGet } from '../request';

export const useLogin = () => {
  return useCreate<ILoginParams,ILoginResult>(APIS.AUTH.LOGIN);
};


export const useMe = () => {
  return useGet<any>("ME",APIS.AUTH.ME);
}
