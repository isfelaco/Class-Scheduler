import React, { ReactElement } from "react";
import styled from "styled-components";

const TableContainer = styled.table`
  border: 1px solid black;
  padding: 20px;
  td {
    border: 1px solid gray;
    padding: 10px;
  }
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
      <thead>
        <tr>
          <th>#</th>
          {headerData.map((hd) => (
            <th key={hd}>{hd}</th>
          ))}
          {<th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((item: any) => (
            <tr key={item.id}>
              {Object.entries(item).map((attr: any) => {
                return <td key={attr[0]}>{attr[1]}</td>;
              })}
              <td>
                <button onClick={() => button1Action(item)}>
                  {button1Text}
                </button>
                <button onClick={() => button2Action(item)}>
                  {button2Text}
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </TableContainer>
  );
}
