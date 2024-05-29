import axios from "axios";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

export function ToDoAddTask()
{

    const [cookies, setCookie, removeCookie] = useCookies('userid');
    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            Appointment_Id:0,
            Title:'',
            Description:'',
            Date:'',
            UserId: cookies['userid']
        }, 
        onSubmit: (task)=> {
            axios.post(`http://127.0.0.1:4000/add-task`, task);
            alert("Task Added Successfully.");
            navigate('/dashboard');
        }
    })
    return(
        <div className="bg-light text-dark p-4">
            <form onSubmit={formik.handleSubmit} className="w-25">
                <div className="h4">{cookies['userid']} - Add Task</div>
                <dl>
                    <dt>Appointment Id</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="Appointment_Id" className="form-control" /></dd>
                    <dt>Title</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="Title" className="form-control" /></dd>
                    <dt>Decsription</dt>
                    <dd>
                        <textarea name="Description" onChange={formik.handleChange} rows="4" cols="30" className="form-control"></textarea>
                    </dd>
                    <dt>Date</dt>
                    <dd><input type="date" onChange={formik.handleChange} name="Date" className="form-control" /></dd>
                </dl>
                <button type="submit" className="btn btn-warning w-50">Submit</button>
                <Link to="/dashboard" className="btn btn-danger  w-50">Cancle</Link>
            </form>
        </div>
    );
}