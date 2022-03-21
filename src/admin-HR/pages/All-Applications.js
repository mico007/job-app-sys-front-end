import React, { useEffect, useState, useContext } from "react";

import ApplicationList from "../components/application-list";
import LoadingSpinner from '../../UI-Elements/LoadingSpinner'
import ErrorModal from '../../UI-Elements/ErrorModal.js';

import { useHttpClient } from '../../hooks/http-hook';
//import { AuthContext } from '../../context/auth-context';

const AllApplications = () => {

    //const auth = useContext(AuthContext);

    const storedData = JSON.parse(localStorage.getItem('userData'))

    const [loadedApplications, setLoadedApplications] = useState();

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await sendRequest(
                    'http://localhost:8080/job-app-sys-api/applications',
                    'GET',
                    null,
                    {
                        Authorization: "Bearer " + storedData.token
                    }
                )

                setLoadedApplications(response);
            } catch (err) { }
        };
        fetchApplications();
    }, [sendRequest]);

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner asOverlay />}
            {!isLoading && loadedApplications && <ApplicationList items={loadedApplications} />}
        </React.Fragment>
    )
}

export default AllApplications;