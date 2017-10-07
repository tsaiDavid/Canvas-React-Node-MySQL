import React, { Component } from "react";
import { Table, Column, Cell } from '@blueprintjs/table';
import "@blueprintjs/table/dist/table.css";

const renderCell = rowIndex => {
  return <Cell>{`$${(rowIndex * 10).toFixed(2)}`}</Cell>;
};

export default class TestTable extends Component {
  render() {
    return (
      <Table numRows={10}>
        <Column name="Dollars" renderCell={renderCell} />
      </Table>
    );
  }
}
