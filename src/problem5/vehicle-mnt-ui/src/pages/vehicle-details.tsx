import React from "react";
import { useParams } from "react-router-dom";
import withLayout from "../components/with-layout";

const VehicleDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>Vehicle Details for {id}</h1>
      {/* Add details display logic here */}
    </div>
  );
};

const WrappedVehicleDetails = withLayout(VehicleDetails);
export default WrappedVehicleDetails;
