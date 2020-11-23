export function requiredValidation (value) {
  if (!value || value.trim() === '') {
    return 'Este campo é obrigatório'
  }
  return null
}
