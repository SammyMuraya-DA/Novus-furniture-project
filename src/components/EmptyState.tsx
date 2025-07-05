
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface EmptyStateProps {
  title: string;
  description: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
}

const EmptyState = ({ title, description, action, icon }: EmptyStateProps) => {
  return (
    <Card className="max-w-md mx-auto">
      <CardContent className="pt-6 text-center space-y-4">
        {icon && <div className="flex justify-center">{icon}</div>}
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-gray-600 mt-1">{description}</p>
        </div>
        {action && <div className="pt-2">{action}</div>}
      </CardContent>
    </Card>
  );
};

export default EmptyState;
