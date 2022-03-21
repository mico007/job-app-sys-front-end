import React from "react";

import Admin from "../../admin-HR/pages/layout";
import ApplicationItems from "./application.items";

const ApplicationList = props => {
    return (
        <Admin>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Received Applications</h1>
            </div>

            <div className="table-responsive">
                <table className="table table-striped table-hover table-sm">
                    <thead className="table-success">
                        <tr>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Address</th>
                            <th scope="col">City</th>
                            <th scope="col">Province</th>
                            <th scope="col">Country</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.items.map(application => (
                            <ApplicationItems
                                key={application.applicationId}
                                id={application.applicationId}
                                firstname={application.firstname}
                                lastname={application.lastname}
                                email={application.email}
                                phone={application.phone}
                                address={application.address} 
                                city={application.city}
                                province={application.province}
                                country={application.country}
                                status={application.status}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </Admin>
    )
}

export default ApplicationList;