import React from "react";
import Layout from "../components/layout";

const withLayout = (Component: React.FC, useLayout: boolean = true) => {
  return (props: typeof Component.propTypes) => {
    if (useLayout) {
      return (
        <Layout>
          <Component {...props} />
        </Layout>
      );
    }
    return <Component {...props} />;
  };
};

export default withLayout;
