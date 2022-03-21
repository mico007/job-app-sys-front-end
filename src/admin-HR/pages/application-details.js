import React, { useEffect, useState} from "react";
import { useParams } from 'react-router-dom';

import Admin from "./layout";
import LoadingSpinner from "../../UI-Elements/LoadingSpinner";
import ErrorModal from "../../UI-Elements/ErrorModal";

import { useHttpClient } from '../../hooks/http-hook';
//import {AuthContext} from '../../context/auth-context'

const ApplicationDetails = () => {

    //const auth = useContext(AuthContext);

    const storedData = JSON.parse(localStorage.getItem('userData'))

    const appId = useParams().applId;

    const [loadedApplication, setLoadedApplication] = useState();

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        const fetchApplication = async () => {
            try {
                const response = await sendRequest(
                    `http://localhost:8080/job-app-sys-api/applications/${appId}`,
                    'GET',
                    null,
                    {
                        Authorization: "Bearer " + storedData.token
                    }
                )

                setLoadedApplication(response);
            } catch (err) { }
        };
        fetchApplication();
    }, [sendRequest, appId]);


    return (
        <Admin>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner asOverlay />}

            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Job Application Details</h1>
            </div>
            {!isLoading && loadedApplication && (
                <>

                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-sm">First Name</span>
                        <input value={loadedApplication.firstname} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                    </div>
                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Last Name</span>
                        <input value={loadedApplication.lastname} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                    </div>
                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Email</span>
                        <input value={loadedApplication.email} type="email" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                    </div>
                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Phone</span>
                        <input value={loadedApplication.phone} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                    </div>
                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Address</span>
                        <input value={loadedApplication.address} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                    </div>
                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-sm">City</span>
                        <input value={loadedApplication.city} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                    </div>
                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Province</span>
                        <input value={loadedApplication.province} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                    </div>
                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Country</span>
                        <input value={loadedApplication.country} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                    </div>
                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-sm">GitHub URL</span>
                        <input value={loadedApplication.github} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                    </div>
                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Website</span>
                        <input value={loadedApplication.website} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                    </div>
                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-sm">LinkeIn</span>
                        <input value={loadedApplication.linkedin} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                    </div>
                    <div className="input-group input-group-sm mb-5">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Status &nbsp; <span className={`${loadedApplication.status === 'Passed' && 'text-success'} text-second`}><i class="fas fa-circle"></i></span></span>
                        <input value={loadedApplication.status} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                    </div>
                </>
            )}
        </Admin>
    )
}

export default ApplicationDetails;