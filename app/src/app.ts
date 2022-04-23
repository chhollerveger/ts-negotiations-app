import { NegotiationController } from './controllers/negotiation-controller.js';

const controller = new NegotiationController();
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
