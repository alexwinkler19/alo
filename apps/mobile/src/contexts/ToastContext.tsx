import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { Toast, type ToastStyle } from '@alo/ui';

/**
 * Toast configuration for showing a toast
 */
interface ToastConfig {
  style: ToastStyle;
  title: string;
  description?: string;
  duration?: number;
}

/**
 * Toast context state
 */
interface ToastContextState {
  showToast: (config: ToastConfig) => void;
}

const ToastContext = createContext<ToastContextState | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
}

/**
 * Toast Provider
 *
 * Provides imperative toast API to show notifications throughout the app.
 * Wraps the Toast component from @alo/ui with show/hide logic and auto-dismiss.
 *
 * @example
 * const { showToast } = useToast();
 * showToast({ style: 'Error', title: 'Error', description: 'Something went wrong' });
 */
export function ToastProvider({ children }: ToastProviderProps) {
  const [visible, setVisible] = useState(false);
  const [config, setConfig] = useState<ToastConfig | null>(null);
  const [fadeAnim] = useState(() => new Animated.Value(0));

  const hideToast = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false);
      setConfig(null);
    });
  }, [fadeAnim]);

  const showToast = useCallback(
    (newConfig: ToastConfig) => {
      // Set config and show
      setConfig(newConfig);
      setVisible(true);

      // Fade in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();

      // Auto-dismiss after duration (default 4 seconds)
      const duration = newConfig.duration ?? 4000;
      setTimeout(() => {
        hideToast();
      }, duration);
    },
    [fadeAnim, hideToast]
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {visible && config && (
        <Animated.View style={[styles.toastContainer, { opacity: fadeAnim }]}>
          <Toast
            style={config.style}
            title={config.title}
            description={config.description}
            showTitle={true}
            showDescription={!!config.description}
            onClose={hideToast}
          />
        </Animated.View>
      )}
    </ToastContext.Provider>
  );
}

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 9999,
  },
});

/**
 * Hook to access toast functionality
 *
 * @example
 * const { showToast } = useToast();
 * showToast({ style: 'Success', title: 'Success!', description: 'Account created' });
 */
export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
