import { EKEYS } from '../config/index';
import { type IConfig} from '../models/common';
import { type IUser } from '../models/user';
import { atom } from 'recoil';
import { LocalStorageUtils } from '../utils/localstorage';

const initialState: IConfig = {
  user: (LocalStorageUtils.getItem(EKEYS.userKey) as IUser) || {},
};

export const configState = atom({
  key: 'configState',
  default: initialState,
});
