import React, { ReactElement } from "react";
import styled from "styled-components";
import { Button } from "./Button";

const ModalContainer = styled.div`
  z-index: 0;
  position: fixed;
  top: 200px;
  width: 500px;
  background-color: white;
  border: 1px solid black;
  border-radius: 3px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
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
      <Button onClick={onClose}>Close</Button>
    </ModalContainer>
  );
}
