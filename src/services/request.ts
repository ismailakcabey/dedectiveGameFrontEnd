import { LocalStorageUtils } from '../utils/localstorage';
import { TablePaginationConfig, notification } from 'antd';
import Axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import { EKEYS } from '../config';

interface listParams {
  take?: number;
  skip?: number;
  relations?: string[];
  loadRelationIds?:boolean
  limit?: number;
  offset?: number;
  where?: any;
  order?: string;
  include?: { relation: string }[];
}

export const axios = Axios.create({
  baseURL: '',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axios.interceptors.request.use((config) => {
  const token = LocalStorageUtils.getItem(EKEYS.tokenKey);

  if (token && token !== 'undefined') {
    //@ts-ignore
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// response interceptor
axios.interceptors.response.use(
  (response) => {
    const data = response?.data;

    if (true) {
      return data;
    }
  },
  async (error) => {
    const message = error?.response?.data?.message || error?.message || 'Error!';
    notification.error({
      message: error?.response?.data?.error?.name,
      description: message,
    });

    if (error?.response && error?.response?.status) {
      if ([401, 403].includes(error?.response?.status)) {
        LocalStorageUtils.clear();
        return;
      }
    }

    // throw new Error(error);
    return await Promise.reject(error);
  }
);

const transformPagination = (pagination: TablePaginationConfig) => {
  console.log(pagination);

  const {
    current = pagination?.defaultCurrent || 1,
    pageSize = pagination?.defaultPageSize || 10,
  } = pagination || {};
  const skip = (current - 1) * pageSize;

  const params: {
    limit?: number;
    offset?: number;
    skip?: number;
  } = {
    skip,
    offset: 0,
  };

  if (pagination) {
    params['limit'] = pagination?.pageSize;
  }

  return params;
};


const useGetList = <T>(key: string, url: string, tableParams?: any) => {
  const service = async () => {
    let params: listParams = {};
    params = tableParams
    const data: T = await axios.get(url, {
      params: { 
        query :JSON.stringify(params)
       },
    });

    return data;
  };
  return useQuery(key, async () => await service());
};


const useGet = <T>(key: string, url: string) => {
  let params: listParams = {};
  params = {
    ...transformPagination({
      current: 1,
      pageSize: 100,
    }),
  };
console.log("istek servisinde params yaptı")
  const service = async () => {
    const data: T = await axios.get(url, {
      params: { filter: JSON.stringify(params) },
    });
    return data;
  };
  return useQuery(key, service);
};

const useGetOne = <T>(key: string, url: string, params?: any) => {
  const service = async () => {
    const data: T = await axios.get(`${url}`, params);
    return data;
  };
  return useQuery(key, service);
};

const useGetOneId = <T>(key: string, url: string, id?: string) => {
  const service = async () => {
    const data: T = await axios.get(`${url}/${id}`);
    return data;
  };
  return useQuery(key, service);
};

const useCreate = <T, U>(url: string) => {
  return useMutation(async (params: T) => {
    const data: U = await axios.post(`${url}`, params);
    return data;
  });
};

const useUpdate = <T>(url: string) => {
  return useMutation(async (item: T) => {
    const data: T = await axios.patch(`${url}`, item);
    return data;
  });
};

const usePut = <T>(url: string) => {
  return useMutation(async (item: T) => {
    const data: T = await axios.put(`${url}`, item);
    return data;
  });
};

const usePutWorkingDays = <T>(url: string) => {
  return useMutation(async (item: any) => {
    const providerType = item.providerType;
    const branchId = item.branchId;
    delete item.branchId;
    delete item.providerType;
    const data: T = await axios.put(`${url}/${branchId}/${providerType}`, item);
    return data;
  });
};

const useDelete = <T>(url: string) => {
  return useMutation(async (id: string) => {
    const data: T = await axios.delete(`${url}/${id}`);
    return data;
  });
};

const usePatch = <T>(url: string) => {
  return useMutation(async (param: T) => {
    const data: T = await axios.patch(`${url}`, param);
    return data;
  });
};

const useGetDedective = <T>(key:string,url:string,params:any) => {
  const service = async () => {
    params = {
      where:{}
    }
    const data: T = await axios.get(url, {
      params: {
        query:JSON.stringify(params)
       },
    });
    return data;
  };
  return useQuery(key, service);
}

const useGetIdDedective = <T>(key:string,url:string,id:string)=>{
  const service = async () => {
    const data : T = await axios.get(`${url}/${id}`)
    return data
  }
  return useQuery(key,service)
}

export {
  useGetOne,
  useGetOneId,
  useGet,
  useGetList,
  useUpdate,
  usePut,
  useCreate,
  useDelete,
  usePatch,
  usePutWorkingDays,
  useGetDedective,
  useGetIdDedective
};

export default axios;
