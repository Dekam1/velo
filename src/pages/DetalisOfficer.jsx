import React from "react";
import EditOfficer from "../components/editOfficer/EditOficcer";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import LoadingPage from "../components/loading-page/LoadingPage";
import Context from "../Context";

export default function DetalisOfficer() {
    const linkID = window.location.pathname.substring(10);
    const [popapDetalis, setPopapDetalis] = React.useState(false);
    const [officer, setOfficer] = React.useState([]);
    const { loading, setLoading, token } = React.useContext(Context);

    React.useEffect(() => {
        async function getDate() {
            setLoading(true);
            const response = await fetch(`https://sf-final-project-be.herokuapp.com/api/officers/${linkID}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const result = await response.json();
            if (result.status === 'OK') {
                setOfficer(result.data)
            }
            setLoading(false);
        }
        getDate();
    }, [])

    return (
        loading ? <LoadingPage /> : <div className="wrapper">
            <Header />
            <main className="officer_main">
                <div className="container">
                    {popapDetalis ? <EditOfficer {...officer} /> : <>
                        <h1 className="edit_offcier_title">Детальная страница сотрудника</h1>
                        <div className="officer">
                            <label>
                                Имя:
                                <p>{officer.firstName}</p>
                            </label>
                            <label>
                                Фамилия:
                                <p>{officer.lastName}</p>
                            </label>
                            <label>
                                E-mail:
                                <p>{officer.email}</p>
                            </label>
                            <label>
                                Cтатус сотрудника:
                                <p>{officer.approved ? 'Одобрен' : 'Не одобрен'}</p>
                            </label>
                            <button onClick={() => setPopapDetalis(prev => !prev)} className="edit_officer_btn">
                                Редактировать
                            </button>
                        </div>
                    </>}
                </div>
            </main>
            <Footer />
        </div>
    )
}