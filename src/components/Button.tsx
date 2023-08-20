import React, { ReactElement } from "react";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

const StyledButton = styled.button<{ buttonColor: string }>`
  background-color: ${({ buttonColor }: { buttonColor: string }) =>
    buttonColor === "orange" ? "#f7c59f" : "#70C1FF"};
  border: 1px solid white;
  border-radius: 10px;
  padding: 10px;
  color: white;
  cursor: pointer;
  font-family: myFont;
`;

type ButtonProps = {
  color?: string;
  onClick?: () => any;
  children: any;
};

export function Button(props: ButtonProps) {
  const { color = "blue", onClick, children } = props;
  return (
    <StyledButton buttonColor={color} onClick={onClick}>
      {children}
    </StyledButton>
  );
}

type LinkedButtonProps = ButtonProps & {
  link: string;
};

export function LinkedButton(props: LinkedButtonProps) {
  const { children, link } = props;
  return (
    <Link to={link}>
      <StyledButton buttonColor="orange">{children}</StyledButton>
    </Link>
  );
}

const Row = styled.div`
  display: flex;
  gap: 20px;
`;

type ButtonRowProps = {
  children: ReactElement[];
};

export function ButtonRow({ children }: ButtonRowProps) {
  return <Row>{children}</Row>;
}
