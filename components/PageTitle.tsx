import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';

interface PageTitleProps {
  title: string;
  subtitle: string;
}

export function PageTitle({ title, subtitle }: PageTitleProps) {
  return (
    <View className="gap-2 pb-6 border-b border-border mb-6">
      <Text className="text-3xl font-bold text-foreground leading-tight">
        {title}
      </Text>
      <Text className="text-muted-foreground text-base leading-6">
        {subtitle}
      </Text>
    </View>
  );
}
