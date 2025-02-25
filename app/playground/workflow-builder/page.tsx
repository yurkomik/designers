'use client';

import { Metadata } from 'next';
import WorkflowBuilder from './components/WorkflowBuilder';

export default function WorkflowBuilderPage() {
  return (
    <div className="flex flex-col w-full h-screen bg-background">
      <div className="p-4 border-b">
        <h1 className="text-2xl font-bold">Workflow Builder</h1>
        <p className="text-muted-foreground">Build your workflow using the drag-and-drop interface</p>
      </div>
      <div className="flex-1 overflow-hidden">
        <WorkflowBuilder />
      </div>
    </div>
  );
} 