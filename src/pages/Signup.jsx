import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";

export default function Signup() {

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const firstName = form.firstName.value;
        const lastName = form.lastName.value;
        const clientID = form.clientID.value;

        const userDate = {
            email: email,
            password: password,
            clientId: clientID,
            firstName: firstName,
            lastName: lastName
        }

        fetch('https://sf-final-project-be.herokuapp.com/api/auth/sign_up', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(userDate)
        })
            .then(response => response.json())
            .then(result => {
                if (result.status === "OK") {
                    alert('Вы успешно зарегистрировались')
                } else {
                    alert('Произашла ошибка')
                }
            })

        form.reset();
    }

    return (
        <div className="wrapper">
            <Header />
            <main className="signup_main">
                <form onSubmit={handleSubmit} className="signup_form">
                    <div className="form_email">
                        <label>
                            E-mail*
                            <input required name='email' type='email' />
                        </label>
                    </div>
                    <div className="form_password">
                        <label>
                            Пароль*
                            <input required name='password' type='password' />
                        </label>
                    </div>
                    <div className="form_first_name">
                        <label>
                            Имя
                            <input name='firstName' type='text' />
                        </label>
                    </div>
                    <div className="form_last_name">
                        <label>
                            Фамилия
                            <input name="lastName" type='text' />
                        </label>
                    </div>
                    <div className="form_client_id">
                        <label>
                            Client ID*
                            <input required name='clientID' type='text' />
                        </label>
                    </div>
                    <div className="signup_submit">
                        <input value='Зарегистрироваться' type='submit' />
                    </div>
                </form>
            </main>
            <Footer />
        </div>
    )
}