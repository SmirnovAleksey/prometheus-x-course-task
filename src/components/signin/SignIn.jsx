import './sign-in.css'
import { Button } from '../button/Button'
import { Input } from '../input/Input'
import { useNavigate } from 'react-router-dom'

import { useState, useEffect } from 'react'

export const SignIn = () => {

    const [disabled, setDisabled] = useState(false);
    const [value, setValue] = useState('');
    const [user, setUser] = useState({
        userName: '',
        isAuthorized: false
    });
    const navigate = useNavigate();

    localStorage.setItem('user', JSON.stringify(user))

    const inputValidate = (e) => {
        const value = e.target.value
        const regex = /^[a-zа-яыіїёє']/i;
        const validValue = value.split('').filter(e => regex.test(e) ? e : '')
        setValue(validValue.join(''))
    }

    const createUser = () => {
        setUser(user.userName = value, user.isAuthorized = true);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createUser();
        localStorage.setItem('user', JSON.stringify(user));
        user.isAuthorized && navigate("/");
    }

    useEffect(() => {
        if (value.length > 3 && value.length < 17) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [value.length])

    return (
        <section className='sign-section'>
            <div className="sign-container">
                <div className="sign-avatar"></div>
                <p><strong>{value || 'User name'}</strong></p>
                <form onSubmit={handleSubmit} autoComplete='off' className="sign-form">
                    <div className={disabled ? 'form-stickman-sad' : 'form-stickman-happy'}></div>
                    <label htmlFor="username">
                        <Input value={value} onChange={inputValidate} placeholder="Type user name" id="username" name="username" />
                    </label>
                    <div>
                        <span></span>
                        <Button disabled={disabled} styleMod='stretch' title='Sign in' />
                        {
                            disabled &&
                            <span className='login-incorrect'>
                                Enter the name from 4 to 16 characters. Only letters En/Ua
                            </span>
                        }
                    </div>
                </form>
            </div>
        </section>
    )
}
