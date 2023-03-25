import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import LoadingPage from "../components/loading-page/LoadingPage";
import Context from "../Context";
import useAuth from "../hooks/useAuth";

export default function Signin() {
    const { user, loading } = React.useContext(Context);
    const { signin } = useAuth();
    const navigate = useNavigate();
    const emptyOrder = !Object.keys(user).length;

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        const userDate = {
            email: email,
            password: password
        }

        signin(userDate, () => navigate('/', { replace: true }))
    }

    return (
        loading ? <LoadingPage /> : <div className="wrapper">
            <Header />
            <main className="signin_main">
                {!emptyOrder ? <div className="signin_auth_info">
                    Вы уже авторизованы.
                </div> : <form onSubmit={handleSubmit} className="signin_form">
                    <div className="form_email">
                        <label>
                            e-mail*
                            <input required name='email' type='email' />
                        </label>
                    </div>
                    <div className="form_password">
                        <label>
                            Пароль*
                            <input required name='password' type='password' />
                        </label>
                    </div>
                    <div className="signin_submit">
                        <input value='Войти' type='submit' />
                    </div>
                </form>}
            </main>
            <Footer />
        </div>
    )
}