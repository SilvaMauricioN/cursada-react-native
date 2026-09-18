import { StyleSheet } from 'react-native';
import { pineColors } from '../theme/Theme';

// Espaciado consistente en múltiplos de 8px, como recomienda la guía.
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const sharedStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: pineColors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  title: {
    color: pineColors.textPrimary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    color: pineColors.textSecondary,
    marginBottom: spacing.lg,
  },
  card: {
    backgroundColor: pineColors.surface,
    borderRadius: 16,
    marginBottom: spacing.md,
  },
  cardVariant: {
    backgroundColor: pineColors.surfaceVariant,
    borderRadius: 16,
    padding: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  separator: {
    height: spacing.sm,
  },
});