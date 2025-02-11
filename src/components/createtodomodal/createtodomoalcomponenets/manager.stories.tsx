import type { Meta, StoryObj } from '@storybook/react';

import Manager from './manager';

const meta = {
  component: Manager,
} satisfies Meta<typeof Manager>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};