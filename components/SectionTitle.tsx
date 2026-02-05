import React from 'react';
import { View, Pressable } from 'react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';

interface SectionTitleProps {
  title: string;
  buttonLabel?: string;
  onButtonPress?: () => void;
}

export function SectionTitle({ title, buttonLabel, onButtonPress }: SectionTitleProps) {
  return (
    <View className="flex-row items-center justify-between py-4">
      <View className="flex-row items-center gap-3">
        {/* Vertical Indicator */}
        <View className="h-6 w-1 rounded-full bg-secondary" />
        <Text className="text-xl font-bold text-foreground">
          {title}
        </Text>
      </View>

      {buttonLabel && (
        <Button 
          variant="secondary" 
          size="sm" 
          className="h-9 px-4"
          onPress={onButtonPress}
        >
          <Text className="font-inter-semibold text-sm text-secondary-foreground">
            {buttonLabel}
          </Text>
        </Button>
      )}
    </View>
  );
}
