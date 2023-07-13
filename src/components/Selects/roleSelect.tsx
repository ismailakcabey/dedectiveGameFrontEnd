
import { Select } from 'antd';
import { IListComponents } from '../../models/common';

const RoleListCmp = ({
  className,
  onChange,
  value,
  maxTagCount,
  mode,
  allowClear,
  showSearch = true,
  disabled,
}: IListComponents) => {
  


  return (
    <Select
      mode={mode}
      maxTagCount={maxTagCount}
      placeholder="Rol Seç"
      allowClear={allowClear}
      showSearch={showSearch}
      className={className}
      onChange={onChange}
      disabled={disabled}
      value={value}
      options={[
        {
          value: 'admin',
          label: 'admin',
        },
        {
          value: 'user',
          label: 'user',
        },
      ]}
    />
  );
};

export default RoleListCmp;
