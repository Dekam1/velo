import React from "react"
import Context from "../../Context"

export default function OfficerSelect({ selectedOficcer, officer = false, handleChangeOfficer }) {
    const { token } = React.useContext(Context);
    const [officers, setOfficers] = React.useState([]);


    React.useEffect(() => {
        async function getDate() {
            const response = await fetch('https://sf-final-project-be.herokuapp.com/api/officers/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const result = await response.json();
            const { officers } = result;
            setOfficers(officers)
        }
        getDate();
    }, []);

    return (
        
        <select defaultValue={selectedOficcer} onChange={handleChangeOfficer}>
            <option  value={officer}>
                {officer ? officer : 'Выбрать сотрудника'}
            </option>
            {officers
            .filter(officerFilter => {
                return officer !== officerFilter._id;
            })
            .map(officer => {
                if (officer.approved) {
                    return <option key={officer._id} value={officer._id}>{officer.firstName}</option>
                }
            })}
        </select>
    )
}