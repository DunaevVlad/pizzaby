export const formatPrice = (price: number): string => {
  return `${price} ₽`
}

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}