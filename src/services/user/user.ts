

import { IUser,IUserParams } from '../../models/user';
import { APIS } from '../index';
import { useCreate, useGet } from '../request';


export const useUser = () => {
  return useCreate<IUserParams,IUser>(APIS.USER.USER)
}
