import type { Meta, StoryObj } from '@storybook/react';

import CreateTodoModal from './CreateTodoModal';

const meta = {
  component: CreateTodoModal,
} satisfies Meta<typeof CreateTodoModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};