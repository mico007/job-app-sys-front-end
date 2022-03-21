import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Switch from "react-switch";

import LoadingSpinner from '../../UI-Elements/LoadingSpinner'
import ErrorModal from '../../UI-Elements/ErrorModal.js';

import { useHttpClient } from '../../hooks/http-hook';
import { AuthContext } from '../../context/auth-context';

const ApplicationItems = props => {

    const auth = useContext(AuthContext);

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    let initialState;

    if (props.status === 'Passed') {
        initialState = true;
    } else {
        initialState = false;
    }

    const [checked, setChecked] = useState(initialState);

    const switchHandler = async (nextChecked) => {
        setChecked(nextChecked);
        if (nextChecked) {
            try {
                await sendRequest(
                    `https://job-application-sys.herokuapp.com/job-app-sys-api/applications/status-on/${props.id}`,
                    'PUT', {},
                    {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + auth.token
                    }
                );
                window.location.assign('/admin-HR');
            } catch (err) { }
        } else {
            try {
                await sendRequest(
                    `https://job-application-sys.herokuapp.com/job-app-sys-api/applications/status-off/${props.id}`,
                    'PUT', {},
                    {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + auth.token
                    }
                );
                window.location.assign('/admin-HR');
            } catch (err) { }
        }
    }

    return (
        <React.Fragment>

            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner asOverlay />}

            <tr>
                <td>{props.firstname}</td>
                <td>{props.lastname}</td>
                <td>{props.email}</td>
                <td>{props.phone}</td>
                <td>{props.address}</td>
                <td>{props.city}</td>
                <td>{props.province}</td>
                <td>{props.country}</td>
                <td>
                    <span className="text-primary">{props.status}</span> &nbsp;
                    <Switch onChange={switchHandler} checked={checked} />
                </td>
                <td><Link to={`/${props.id}`} className="text-primary"><i className="far fa-eye"></i></Link></td>
                <td onClick={() => window.open(`https://job-application-sys.herokuapp.com/job-app-sys-api/applications/downloadFile/${props.id}`, "_blank") } className="text-primary"><i class="fas fa-file-alt"></i></td>
            </tr>
        </React.Fragment>
    )
}

export default ApplicationItems;