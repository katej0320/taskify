import type { Meta, StoryObj } from '@storybook/react';

import Board from './Board';

const meta = {
  component: Board,
} satisfies Meta<typeof Board>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};