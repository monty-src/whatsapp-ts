import React from "react";
import Image from "next/image";
import styled from "styled-components";
import { PropagateLoader } from "react-spinners";
import Logo from "../public/logo.png";

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
        <Image src={Logo} width={200} height={200} alt="" />
        <Loader size={25} color="#3CBC28" />
      </div>
    </center>
  );
};

export default Loading;

const Loader = styled(PropagateLoader)`
  margin-top: 30px;
`;
