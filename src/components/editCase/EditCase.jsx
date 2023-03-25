import React from "react";
import Calendar from 'react-calendar';
import Context from "../../Context";
import OfficerSelect from "../officerSelect/OfficerSelect";

export default function EditCase({
    _id,
    status,
    licenseNumber,
    ownerFullName,
    type,
    color,
    date,
    officer,
    description,
    resolution
}) {

    const { token } = React.useContext(Context);
    const [resolutionValue, setResolutionValue] = React.useState(resolution);
    const [selectedVelo, setSelectedVelo] = React.useState(type);
    const [selectStatus, setSelectStatus] = React.useState(status);
    const [selectedOficcer, setSelectedOficcer] = React.useState(officer);
    const [calendarValue, setCalendarValue] = React.useState(new Date(date));
    const [calendarOpen, setCalendarOpen] = React.useState(false);
    const calendarClass = ['calendar', "active"];


    const handleChangeSelect = event => {
        setSelectedVelo(event.target.value);
    };

    const handleChangeStatus = event => {
        setSelectStatus(event.target.value);
    };

    const handleChangeOfficer = event => {
        setSelectedOficcer(event.target.value);
    }

    const handleChangeResolution = event => {
        setResolutionValue(event.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const licenseNumber = form.licenseNumber.value;
        const ownerFullName = form.ownerFullName.value;
        const color = form.color.value;
        const description = form.description.value;
        const resolution = form.resolution.value;

        const date = {
            status: selectStatus,
            licenseNumber: licenseNumber,
            ownerFullName: ownerFullName,
            type: selectedVelo,
            color: color,
            date: calendarValue,
            officer: selectedOficcer,
            description: description,
            resolution: resolution
        }
        fetch(`https://sf-final-project-be.herokuapp.com/api/cases/${_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(date)
        })
            .then(response => response.json())
            .then(result => {
                if (result.status === 'OK') {
                    alert('Успешно')
                } else {
                    alert('Ошибка')
                }
            })
    }

    return (
        <form onSubmit={handleSubmit} className="edit_form">
            <label>
                Статус:
                <select defaultValue={selectStatus} onChange={handleChangeStatus}>
                    <option value='new'>New</option>
                    <option value='in_progress'>In progress</option>
                    <option disabled={resolutionValue ? false : true} value='done'>Done</option>
                </select>
            </label>
            <label>
                № лицензии:
                <input name="licenseNumber" defaultValue={licenseNumber} />
            </label>
            <label>
                ФИО:
                <input name="ownerFullName" defaultValue={ownerFullName} />
            </label>
            <select value={selectedVelo} onChange={handleChangeSelect}>
                <option value="general">General</option>
                <option value="sport">Sport</option>
            </select>
            <label>
                Цвет:
                <input name="color" defaultValue={color} />
            </label>
            <div className="calendar_wrapper">
                <div onClick={() => setCalendarOpen(prev => !prev)} className="calendar_info">
                    Выбрать дату
                </div>
                <Calendar className={calendarOpen ? calendarClass.join(' ') : 'calendar'} onChange={setCalendarValue} value={calendarValue} />
            </div>
            <label>
                Изменить сотрудника:
                <OfficerSelect handleChangeOfficer={handleChangeOfficer} selectedOficcer={selectedOficcer} officer={officer} />
            </label>
            <label>
                Описание:
                <textarea name="description" defaultValue={description} />
            </label>
            <label>
                Завершающий комментарий:
                <textarea name='resolution' onChange={handleChangeResolution} defaultValue={resolutionValue} />
            </label>
            <input className="edit_case_submit" type='submit' value='Сохранить'/>
        </form>
    )
}