import React from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import LoadingPage from "../components/loading-page/LoadingPage";
import OfficerSelect from "../components/officerSelect/OfficerSelect";
import Context from "../Context";

export default function Report() {
    const { user, loading, token } = React.useContext(Context);
    const [calendarValue, setCalendarValue] = React.useState(new Date());
    const [calendarOpen, setCalendarOpen] = React.useState(false);
    const [selectedVelo, setSelectedVelo] = React.useState('');
    const [selectedOficcer, setSelectedOficcer] = React.useState('');
    const emptyOrder = !Object.keys(user).length;
    const calendarClass = ['calendar', "active"];


    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const licenseNumber = form.licenseNumber.value;
        const ownerFullName = form.ownerFullName.value;
        const type = selectedVelo;
        const color = form.color.value;
        const date = calendarValue
        const description = form.description.value;
        const officer = selectedOficcer

        if (emptyOrder) {
            const userDate = {
                licenseNumber: licenseNumber,
                ownerFullName: ownerFullName,
                type: type,
                clientId: 'ece7c4e5-0153-4d0d-bce6-09e00966ea0a',
                color: color,
                date: date,
                description: description
            }

            fetch('https://sf-final-project-be.herokuapp.com/api/public/report', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(userDate)
            })
                .then(response => response.json())
                .then(result => {
                    if (result.status === 'OK') {
                        alert('Случай успешно отправлен');
                    } else {
                        alert('При отправке случая возникла ошибка');
                    }
                })

        } else {
            const userDate = {
                licenseNumber: licenseNumber,
                ownerFullName: ownerFullName,
                type: type,
                color: color,
                date: date,
                officer: officer,
                description: description
            }

            fetch('https://sf-final-project-be.herokuapp.com/api/cases/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(userDate)
            })
                .then(response => response.json())
                .then(result => {
                    if (result.status === 'OK') {
                        alert('Случай успешно отправлен');
                    } else {
                        alert('При отправке случая возникла ошибка');
                    }
                })
        }
        form.reset();
    }

    const handleChangeSelect = event => {
        setSelectedVelo(event.target.value);
    };

    const handleChangeOfficer = event => {
        setSelectedOficcer(event.target.value);
    }

    return (
        loading ? <LoadingPage /> : <div className="wrapper">
            <Header />
            <main className="main_report">
                <div className="container">
                    <form onSubmit={handleSubmit} className="report_form">
                        <label>
                            Номер лицензии*
                            <input name='licenseNumber' required type='text' />
                        </label>
                        <label>
                            ФИО*
                            <input name='ownerFullName' required type='text' />
                        </label>
                        <select required value={selectedVelo} onChange={handleChangeSelect}>
                            <option disabled={true} value="">Тип велосипеда*</option>
                            <option value="general">General</option>
                            <option value="sport">Sport</option>
                        </select>
                        <label>
                            Цвет
                            <input name='color' required type='text' />
                        </label>
                        <div className="calendar_wrapper">
                            <div onClick={() => setCalendarOpen(prev => !prev)} className="calendar_info">
                                Выбрать дату
                            </div>
                            <Calendar className={calendarOpen ? calendarClass.join(' ') : 'calendar'} onChange={setCalendarValue} value={calendarValue} />
                        </div>
                        {!emptyOrder && <OfficerSelect handleChangeOfficer={handleChangeOfficer} selectedOficcer={selectedOficcer} />}
                        <label className="description">
                            Описание
                            <textarea name='description' type='text' />
                        </label>
                        <input className="report_submit" type='submit' />
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    )
}