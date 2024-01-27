import { handleToast } from "./toast.js";

import {
  valuesCategory,
  insertedValues,
  localStorageList
} from "./valuesDatabase.js";

import {
  handleModal,
  modalContainer,
  openModal
} from "./modal.js";

const inputInsertValue = document.querySelector('.insert__value');
const containerUl = document.querySelector('.valueCards__list');
const totalValue = document.querySelector('.sum__text');
const filterAll = document.querySelectorAll('.item__input');
const inputChose = document.querySelectorAll('.chose__value')
const btnInsert = document.querySelector('.insert');

inputInsertValue.addEventListener('input', (e) => {
  let valueInput = e.target.value.replace(/[^\d]/g, '')
  e.target.value = Number(valueInput)
});

const renderValues = (lista) => {
  containerUl.innerHTML = '';

  lista.forEach(item => {
    const create = createListValues(item);
    containerUl.appendChild(create);
  });
  sumValues(lista)
};

const createListValues = (object) => {
  const [Entrada, Saida] = valuesCategory;
  const { value, categoryID } = object;

  const list = document.createElement('li');
  const paragaph = document.createElement('p');
  const division = document.createElement('div');
  const span = document.createElement('span');
  const button = document.createElement('button');
  const icon = document.createElement('i');

  list.classList.add('value__item');
  paragaph.classList.add('list__price');
  division.classList.add('list__control');
  span.classList.add('list__type');
  button.classList.add('list__button--remove');
  icon.classList.add('fa-solid');
  icon.classList.add('fa-trash');
  icon.classList.add('list__icon--trash');

  let valueFormated = Number(value).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

  paragaph.innerText = valueFormated;

  if (categoryID === 0) {
    span.innerText = Entrada;
  } else {
    span.innerText = Saida;
  };

  button.appendChild(icon);
  division.append(span, button);
  list.append(paragaph, division);

  button.addEventListener('click', () => {
    let index = insertedValues.indexOf(object)
    if (index !== -1) {
      insertedValues.splice(index, 1);
      renderValues(insertedValues);
      sumValues(insertedValues)
    };
    const listJsonRemove = JSON.stringify(insertedValues)
    localStorage.setItem('@ListValues', listJsonRemove)
    checkMyLocalStorage()
  });
  return list;
};

const sumValues = (lista, type = 'Todos') => {
  let sum = 0;

  if (type === 'Todos') {
    let entrada = lista.filter(item => item.categoryID === 0)
    .reduce((acc, curr) => acc + Number(curr.value), 0);

    let saida = lista.filter(item => item.categoryID === 1)
    .reduce((acc, curr) => acc + Number(curr.value), 0);

    sum = entrada - saida;
  } else {
    sum = lista.reduce((acc, curr) => acc + Number(curr.value), 0);
  }
  let sumFormated = Number(sum).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

  totalValue.innerText = sumFormated;
};

const changeType = (lista) => {
  filterAll.forEach(filter => {
    filter.addEventListener('click', (e) => {
      let type = e.target.value;
      
      if (type == 'Entrada') {
        let firstEntry = lista.filter(item => item.categoryID == 0);
        sumValues(firstEntry);
        renderValues(firstEntry);
      } else if (type == 'Saídas') {
        let exitEntry = lista.filter(item => item.categoryID == 1);
        sumValues(exitEntry);
        renderValues(exitEntry);
      } else {
        sumValues(insertedValues)
        renderValues(insertedValues);
      };
    });
  });
};

const inputChecked = () => {
  let clickcout = 0;

  filterAll.forEach(filter => {
    filter.addEventListener('click', (e) => {
      clickcout++;

      if (clickcout % 2 == 1) {
        e.target.checked = true;
      } else {
        e.target.checked = false;
      };
    });
  });
};

const insertValueInList = (lista) => {
  let count = 0;
  let controlId = 0;

  inputChose.forEach(item => {
    item.addEventListener('click', (e) => {
      let type = e.target.value;
      type == 'Entrada' ? controlId = 0 : controlId = 1;
    });
  });

  btnInsert.addEventListener('click', () => {
    lista.push({
      id: count++,
      value: inputInsertValue.value,
      categoryID: controlId
    });

    const listJSON = JSON.stringify(insertedValues);
    localStorage.setItem('@ListValues', listJSON);

    inputInsertValue.value = '';
    modalContainer.close();
    renderValues(insertedValues);
    checkMyLocalStorage()
    handleToast()
  });
};

const checkMyLocalStorage = () => {
  if (localStorageList == '') {
    openModal.classList.remove('exitBox');
  } else {
    openModal.classList.add('exitBox')
  }
};


handleModal();
inputChecked();
checkMyLocalStorage();
changeType(insertedValues);
renderValues(insertedValues);
insertValueInList(insertedValues)

