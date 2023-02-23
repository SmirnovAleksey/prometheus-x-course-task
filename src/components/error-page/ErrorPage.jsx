import './error-page.css'
import { useRouteError } from 'react-router-dom'

export const ErrorPage = () => {

    const error = useRouteError();

    return (
        <section className='section-error'>
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
            <div className='error-img'></div>
        </section>
    )
}
