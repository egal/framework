import {
  Create,
  Form,
  Input,
  Select,
  useForm,
  useSelect,
} from "@pankod/refine-antd";
import { IProduct } from "../../interfaces/Product";

export const ProductCreate = () => {
  const { formProps, saveButtonProps } = useForm<IProduct>();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Create>
  );
};
