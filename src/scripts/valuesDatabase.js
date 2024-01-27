const valuesCategory = ["Entrada", "Saída"];
const localStorageList = JSON.parse(localStorage.getItem('@ListValues')) || [];

let insertedValues = localStorageList

export {
  insertedValues,
  valuesCategory,
  localStorageList
}