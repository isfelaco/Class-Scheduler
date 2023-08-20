import React from "react";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: #f7c59f;
  border: 1px solid white;
  border-radius: 10px;
  padding: 10px;
  color: white;
  cursor: pointer;
`;

type ButtonProps = {
  children: any;
};

export function Button(props: ButtonProps) {
  const { children } = props;
  return <StyledButton>{children}</StyledButton>;
}

type LinkedButtonProps = ButtonProps & {
  link: string;
};

export function LinkedButton(props: LinkedButtonProps) {
  const { children, link } = props;
  return (
    <Link to={link}>
      <StyledButton>{children}</StyledButton>
    </Link>
  );
}
