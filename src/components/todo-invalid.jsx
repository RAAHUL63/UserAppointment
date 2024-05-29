import { Link } from "react-router-dom";

export function ToDoInvalid()
{
    return(
        <div className="text-danger bg-light p-4 m-3 border border-2 border-secondary rounded w-25">
            <h2>Invalid Credentials</h2>
            <Link to='/login'>Try Again</Link>
        </div>
    );
}