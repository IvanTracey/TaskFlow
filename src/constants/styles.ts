import { MARGIN, SIZE, Palette } from '../constants/theme';
import { StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { useMemo } from 'react';

export const useStyles = () => {
  const { colors } = useTheme();
  return useMemo(() => createStyles(colors), [colors]);
};


export const createStyles = (c: Palette) =>  StyleSheet.create({
// Estilos de Log In y Register Screen
  container: {
    flex: 1,
    padding: MARGIN.marginS,
    justifyContent: 'space-between',
    backgroundColor: c.screen,
  },
  sector: {
    margin: MARGIN.marginS,
  },
  title: {
    fontSize: SIZE.fontTitle,
    fontWeight: 'bold',
    marginTop: MARGIN.marginM,
    alignSelf: 'center',
    color: c.text,
  },
  label: {
    fontSize: SIZE.fontMedium,
    fontWeight: 'bold',
    marginTop: MARGIN.marginS,
    marginBottom: MARGIN.marginXS,
    color: c.text,
  },
  input: {
    borderWidth: 1,
    height: 60,
    borderColor: c.textMuted,
    borderRadius: 8,
    margin: MARGIN.marginXS,
    fontSize: SIZE.fontSmall,
    backgroundColor: c.surface,
    color: c.text,
  },
  errorInput: {
    borderColor: c.error,
  },
  error: {
    color: c.error,
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 4,
  },
  button: {
    marginTop: MARGIN.marginL,
    padding: MARGIN.marginM,
    backgroundColor: c.accent,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',   
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  buttonText: {
    fontWeight: 'bold',
    alignItems: 'center',   
    fontSize: SIZE.fontSmall,
    color: c.onAccent,
  },
  link: {
    marginTop: MARGIN.marginS,
    alignItems: 'center',
  },
  linkText: {
    fontSize: SIZE.fontSmall,
    fontWeight: 'bold',
    marginBottom: MARGIN.marginS,
    color: c.text,
  },

  // Adicionales de ProfileCards
  cardUser: {
    alignItems: 'center',
    alignSelf: 'center',
    maxHeight: 300,
    paddingVertical:50,
    paddingHorizontal:30,
    backgroundColor: c.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: c.border,
  },
  cardMode: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 10,
    backgroundColor: c.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: c.border,
  },
  
  name: {
    fontSize: SIZE.fontMedium,
    fontWeight: 'bold',
    color: c.text,
    margin: MARGIN.marginS,
  },
  avatar: { 
    width: 120, 
    height: 120, 
    borderRadius: 60, 
    borderWidth: 2.5, 
    borderColor: c.screen 
  },

  // Adicionales de HomeScreen
   filters: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: MARGIN.marginM,
  },
  filterBtn: {
    flex: 1,
    paddingVertical: MARGIN.marginXS,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: c.surface,
    borderColor: c.textMuted,
  },
  filterActive: {
    backgroundColor: c.accent,
    borderWidth: 1,
    borderColor: c.border,
  },
  filterTextActive: {
    fontWeight: 'bold',
    fontSize: SIZE.fontSmall,
    color: c.onAccent,
  },
  card: {
    padding: MARGIN.marginS,
    marginBottom: 6,
    backgroundColor: c.surface,
    borderWidth: 1,
    borderColor: c.textMuted,
    borderRadius: 8,
  },
  taskTitle: {
    fontSize: SIZE.fontMedium,
    fontWeight: 'bold',
    marginBottom: 5,
    color: c.text,
  },
  taskTitleDone: {
    textDecorationLine: 'line-through',
    color: c.textMuted,
  },
  taskCategory: {
    color: c.textMuted,
  },
  fab: {
    borderRadius: 14,
    marginTop: 6,
    paddingHorizontal: 40,
    paddingVertical: 10,
    position: 'absolute', 
    bottom: 30, 
    backgroundColor: c.accent,
    alignSelf: 'center',
    justifyContent: 'center',
    elevation: 4,
    borderWidth: 1,
  },
  fabText: {
    color: c.text,
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  loadingIndicator:{ 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    color: c.onAccent,
  },

  // Adicionales de TaskForm
  categories: {
    flexDirection: 'column',
    gap: 12,
  },
  category: {
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: c.surface,
    borderColor: c.textMuted,
  },
  selectedCategory: {
    backgroundColor: c.accent,
    borderColor: c.border,
  },
  cardDetail: {
    padding: MARGIN.marginS,
    marginBottom: MARGIN.marginL,
    backgroundColor: c.surface,
    borderWidth: 1,
    borderColor: c.textMuted,
    borderRadius: 8,
  },
  text: {
    fontSize: SIZE.fontMedium,
    color: c.text,
  },
  subtext: {
    fontSize: SIZE.fontSmall,
    paddingVertical: MARGIN.marginXS,
    color: c.text,
  },
  description: {
    height: 220,
    margin: MARGIN.marginXS,
  },

  // Adicionales de ProfileScreen
    log: {
        flex: 1,
        backgroundColor: c.screen,
        padding: MARGIN.marginS,
        justifyContent: 'space-between',
    },
    logoutButton: {
        padding: MARGIN.marginS,
        backgroundColor: c.accent,
        borderRadius: 8,
        borderWidth: 1,
        alignItems: 'center',
    },
    logoutText: {
        fontWeight: 'bold',
        fontSize: SIZE.fontMedium,
        color: c.onAccent,
    },

    // Adicionales de TaskDetail
    // ✅ Estilos para marcar visualmente el estado
  done: { color: c.success, fontWeight: 'bold' },
  pending: { color: c.textMuted, fontWeight: 'bold' },

  toggleButton: {
    marginTop: MARGIN.marginM,
    backgroundColor: c.success,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },

  deleteButton: {
    marginTop: MARGIN.marginS,
    backgroundColor: c.danger,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  // Adicional de EmptyState
  icon: {
    fontSize: 50,
    paddingBottom: MARGIN.marginXS,
  },
  containerEmpty: {
    alignItems: 'center',
    paddingBottom: 300,
  },


  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: c.screen,
  },
});