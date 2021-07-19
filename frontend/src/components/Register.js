import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.handleRegister({ password: this.state.password, email: this.state.email })
    }
    render() {
        return (
            <div className="registration-page">
                <h1 className="registration-page__title">Регистрация</h1>
                <form className="registration-page__form" onSubmit={this.handleSubmit}>
                    <input value={this.state.email} type="email" name="email" className="registration-page__input" placeholder="Email" onChange={this.handleChange} />
                    <input value={this.state.password} type="password" name="password" className="registration-page__input" placeholder="Пароль" onChange={this.handleChange} />
                    <button type='submit' className="registration-page__submit-btn">Зарегистрироваться</button>
                </form>
                <Link className="registration-page__link" to="/sign-in">Уже зарегистрированы? Войти</Link>
            </div>
        );
    }

}

export default withRouter(Register);