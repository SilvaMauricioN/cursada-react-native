import { useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ErrorView, LoadingView } from '../../components/Feedback';
import ThemeToggle from '../../components/ThemeToggle';
import UserCard from '../../components/UserCard';
import { Colors } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';
import useUsers from '../../hooks/useGetUsers';
//'../../hooks/useUsers' ../../context/ThemeContext
import { User } from '../../types/user';

export default function UsersScreen(): React.JSX.Element {
  const router = useRouter();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { data, loading, error, refetch } = useUsers();

  const openUser = (user: User): void => {
    router.push(`/user/${user.id}`);
  };

  const header = (
    <View style={styles.header}>
      <View>
        <Text style={styles.title}>Usuarios</Text>
        <Text style={styles.subtitle}>JSONPlaceholder · GET /users</Text>
      </View>
      <ThemeToggle />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {loading && data.length === 0 ? (
        <>
          <View style={styles.headerPadding}>{header}</View>
          <LoadingView />
        </>
      ) : error && data.length === 0 ? (
        <>
          <View style={styles.headerPadding}>{header}</View>
          <ErrorView message={error} onRetry={refetch} />
        </>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <UserCard user={item} onPress={openUser} />}
          ListHeaderComponent={header}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={refetch} tintColor={colors.text} />
          }
        />
      )}
    </SafeAreaView>
  );
}

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    list: {
      padding: 24,
      paddingBottom: 32,
    },
    headerPadding: {
      paddingHorizontal: 24,
      paddingTop: 24,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 20,
    },
    title: {
      fontSize: 26,
      fontWeight: '700',
      color: colors.text,
    },
    subtitle: {
      fontSize: 13,
      color: colors.textSecondary,
      marginTop: 4,
    },
  });