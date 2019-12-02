import React, { useContext } from 'react';
import CustomerContext from '../applicationState/customerContext';

// gets saved items of current user, sets them to global context
const getSavedProducts = () => {
  const context = useContext(CustomerContext);
  const { serverUrl, currentUser } = context;
  return fetch(`${serverUrl}/savedProducts?idUser=${currentUser.id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((savedList) => {
      context.setCurrentSavedList(savedList);
      return savedList;
    })
    .catch(() => console.log('something happend'));
};

// handles deletion, takes the product id to delete
const handleDelete = (idProduct) => {
  const context = useContext(CustomerContext);
  const { serverUrl, currentUser } = context;
  return fetch(`${serverUrl}/savedProducts?idUser=${currentUser.id}&idProduct=${idProduct}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .catch(() => console.log('something went wrong'));
};

export {
  handleDelete,
  getSavedProducts,
};
