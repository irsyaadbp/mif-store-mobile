import React, { useEffect } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { Text } from './text';
import { cn } from '@/lib/utils';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react-native';
import { useToast } from '@/context/ToastContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export function ToastContainer() {
  const { toasts } = useToast();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { bottom: insets.bottom + 60 }]}>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </View>
  );
}

function ToastItem({ toast }: { toast: any }) {
  const opacity = React.useRef(new Animated.Value(0)).current;
  const translateY = React.useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle2 size={18} color="white" />;
      case 'error':
        return <AlertCircle size={18} color="white" />;
      default:
        return <Info size={18} color="white" />;
    }
  };

  const getBgClass = () => {
    switch (toast.type) {
      case 'error':
        return 'bg-destructive/90';
      default:
        return 'bg-black/80';
    }
  };

  return (
    <Animated.View
      style={[
        styles.toast,
        {
          opacity,
          transform: [{ translateY }],
        },
      ]}
      className={cn("shadow-2xl", getBgClass())}
    >
      <View className="flex-row items-center gap-2.5 px-5 py-3.5">
        {getIcon()}
        <Text className="text-sm font-semibold text-white">{toast.message}</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 9999,
    alignItems: 'center',
    gap: 8,
  },
  toast: {
    width: 'auto',
    minWidth: width * 0.7,
    maxWidth: width * 0.9,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 10,
  },
});
