import { fn } from '@storybook/test';
import {Pager} from "@sparkui/react-pager";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from "styled-components";

const generator = (page: number) => {
  const numbers = [];

  for (let index = 0; index <= 9; index++) {
    numbers.push((page * 10) + index);
  }

  return {items: numbers, total: 33};
}

const Flex = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export default {
  title: 'Components/Pager',
  component: Pager,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: { onClick: fn() },
};

export const Basic = () => (
  <Pager<number, unknown> fetcher={(page) => new Promise(resolve => setTimeout(() => {resolve(generator(page))}, 1000))}>
    {({hasMore, items, loading, loadMore}) => (
      <div>
        {loading && ('Loading')}
        <Flex>
          {
            items.map((item) => (<div className="row" key={item}>{item}</div>))
          }
          <span>{loading && ('Loading')}</span>
          <button className="btn btn-primary" disabled={loading || !hasMore} onClick={() => loadMore()}>Load more</button>
        </Flex>
      </div>
    )}
  </Pager>
);