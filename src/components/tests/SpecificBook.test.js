/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { SpecificBook } from '../specific-book/SpecificBook';
import { CartProvider } from '../../contexts/CartContext';
import { BooksProvider } from '../../contexts/BooksContext';

let incrementButton;
let decrementButton;
let bookCountInput;
let totalPrice;
let price;


const TestBook = {
    author: "Some author",
    description: "Some description",
    id: 1,
    image: "no image",
    price: 33.33,
    shortDescription: "Some short description",
    title: "Test test"
}

let localStorageMock;

afterAll(() => window.localStorage.clear());

beforeAll(() => {
    localStorageMock = (() => {
        let store = {
            book: JSON.stringify(TestBook),
            goods: JSON.stringify(TestBook)
        };
        return {
            getItem(key) {
                return store[key];
            },
            setItem(key, value) {
                store[key] = value;
            },
            clear() {
                store = {};
            },
            removeItem(key) {
                delete store[key];
            },
            getAll() {
                return store;
            },
        };
    })();

    Object.defineProperty(window, "localStorage", { value: localStorageMock });
})

beforeEach(() => {
    render(
        <BooksProvider>
            <CartProvider>
                <SpecificBook />
            </CartProvider>
        </BooksProvider>
    );

    incrementButton = screen.getByTestId('incrementButton');
    decrementButton = screen.getByTestId('decrementButton');
    bookCountInput = screen.getByLabelText('Count:');
    totalPrice = screen.getByTestId('totalPrice');
    price = screen.getByTestId('price');
})

it('should render a counter with value of 1', () => {
    expect(bookCountInput).toHaveValue('1');
})

it('should increase count when plus button is clicked', () => {
    expect(bookCountInput).toHaveValue('1');
    userEvent.click(incrementButton)
    expect(bookCountInput).toHaveValue('2');
})

it('should decrease count when minus button is clicked', () => {
    userEvent.click(incrementButton);
    expect(bookCountInput).toHaveValue('2');
    userEvent.click(decrementButton);
    expect(bookCountInput).toHaveValue('1');
})

it('should not decrease to less than 1', () => {
    expect(bookCountInput).toHaveValue('1');
    userEvent.click(decrementButton);
    expect(bookCountInput).toHaveValue('1');
})

it('should not increase to more than 42', () => {
    expect(bookCountInput).toHaveValue('1');
    userEvent.type(bookCountInput, '42');
    expect(bookCountInput).toHaveValue('42');
    userEvent.click(incrementButton);
    expect(bookCountInput).toHaveValue('42');
})

it('get data from localStorage and test total price value', () => {
    expect(localStorage.getItem('book')).toEqual(JSON.stringify(TestBook));
    expect(bookCountInput).toHaveValue('1');
    expect(price).toHaveTextContent('33.33');
    expect(totalPrice).toHaveTextContent('33.33');
    userEvent.click(incrementButton);
    expect(bookCountInput).toHaveValue('2');
    expect(totalPrice).toHaveTextContent('66.66');
    userEvent.type(bookCountInput, '42');
    expect(totalPrice).toHaveTextContent('1399.86');
    userEvent.click(decrementButton);
    expect(totalPrice).toHaveTextContent('1366.53');
})
