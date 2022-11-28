export const getAll = async () => {
  const response = await fetch('https://elephant-api.herokuapp.com/elephants')
  const result = await response.json()
  return result
}
