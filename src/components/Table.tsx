import React, { ReactElement } from "react";
import styled from "styled-components";
import { Button, ButtonRow } from "./Button";

const TableContainer = styled.table`
  border: 1px solid #ff6b35;
  border-radius: 3px;
  background-color: #f7c59f;
  padding: 20px;
  width: 100%;
  td {
    border: 1px solid gray;
    padding: 10px;
    text-align: center;
  }
  .actions {
    display: flex;
    justify-content: center;
  }
  tr:nth-child(even) {
    background-color: #ffb277;
  }
`;

const TableHeader = styled.thead`
  color: white;
  background-color: #ff6b35;
`;

type TableProps = {
  headerData: string[];
  data: any[] | null;
  button1Text: string;
  button2Text: string;
  button1Action: (obj: any) => void;
  button2Action: (obj: any) => void;
};

export default function Table(props: TableProps) {
  const {
    headerData,
    data,
    button1Text,
    button2Text,
    button1Action,
    button2Action,
  } = props;

  return (
    <TableContainer>
      <TableHeader>
        <tr>
          {headerData.map((hd) => (
            <th key={hd}>{hd}</th>
          ))}
          {<th>Actions</th>}
        </tr>
      </TableHeader>
      <tbody>
        {data &&
          data.map((item: any) => (
            <tr key={item.id}>
              {Object.entries(item)
                .filter((attr: any) => attr[0] !== "id" && attr[0] !== "user")
                .map((attr: any) => {
                  return <td key={attr[0]}>{attr[1]}</td>;
                })}
              <td className="actions">
                <ButtonRow>
                  <Button onClick={() => button1Action(item)}>
                    {button1Text}
                  </Button>
                  <Button onClick={() => button2Action(item)}>
                    {button2Text}
                  </Button>
                </ButtonRow>
              </td>
            </tr>
          ))}
      </tbody>
    </TableContainer>
  );
}
