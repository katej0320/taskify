import type { Meta, StoryObj } from "@storybook/react";

import NewDashBoard from "./newDashBoard";

const meta = {
  component: NewDashBoard,
} satisfies Meta<typeof NewDashBoard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
