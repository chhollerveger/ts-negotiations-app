import { makeNegotiationControllerFactory } from './factories/negotiation-controller-factory.js';

const controller = makeNegotiationControllerFactory();
const form = document.querySelector('.form');
if (!form) {
	throw Error('The application could not be initialized. Check if the form exists!');
}
form.addEventListener('submit', event => {
	event.preventDefault();
	controller.add();
});

const importButton = document.querySelector('#importButton');
if (!importButton) {
	throw Error('Import button not found!');
}
importButton.addEventListener('click', () => {
	controller.importData();
});
