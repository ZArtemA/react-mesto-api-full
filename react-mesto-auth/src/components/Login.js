import React from 'react';
import { withRouter } from 'react-router-dom';


function Login({handleLogin}) {
    const [data, setData] = React.useState({
        email: '',
        password: ''
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        const { email, password } = data;
        if (!email || !password) {
            return;
        }
        handleLogin({ email: email, password: password })
    }

        return (
            <div className="login-page">
                <h1 className="login-page__title">Вход</h1>
                <form className="login-page__form" onSubmit={handleSubmit}>
                    <input vaue={data.email} name="email" type="email" className="login-page__input" placeholder="Email" onChange={handleChange} />
                    <input vaue={data.password} name="password" type="password" className="login-page__input" placeholder="Пароль" onChange={handleChange} />
                    <button type="submit" className="login-page__submit-btn">Войти</button>
                </form>
            </div>
        );
}

export default withRouter(Login);