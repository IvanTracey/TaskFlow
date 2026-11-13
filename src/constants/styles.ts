import { COLORS, MARGIN, SIZE } from '../constants/theme';
import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
// Estilos de Log In y Register Screen
  container: {
    flex: 1,
    padding: MARGIN.marginS,
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
  },
  sector: {
    margin: MARGIN.marginS,
  },
  title: {
    fontSize: SIZE.fontTitle,
    fontWeight: 'bold',
    marginTop: MARGIN.marginM,
    alignSelf: 'center',
  },
  label: {
    fontSize: SIZE.fontMedium,
    fontWeight: 'bold',
    marginBottom: 6,
    marginTop: MARGIN.marginS,
  },
  input: {
    borderWidth: 1,
    height: 60,
    borderColor: COLORS.textLight,
    borderRadius: 8,
    margin: MARGIN.marginXS,
    fontSize: SIZE.fontSmall,
    backgroundColor: COLORS.card,
  },
  errorInput: {
    borderColor: 'red',
  },
  error: {
    color: 'red',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 4,
  },
  button: {
    marginTop: MARGIN.marginS,
    padding: MARGIN.marginS,
    backgroundColor: COLORS.background,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: SIZE.fontSmall,
  },
  link: {
    marginTop: MARGIN.marginS,
    alignItems: 'center',
  },
  linkText: {
    fontSize: SIZE.fontSmall,
    fontWeight: 'bold',
    marginBottom: MARGIN.marginS,
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
    backgroundColor: COLORS.background,
  },
  filterActive: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterTextActive: {
    fontWeight: 'bold',
    fontSize: SIZE.fontSmall,
  },
  btnText:{
    alignItems: 'center',
    fontSize: SIZE.fontSmall,
  },
  card: {
    padding: MARGIN.marginS,
    marginBottom: 6,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.textLight,
    borderRadius: 8,
  },
  cardDone: {
    opacity: 0.6,
  },
  taskTitle: {
    fontSize: SIZE.fontMedium,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  taskTitleDone: {
    textDecorationLine: 'line-through',
    color: COLORS.textLight,
  },
  taskCategory: {
    color: COLORS.textLight,
  },
  fab: {
    borderRadius: 14,
    marginTop: 6,
    paddingHorizontal: 40,
    paddingVertical: 10,
    position: 'absolute', 
    bottom: 30, 
    right: 'center',
    backgroundColor: COLORS.background,
    alignSelf: 'center',
    justifyContent: 'center',
    elevation: 4,
    borderWidth: 1,
  },
  fabText: {
    color: COLORS.border,
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
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
    backgroundColor: COLORS.card,
    borderColor: COLORS.textLight,
  },
  selectedCategory: {
    backgroundColor: COLORS.background,
    borderColor: COLORS.border,
  },
  text: {
    fontSize: SIZE.fontMedium,
  },
  description: {
    height: 200,
    margin: MARGIN.marginXS,
  },

  // Adicionales de ProfileScreen
    log: {
        flex: 1,
        backgroundColor: COLORS.primary,
        padding: MARGIN.marginS,
        justifyContent: 'space-between',
    },
    logoutButton: {
        padding: MARGIN.marginS,
        backgroundColor: COLORS.background,
        borderRadius: 8,
        borderWidth: 1,
        alignItems: 'center',
    },
    logoutText: {
        fontWeight: 'bold',
        fontSize: SIZE.fontMedium,
    },

    email: { color: COLORS.textLight, marginBottom: 20 },
    avatarContainer: { alignItems: 'center', marginBottom: 30 },
    avatar: { width: 120, height: 120, borderRadius: 60, borderWidth: 3, borderColor: COLORS.primary },
    avatarPlaceholder: { backgroundColor: COLORS.border, justifyContent: 'center', alignItems: 'center' },
    avatarText: { fontSize: 40, fontWeight: 'bold', color: COLORS.textLight },
    changePhotoBtn: { marginTop: 12, padding: 10 },
    changePhotoText: { color: COLORS.primary, fontWeight: 'bold' },


    // Adicionales de TaskDetail
    // ✅ Estilos para marcar visualmente el estado
  done: { color: COLORS.success, fontWeight: 'bold' },
  pending: { color: COLORS.textLight, fontWeight: 'bold' },

  // ✅ Botón toggle (verde)
  toggleButton: {
    marginTop: MARGIN.marginM,
    backgroundColor: COLORS.success,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },

  // ✅ Botón delete (rojo)
  deleteButton: {
    marginTop: MARGIN.marginXS,
    backgroundColor: COLORS.danger,
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

});
