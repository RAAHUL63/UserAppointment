import axios from "axios";
import { useFormik } from "formik";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate, useParams } from "react-router-dom";



export function ToDoEditTask()
{
    const [appointments,  setAppointments] = useState([{Appointment_Id:0, Title:'', Description:'', Date:new Date(), UserId:''}]);
    const [cookies, setCookie, removeCookie] = useCookies()

    let params = useParams();
    let navigate = useNavigate();

    useEffect(()=>{
        axios.get(`http://127.0.0.1:4000/view-task/${params.id}`)
        .then(response=> {
            setAppointments(response.data);
        });
    },[]);


    const formik = useFormik({
        initialValues: {
            Appointment_Id: appointments[0].Appointment_Id,
            Title: appointments[0].Title,
            Description: appointments[0].Description,
            Date:moment(appointments[0].Date).format('MMMM Do YYYY'),
            UserId: cookies['userid']
        },

        onSubmit: (task) => {
            axios.put(`http://127.0.0.1:4000/edit-task/${params.id}`, task)
            .then(()=> {
                alert(`Task Edited Successfully.`);
                navigate('/dashboard');
            })
        },
        enableReinitialize: true
    })

    return(
        <div className="bg-light text-dark p-4">
            <h3>Edit Task</h3>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>Appointment_Id</dt>
                    <dd><input type="number" value={formik.values.Appointment_Id} name="Appointment_Id" onChange={formik.handleChange} className="form-control" /></dd>
                    <dt>Title</dt>
                    <dd><input type="text" value={formik.values.Title} name="Title" onChange={formik.handleChange} className="form-control" /></dd>
                    <dt>Description</dt>
                    <dd>
                        <textarea rows="4" cols="30" name="Description" value={formik.values.Description} onChange={formik.handleChange} className="form-control" />
                    </dd>
                    <dt>Date</dt>
                    <dd><input type="date" name="Date" value={formik.values.Date} className="form-control" onChange={formik.handleChange} /></dd>
                </dl>
                <button className="btn btn-success me-1">Save</button>
                <Link to="/dashboard" className="btn btn-danger">Cancel</Link>
            </form>
        </div>
    )
}