import React from "react";
import dayjs from "dayjs";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import LoadingPage from "../components/loading-page/LoadingPage";
import Context from "../Context";
import { Link } from "react-router-dom";

export default function AllCases() {
    const { loading, setLoading, token } = React.useContext(Context);
    const [cases, setCases] = React.useState([]);

    React.useEffect(() => {
        async function getDate() {
            setLoading(true);
            const response = await fetch('https://sf-final-project-be.herokuapp.com/api/cases/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const result = await response.json();
            if (result.status === 'OK') {
                setCases(result.data);
            } else {
                alert('При получение данных произашла ошибка')
            }
            setLoading(false);
        }
        getDate()
    }, [])

    const deleteCase = (id) => {
        fetch(`https://sf-final-project-be.herokuapp.com/api/cases/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Bearer ${token}`,
            }
        })
            .then(respnse => respnse.json())
            .then(result => {
                if (result.status === 'OK') {
                    setCases(prev => prev.filter(item => item._id !== id));
                } else {
                    alert('При удалении возникла ошибка');
                }
            })
    }

    return (
        loading ? <LoadingPage /> : <div className="wrapper">
            <Header />
            <main className="cases_main">
                <div className="container">
                    <ul className="cases">
                        {cases.reverse().map(item => (
                            <li key={item._id} className="cases_list">
                                <Link  style={{ color: 'black' }} to={`/cases/${item._id}`}>
                                    <label>
                                        Статус:
                                        <p>{item.status}</p>
                                    </label>
                                    <label>
                                        № лицензии:
                                        <p>{item.licenseNumber}</p>
                                    </label>
                                    <label>
                                        ФИО:
                                        <p>{item.ownerFullName}</p>
                                    </label>
                                    <label>
                                        Велосипед:
                                        <p>{item.type}</p>
                                    </label>
                                    <label>
                                        Дата кражи:
                                        <p>{item.date ? dayjs(item.date).format('DD.MM.YYYY') : 'Не указано'}</p>
                                    </label>
                                    <label>
                                        Цвет:
                                        <p>{item.color ? item.color : 'Не указано'}</p>
                                    </label>
                                </Link>
                                <button className="delete_case" onClick={() => deleteCase(item._id)}>Удалить</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
            <Footer />
        </div>
    )
} 