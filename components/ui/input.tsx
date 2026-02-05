import * as React from 'react';
import { TextInput, View, type TextInputProps } from 'react-native';
import { cn } from '@/lib/utils';
import { Icon } from './icon';

export interface InputProps extends TextInputProps {
  icon?: React.ComponentType<{ size?: number; color?: string }>;
}

const Input = React.forwardRef<TextInput, InputProps>(
  ({ className, icon: IconComponent, ...props }, ref) => {
    return (
      <View
        className={cn(
          'flex-row items-center h-16 w-full rounded-2xl border border-border bg-muted/30 px-4 py-2',
          className
        )}
      >
        {IconComponent && (
          <View className="mr-3">
            <Icon as={IconComponent} size={20} className="text-muted-foreground" />
          </View>
        )}
        <TextInput
          ref={ref}
          className="flex-1 text-base text-foreground font-inter"
          placeholderTextColor="#A1A1AA"
          autoCapitalize="none"
          {...props}
        />
      </View>
    );
  }
);

Input.displayName = 'Input';

export { Input };
