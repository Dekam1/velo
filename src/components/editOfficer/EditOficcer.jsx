import React from "react"
import Context from "../../Context";

export default function EditOfficer({ firstName, lastName, approved, _id }) {
    const [officerApproved, setOfficerApproved] = React.useState(approved);
    const { token, setUser, user } = React.useContext(Context);

    const handleChange = event => {
        setOfficerApproved(event.target.value);
    }

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const firstName = form.firstName.value;
        const lastName = form.lastName.value;
        const approved = officerApproved;
        const date = {
            firstName: firstName,
            lastName: lastName,
            approved: approved,
        }
        const putDate = async () => {
            const response = await fetch(`https://sf-final-project-be.herokuapp.com/api/officers/${_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(date)
            })
            const result = await response.json();
            if (result.status === 'OK') {
                if (result.data._id === user.id) {
                    setUser(prev => (
                        {
                            ...prev,
                            id: result.data._id,
                            firstName: result.data.firstName,
                            lastName: result.data.lastName,
                            approved: result.data.approved
                        }
                    ))
                }
            }
        }
        putDate();
    }

    console.log(user)

    return (
        <form onSubmit={handleSubmit} className="edit_officer_form">
            <label>
                Имя:
                <input defaultValue={firstName} name='firstName'></input>
            </label>
            <label>
                Фамилия:
                <input defaultValue={lastName} name='lastName'></input>
            </label>
            <select onChange={handleChange} value={officerApproved}>
                <option value={true}>Сотрудник</option>
                <option value={false}>Не сотрудник</option>
            </select>
            <input className='edit_officer_submit' type='submit'></input>
        </form>
    )
}