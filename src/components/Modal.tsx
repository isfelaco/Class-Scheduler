import React, { ReactElement } from "react";
import styled from "styled-components";

const ModalContainer = styled.div`
  z-index: 0;
  position: fixed;
  top: 200px;
  height: 200px;
  width: 500px;
  background-color: white;
  border: 1px solid black;
`;

type ModalProps = {
  children: ReactElement | ReactElement[];
  onClose: () => void;
};
export default function Modal(props: ModalProps) {
  const { children, onClose } = props;
  return (
    <ModalContainer>
      {children}
      <button onClick={onClose}>Close</button>
    </ModalContainer>
  );
}
