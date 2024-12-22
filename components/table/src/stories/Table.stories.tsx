import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {Table} from "../table/Table";

export const Simple = () => (
  <Table>
    <Table.Header>
      <Table.Header.Cell>Title</Table.Header.Cell>
      <Table.Header.Cell>Value</Table.Header.Cell>
      <Table.Header.Cell>Options</Table.Header.Cell>
    </Table.Header>
    <Table.Body>
      <Table.Body.Row>
        <Table.Body.Row.Cell>Title</Table.Body.Row.Cell>
        <Table.Body.Row.Cell>Value</Table.Body.Row.Cell>
        <Table.Body.Row.Cell>Options</Table.Body.Row.Cell>
      </Table.Body.Row>
    </Table.Body>
  </Table>
);

export default {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};