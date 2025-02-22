import type { Meta, StoryObj } from '@storybook/react';

import { Dialog } from './dialog';

const meta = {
  component: Dialog,
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};