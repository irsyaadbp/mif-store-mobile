import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

interface PageTitleProps {
  title: string;
  subtitle?: string;
}

export function PageTitle({ title, subtitle }: PageTitleProps) {
  return (
    <View className={cn("pb-6 border-b border-border mb-6", subtitle ? "gap-2" : "gap-0")}>
      <Text className="text-3xl font-bold text-foreground leading-tight">
        {title}
      </Text>
      {subtitle && (
        <Text className="text-muted-foreground text-base leading-6">
          {subtitle}
        </Text>
      )}
    </View>
  );
}
