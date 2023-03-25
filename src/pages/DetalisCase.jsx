import React from "react";
import dayjs from "dayjs";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import LoadingPage from "../components/loading-page/LoadingPage";
import Context from "../Context";
import EditCase from "../components/editCase/EditCase";

export default function DetalisCase() {
    const [editPopap, setEditPopap] = React.useState(false);
    const [detalisCase, setDetalisCase] = React.useState([]);
    const [officerId, setOfficerId] = React.useState(false);
    const { loading, token, setLoading } = React.useContext(Context);
    const linkID = window.location.pathname.substring(7);

    React.useEffect(() => {
        async function getDate() {
            setLoading(true);
            const response = await fetch(`https://sf-final-project-be.herokuapp.com/api/cases/${linkID}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const result = await response.json();
            if (result.status === 'OK') {
                setDetalisCase(result.data);
                if (result.data.officer) {
                    setOfficerId(result.data.officer)
                }
            }
            setLoading(false);
        }
        getDate();
    }, [])

    const handleClick = () => {
        setEditPopap(prev => !prev);
    }


    return (
        loading ? <LoadingPage /> : <div className="wrapper">
            <Header />
            <main className="detalis_case_main">
                <div className="container">
                    {editPopap ? <EditCase {...detalisCase} /> : <div className="detalis_case">
                        <h1>Детальная страница случая</h1>
                        <div className="case">
                            <label>
                                ID:
                                <p>{detalisCase._id}</p>
                            </label>
                            <label>
                                Дата кражи:
                                <p>{dayjs(detalisCase.date).format('DD.MM.YYYY')}</p>
                            </label>
                            <label>
                                Статус:
                                <p>{detalisCase.status}</p>
                            </label>
                            <label>
                                № лицензии:
                                <p>{detalisCase.licenseNumber}</p>
                            </label>
                            <label>
                                Цвет:
                                <p>{detalisCase.color}</p>
                            </label>
                            <label>
                                Тип:
                                <p>{detalisCase.type}</p>
                            </label>
                            <label>
                                Сотрудник:
                                <p>{officerId}</p>
                            </label>
                            <label>
                                ФИО:
                                <p>{detalisCase.ownerFullName}</p>
                            </label>
                            <label>
                                Описание:
                                <p>{detalisCase.description}</p>
                            </label>
                            <label>
                                Решение:
                                <p>{detalisCase.resolution}</p>
                            </label>
                            <button onClick={handleClick} className="edit_case">
                                Редактировать
                            </button>
                        </div>
                    </div>}

                </div>
            </main>
            <Footer />
        </div>
    )
}