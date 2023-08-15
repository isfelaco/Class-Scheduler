import React from "react";
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
  onView: (obj: any) => void;
  onDelete: (obj: any) => void;
};

export default function Table(props: TableProps) {
  const { headerData, data, onView, onDelete } = props;

  return (
    <TableContainer>
      <thead>
        <tr>
          <th>#</th>
          {headerData.map((hd) => (
            <th key={hd}>{hd}</th>
          ))}
          <th>Actions</th>
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
                <button onClick={() => onView(item)}>View</button>
                <button onClick={() => onDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
      </tbody>
    </TableContainer>
  );
}
