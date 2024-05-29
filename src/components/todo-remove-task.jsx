import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";


export function ToDoRemoveTask()
{
    const [appointments, setAppointments] = useState([{Appointment_Id:0, Title:'', Description:'', Date:new Date(), UserId:''}]);

    let params = useParams();
    let navigate = useNavigate();

    useEffect(()=>{

        axios.get(`http://127.0.0.1:4000/view-task/${params.id}`)
        .then(response => {
            setAppointments(response.data);
        });
    },[]);

    function handleRemoveClick(){
        axios.delete(`http://127.0.0.1:4000/delete-task/${params.id}`)
        .then(()=> {
            alert('Task Deleted');
            navigate('/dashboard');
        })
    }

    return(
        <div className="bg-light m-3 p-4 border border-2 border-secondary rounded">
            <h3>Are You Sure? You Want to Delete Task</h3>
            <dl>
                <dt>Title</dt>
                <dd>{appointments[0].Title}</dd>
                <dt>Description</dt>
                <dd>{appointments[0].Description}</dd>
                <dt>Date</dt>
                <dd>{moment(appointments[0].Date).format('Do MMMM, YYYY')}</dd>
            </dl>
            <button onClick={handleRemoveClick} className="btn btn-danger me-2">Yes</button>
            <Link to="/dashboard" className="btn btn-warning">No</Link>
        </div>
    )
}