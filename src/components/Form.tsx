import React from "react";
import styled from "styled-components";

const CustomForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  .submit {
    font-family: myFont;
    background-color: #f7c59f;
    border: 1px solid white;
    border-radius: 10px;
    padding: 10px;
    color: white;
    cursor: pointer;
  }
`;

type FormProps = {
  onSubmit: any;
  children: any;
};

export default function Form({ onSubmit, children }: FormProps) {
  return <CustomForm onSubmit={onSubmit}>{children}</CustomForm>;
}
