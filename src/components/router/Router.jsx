import { createHashRouter } from 'react-router-dom';
import App from '../../App';
import { BookList } from '../book-list/BookList';
import { SignIn } from '../signin/SignIn';
import { SpecificBook } from '../specific-book/SpecificBook';
import { Cart } from '../cart/Cart';
import { ErrorPage } from '../error-page/ErrorPage';

export const Router = createHashRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <BookList />,
                errorElement: <ErrorPage />,
            },
            {
                path: 'sign-in',
                element: <SignIn />,
            },
            {
                path: 'specific-book/:bookId',
                element: <SpecificBook />,
                errorElement: <ErrorPage />,
            },
            {
                path: 'cart',
                element: <Cart />,
            }
        ]
    }
])