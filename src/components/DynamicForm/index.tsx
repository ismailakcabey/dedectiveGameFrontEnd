import { IDynamicForm } from '../../models/common';
import { SaveOutlined } from '@ant-design/icons';
import { Col, Form, Row } from 'antd';
import ModalActionBtns from '../Buttons/action-btn/index';
import { memo, useEffect } from 'react';
import './index.scss';

const DynamicForm = ({
  formFields,
  initialValues,
  onFinish,
  cancel,
  isEdit,
  isLoading,
  form,
  stepButtons,
  className,
  selectedType,
  isHiddenBtn = false,
  btnSize = 'middle',
  btnText = 'Kaydet',
  btnIcon = <SaveOutlined />,
}: IDynamicForm) => {
  useEffect(() => {
    if (initialValues) {
      form!.setFieldsValue(initialValues);
    }
  }, [initialValues]);

  return (
    <Form
      form={form}
      name="basic"
      layout="vertical"
      initialValues={initialValues}
      onFinish={onFinish}
      autoComplete="off"
      className={`mt-2 dynamic-forms ${className}`}
    >
      <Row gutter={[16, 16]}>
        {formFields
          .filter((field:any) => field.type === undefined || field.type === selectedType)
          .map((field:any, index:any) => {
            return (
              <Col {...field.responsive} key={index}>
                <Form.Item
                  className="mb-0"
                  name={field.name}
                  label={field.label}
                  rules={field.rules}
                  valuePropName={field.valuePropName}
                >
                  {field.component}
                </Form.Item>
              </Col>
            );
          })}
      </Row>
      <Form.Item >
        {stepButtons ? (
          stepButtons
        ) : (
          <ModalActionBtns
            className="justify-end"
            cancel={cancel}
            buttons={[
              {
                type: 'primary',
                isEditable: isEdit,
                htmlType: 'submit',
                icon: btnIcon,
                isLoading: isLoading,
                hidden: isHiddenBtn,
                btnSize,
                text: btnText,
              },
            ]}
          />
        )}
      </Form.Item>
    </Form>
  );
};

export default memo(DynamicForm);
