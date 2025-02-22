import { Metadata } from "next";
import { StorybookPageClient } from "./client-page";

export const metadata: Metadata = {
  title: "Design System | Storybook",
  description: "Interactive UI Component Library",
};

export default function StorybookPage() {
  return <StorybookPageClient />;
} 