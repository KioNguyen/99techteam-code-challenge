import { PlusOutlined, SyncOutlined } from "@ant-design/icons";
import { Button, Flex, Space } from "antd";
import React, { ChangeEvent, useEffect } from "react";

import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import Search from "antd/es/input/Search";
import VehicleList from "../components/vehicle-list";
import VehicleModal from "../components/vehicle-modal";
import withLayout from "../components/with-layout";
import { VEHICLES_QUERY_KEY } from "../constant/query-keys";
import { getVehicles } from "../service/vehicle.service";
import { useStore } from "../store";

const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { setVehicles, setSearchKey, searchKey, setVehiclesLoading } =
    useStore();
  const [inputValue, setInputValue] = React.useState("");
  const debouncedSearchTerm = useDebounce(inputValue, 300);
  const { refetch, isRefetching } = useQuery({
    queryKey: [VEHICLES_QUERY_KEY],
    queryFn: () => getVehicles(searchKey),
    onSuccess: (res) => {
      if (res.data) {
        setVehicles(res.data);
        setVehiclesLoading(false);
      }
    },
  });
  useEffect(() => {
    setSearchKey(debouncedSearchTerm);
  }, [debouncedSearchTerm, setSearchKey]);
  const refreshList = () => {
    refetch();
    setVehiclesLoading(true);
  };

  const onSearch = () => {
    if (!searchKey) return;
    refetch();
    setVehiclesLoading(true);
  };
  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  return (
    <div>
      <h1>Vehicle Management</h1>
      <Flex justify="space-between" gap={10} style={{ marginBottom: 10 }}>
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          loading={isRefetching}
          onChange={onSearchChange}
          style={{ width: 200 }}
        />
        <Space size={10}>
          <Button
            type="primary"
            onClick={() => setIsModalOpen(true)}
            color="default"
            icon={<PlusOutlined />}
          >
            Create Vehicle
          </Button>
          <Button
            type="primary"
            onClick={refreshList}
            variant="text"
            color="default"
            icon={<SyncOutlined />}
          >
            Refresh
          </Button>
        </Space>
      </Flex>
      <VehicleList />
      <VehicleModal
        isOpen={isModalOpen}
        onChangeOpen={() => {
          setIsModalOpen(!isModalOpen);
        }}
      />
    </div>
  );
};

const WrappedHome = withLayout(Home);
export default WrappedHome;
