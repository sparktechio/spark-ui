import styled from "styled-components";
import {HTMLAttributes, TableHTMLAttributes} from "react";
import React from "react";

export interface TableProps extends TableHTMLAttributes<HTMLTableElement>{}

export const Table = (
  {
    children
  }: TableProps
) => {
  return <StyledTable>{children}</StyledTable>
}

const Header = ({children}: TableHTMLAttributes<HTMLHeadElement>) => {
  return (
    <thead>
      <tr>
        {children}
      </tr>
    </thead>
  )
}

Header.Cell = ({children}: TableHTMLAttributes<HTMLTableCellElement>) => {
  return (
    <th>
      {children}
    </th>
  )
}

Table.Header = Header;

const Body = ({children}: TableHTMLAttributes<HTMLBodyElement>) => {
  return (
    <tbody>
    {children}
    </tbody>
  )
}

const Row = ({children}: TableHTMLAttributes<HTMLTableRowElement>) => {
  return (
    <tr>
      {children}
    </tr>
  )
}

Body.Row = Row;

Row.Cell = ({children}: TableHTMLAttributes<HTMLTableCellElement>) => {
  return (
    <td>
      {children}
    </td>
  )
}

Table.Body = Body;

Table.Card = ({children}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div>
      {children}
    </div>
  )
}

const StyledTable = styled.table`
  width: 100%;
`;