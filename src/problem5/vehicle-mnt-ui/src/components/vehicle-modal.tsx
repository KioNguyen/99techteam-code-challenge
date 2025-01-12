import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Form, Input, InputNumber, Modal, message } from "antd";
import React, { useEffect } from "react";
import {
  VEHICLES_QUERY_KEY,
  VEHICLE_DETAIL_QUERY_KEY,
} from "../constant/query-keys";
import {
  createVehicle,
  getVehicle,
  updateVehicle,
} from "../service/vehicle.service";

import { VehicleFormDataType } from "../types/vehicle";

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    number: "${label} is not a valid number!",
  },
  number: {
    min: "${label} cannot be less than ${min}!",
  },
};

interface VehicleModalProps {
  isOpen: boolean;
  onChangeOpen: (isOpen: boolean) => void;
  vehicleId?: string;
}

const VehicleModal: React.FC<VehicleModalProps> = ({
  isOpen,
  onChangeOpen,
  vehicleId,
}: VehicleModalProps) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate: mutateCreate } = useMutation({
    mutationFn: createVehicle,
    onSuccess: () => {
      onChangeOpen(false);
      form.resetFields();
      queryClient.refetchQueries({ queryKey: [VEHICLES_QUERY_KEY] });
      message.success({ content: "Vehicle created" });
    },
    onError: (error: Error) => {
      message.error({ content: error.message });
    },
  });
  const { isLoading: isUpdating, mutate: mutateUpdate } = useMutation({
    mutationFn: updateVehicle,
    onSuccess: () => {
      onChangeOpen(false);
      form.resetFields();
      queryClient.refetchQueries({ queryKey: [VEHICLES_QUERY_KEY] });
      message.success({ content: "Vehicle updated" });
    },
    onError: (error: Error) => {
      message.error({ content: error.message });
    },
  });
  const { isLoading, isFetching } = useQuery({
    queryKey: [VEHICLE_DETAIL_QUERY_KEY, vehicleId],
    queryFn: () => getVehicle(vehicleId ?? ""),
    enabled: !!vehicleId,
    onSuccess: (response) => {
      form.setFieldsValue({ vehicle: response.data });
    },
  });

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    onChangeOpen(false);
    form.resetFields();
  };

  const onFinish = (values: VehicleFormDataType) => {
    if (vehicleId) {
      mutateUpdate({ ...values.vehicle, id: vehicleId });
      return;
    }
    mutateCreate(values.vehicle);
  };

  const handleAfterClose = () => {
    queryClient.cancelQueries({ queryKey: ["VEHICLES_QUERY_KEY", vehicleId] });
  };

  useEffect(() => {
    if (!isOpen || !vehicleId) {
      form.resetFields();
    }
  }, [form, isOpen, vehicleId]);

  return (
    <Modal
      title={vehicleId ? "Edit Vehicle" : "Create Vehicle"}
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okButtonProps={{ loading: isCreating || isUpdating }}
      loading={!!vehicleId && (isLoading || isFetching)}
      afterClose={handleAfterClose}
    >
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        style={{ maxWidth: 600, marginTop: 20 }}
        validateMessages={validateMessages}
        form={form}
      >
        <Form.Item
          name={["vehicle", "type"]}
          label="Type"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["vehicle", "make"]}
          label="Make"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["vehicle", "model"]}
          label="Modal"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["vehicle", "year"]}
          label="Year"
          rules={[{ required: true, type: "number", min: 1900 }]}
        >
          <InputNumber />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default VehicleModal;
