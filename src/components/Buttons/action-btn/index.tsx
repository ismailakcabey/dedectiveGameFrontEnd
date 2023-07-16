import { Button } from 'antd';
import { ButtonType } from 'antd/es/button';
import React from 'react';

interface IBtns {
  text?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  isLoading?: boolean;
  htmlType?: 'submit' | 'button' | 'reset';
  type?: ButtonType;
  danger?: boolean;
  isEditable?: boolean;
  hidden?: boolean;
  btnSize?: 'small' | 'middle' | 'large';
  btnText?: string;
}

interface IProps {
  buttons: IBtns[];
  cancel?: () => void;
  className?: string;
}

const ModalActionBtns = ({ buttons, cancel, className }: IProps) => {
  const defaultCancelBtn: IBtns = {
    text: 'İptal',
    type: 'text',
    onClick: () => cancel && cancel(),
  };

  if (cancel) {
    buttons.unshift(defaultCancelBtn);
  }

  return (
    <div className={`flex items-center justify-end mt-5 ${className}`}>
      {buttons.map((btn, index) => (
        <Button
          key={index}
          onClick={btn.onClick}
          className="ml-2"
          type={btn.type}
          icon={btn.icon}
          htmlType={btn.htmlType}
          loading={btn.isLoading}
          danger={btn.danger}
          hidden={btn.hidden}
          size={btn.btnSize}
        >
          {!btn.text ? (btn.isEditable ? 'Güncelle' : 'Kaydet') : btn.text}
        </Button>
      ))}
    </div>
  );
};

export default ModalActionBtns;
