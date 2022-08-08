import React from "react";
// @ts-ignore: Unreachable code error
import styled from "styled-components";
import { PropagateLoader } from "react-spinners";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      center: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

const Loading = () => {
  return (
    <center style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <div>
        <img src="logo.png" alt="" height={200} />
        <Loader size={25} color="#3CBC28" />
      </div>
    </center>
  );
};

export default Loading;

const Loader = styled(PropagateLoader)`
  margin-top: 30px;
`;
