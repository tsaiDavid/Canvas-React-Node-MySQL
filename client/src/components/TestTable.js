import * as React from "react";
import { Table, Column, Cell } from "@blueprintjs/table";

const renderCell = rowIndex => {
  return <Cell>{`$${(rowIndex * 10).toFixed(2)}`}</Cell>;
};

export default class TestTable extends React.Component {
  render() {
    return (
      <Table numRows={10}>
        <Column name="Dollars" renderCell={renderCell} />
      </Table>
    );
  }
}
