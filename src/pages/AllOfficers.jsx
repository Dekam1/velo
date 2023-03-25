import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import LoadingPage from "../components/loading-page/LoadingPage";
import Context from "../Context";

export default function AllOfficers() {
    const { loading, setLoading, token } = React.useContext(Context);
    const [officers, setOfficers] = React.useState([]);

    React.useEffect(() => {
        async function getDate() {
            setLoading(true);
            const response = await fetch('https://sf-final-project-be.herokuapp.com/api/officers/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const result = await response.json();
            setOfficers(result.officers)
            setLoading(false);
        }
        getDate()
    }, [])

    const deleteOffcier = (id) => {
        fetch(`https://sf-final-project-be.herokuapp.com/api/officers/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Bearer ${token}`,
            }
        })
        .then(response => response.json())
        .then(result => {
            if(result.status === 'OK') {
                setOfficers(prev => prev.filter(item => item._id !== id));
            } else {
                alert('Произошла ошибка')
            }
        })
    }


    return (
        loading ? <LoadingPage /> : <div className="wrapper">
            <Header />
            <main className="all_officer_main">
                <div className="container">
                    <ul className="officers">
                        {officers.map(officer => (
                            <li className="officer_list" key={officer._id}>
                                <Link className="officer_item" style={{ color: 'black' }} to={`/officers/${officer._id}`}>
                                    <label>
                                        E-mail
                                        <p>{officer.email}</p>
                                    </label>
                                    <label>
                                        Имя:
                                        <p>{officer.firstName}</p>
                                    </label>
                                    <label>
                                        Фамилия:
                                        <p>{officer.lastName}</p>
                                    </label>
                                    <label>
                                        Статус:
                                        <p>{officer.approved ? 'Одобрен' : 'Не одобрен'}</p>
                                    </label>
                                </Link>
                                <button onClick={() => deleteOffcier(officer._id)} className="delete_officer">Удалить</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
            <Footer />
        </div>
    )
}