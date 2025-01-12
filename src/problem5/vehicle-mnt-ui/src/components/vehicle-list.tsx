import {
  DeleteOutlined,
  EditOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Flex,
  Popconfirm,
  Table,
  Tag,
  Tooltip,
  Typography,
  message,
} from "antd";
import React, { useState } from "react";

import type { TableProps } from "antd";
import Highlighter from "react-highlight-words";
import { VEHICLES_QUERY_KEY } from "../constant/query-keys";
import { deleteVehicle } from "../service/vehicle.service";
import { useStore } from "../store";
import VehicleModal from "./vehicle-modal";

interface DataType {
  id: string;
  type: string;
  make: string;
  model: string;
  year: number;
}

const VehicleList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<DataType | null>(null);
  const { searchKey, vehiclesLoading, vehicles, setVehiclesLoading } =
    useStore();
  const queryClient = useQueryClient();

  const { mutate: deleteMutation } = useMutation({
    mutationFn: deleteVehicle,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [VEHICLES_QUERY_KEY] });
      setVehiclesLoading(true);
      message.success({ content: "Vehicle deleted" });
    },
    onError: (error: Error) => {
      message.error({ content: error.message });
    },
  });

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Branch",
      dataIndex: "make",
      key: "make",
      render: (make) => (
        <Typography.Link>
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[searchKey]}
            autoEscape
            textToHighlight={make ? make.toString() : ""}
          />
        </Typography.Link>
      ),
    },
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
      render: (model) => (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchKey]}
          autoEscape
          textToHighlight={model ? model.toString() : ""}
        />
      ),
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      render: (year) => (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchKey]}
          autoEscape
          textToHighlight={year ? year.toString() : ""}
        />
      ),
    },
    {
      title: "Type",
      key: "type",
      dataIndex: "type",
      render: (_, { type }) => {
        let color = type === "car" ? "geekblue" : "green";
        if (type === "loser") {
          color = "volcano";
        }
        return (
          <Tag color={color} key={type}>
            <Highlighter
              highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
              searchWords={[searchKey]}
              autoEscape
              textToHighlight={type ? type.toString() : ""}
            />
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      width: 200,
      render: (_, record) => (
        <Flex wrap gap="small">
          <Tooltip title="Edit">
            <Button
              variant="text"
              color="default"
              icon={<EditOutlined />}
              onClick={() => {
                setSelectedVehicle(record);
                setIsModalOpen(true);
              }}
            />
          </Tooltip>
          <Popconfirm
            title="Delete the Vehicle"
            description="Are you sure to delete this Vehicle?"
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            onConfirm={() => {
              setVehiclesLoading(true);
              deleteMutation(record.id);
            }}
          >
            <Tooltip title="Delete">
              <Button variant="text" color="danger" icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
        </Flex>
      ),
    },
  ];
  return (
    <>
      <Table<DataType>
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={vehicles}
        loading={vehiclesLoading}
      />
      <VehicleModal
        isOpen={isModalOpen}
        onChangeOpen={() => {
          setIsModalOpen(!isModalOpen);
          setSelectedVehicle(null);
        }}
        vehicleId={selectedVehicle?.id}
      />
    </>
  );
};

export default VehicleList;
