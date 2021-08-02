import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import RootStore from "./stores/RootStore";

const store = new RootStore();

test('renders learn react link', () => {
  render(<App store={store} />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('Contacts', () => {
  render(<App store={store} />);
  const linkElement = screen.getByText(/Contacts/i);
  expect(linkElement).toBeInTheDocument();
});
