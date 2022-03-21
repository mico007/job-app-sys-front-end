import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import LoadingSpinner from "../UI-Elements/LoadingSpinner";
import ErrorModal from "../UI-Elements/ErrorModal.js";

import { useHttpClient } from "../hooks/http-hook"

const JobApplication = () => {

    const [showAlert, setShowAlert] = useState(false);

    const [fileCv, setFileCv] = useState(undefined);

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const { register, handleSubmit, formState: { errors } } = useForm();

    // const onSubmit = data => {
    //     console.log(data.province)
    //     //setIsLoading(true)
    //     axios.post('http://localhost:8000/api/applications', {
    //         firstname: data.firstname,
    //         lastname: data.lastname,
    //         email: data.email,
    //         phone: data.phone,
    //         address: data.address,
    //         city: data.city,
    //         province: data.province,
    //         country: data.country,
    //         github: data.github,
    //         website: data.website,
    //         linkedin: data.linkedin
    //     })
    //         .then(response => {
    //             setResponseData(response.data)
    //             //setIsLoading(false)
    //         })
    //         .catch(error => {
    //             setError(error.message);
    //             //setIsLoading(false)
    //         });
    // };

    // const clearError = () => {
    //     setError(null);
    //   };

    const test = (applicationId) => {

        const formData = new FormData();

        formData.append("file", fileCv);
        formData.append("app_id", applicationId);

        const options = {
            method: "POST",
            body: formData
        };
        fetch("https://job-application-sys.herokuapp.com/job-app-sys-api/applications/uploadFile", options);
    }

    let responseData

    const onSubmitApplication = async (data, e) => {

        try {
            responseData = await sendRequest(
                "https://job-application-sys.herokuapp.com/job-app-sys-api/applications/create-application",
                'POST',
                JSON.stringify({
                    firstname: data.firstname,
                    lastname: data.lastname,
                    email: data.email,
                    phone: data.phone,
                    address: data.address,
                    city: data.city,
                    province: data.province,
                    country: data.country,
                    github: data.github,
                    website: data.website,
                    linkedin: data.linkedin
                }),
                {
                    'Content-Type': 'application/json'
                }
            );
            e.target.reset();
            test(responseData.applicationId);
            setShowAlert(true)
        } catch (err) { }
    };

    return (
        <React.Fragment>
            <div className="container py-5">
                <div className="row justify-content-center col-lg-9">
                    {showAlert && (<div className="alert alert-success alert-dismissible fade show pt-" role="alert">
                        <strong>Application Received Successfully!</strong> You will hear from us as soon as possible.
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                    )}
                    <h4 className="text-info mb-4">Job Application</h4>
                    <div className="card border-info mb-3">
                        <div className="card-body">
                            <ErrorModal error={error} onClear={clearError} />
                            <h5 className="card-title"><i className="far fa-edit"></i> Apply</h5>
                            <p className="card-text">Enter Your Profile Details & Upload Your CV</p>
                            <hr />
                            <form onSubmit={handleSubmit(onSubmitApplication)} className="g-3 col-9" encType="multipart/form-data">
                                {isLoading && <LoadingSpinner asOverlay />}
                                <div className="col-md-6 mb-2">
                                    <label htmlFor="firstname" className="form-label">First Name *</label>
                                    <input {...register('firstname', { required: true })} type="text" className={`${errors.firstname && 'border-danger'} form-control`} id="firstname" />
                                    {errors.firstname && <p className={`${errors.firstname && 'text-danger'}`}>First Name is required.</p>}
                                </div>
                                <div className="col-md-6 mb-2">
                                    <label htmlFor="lastname" className="form-label">Last Name *</label>
                                    <input {...register('lastname', { required: true })} type="text" className={`${errors.lastname && 'border-danger'} form-control`} id="lastname" />
                                    {errors.lastname && <p className={`${errors.lastname && 'text-danger'}`}>Last Name is required.</p>}
                                </div>
                                <div className="col-md-8 mb-2">
                                    <label htmlFor="email" className="form-label">Email *</label>
                                    <input {...register('email', { required: true })} type="email" className={`${errors.email && 'border-danger'} form-control`} id="email" />
                                    {errors.email && <p className={`${errors.email && 'text-danger'}`}>Email is required.</p>}
                                </div>
                                <div className="col-md-4 mb-2">
                                    <label htmlFor="phone" className="form-label">Phone *</label>
                                    <input {...register('phone', { required: true })} type="text" className={`${errors.phone && 'border-danger'} form-control`} id="phone" />
                                    {errors.phone && <p className={`${errors.phone && 'text-danger'}`}>Mobile number is required.</p>}
                                </div>
                                <div className="col-md-8 mb-2">
                                    <label htmlFor="address" className="form-label">Address *</label>
                                    <input {...register('address', { required: true })} type="text" className={`${errors.address && 'border-danger'} form-control`} id="address" />
                                    {errors.address && <p className={`${errors.address && 'text-danger'}`}>Address is required.</p>}
                                </div>
                                <div className="col-md-6 mb-2">
                                    <label htmlFor="inputCity" className="form-label">City *</label>
                                    <input {...register('city', { required: true })} type="text" className={`${errors.city && 'border-danger'} form-control`} id="inputCity" />
                                    {errors.city && <p className={`${errors.city && 'text-danger'}`}>City is required.</p>}
                                </div>
                                <div className="col-md-6 mb-2">
                                    <label htmlFor="province" className="form-label">Province *</label>
                                    <input {...register('province', { required: true })} type="text" className={`${errors.province && 'border-danger'} form-control`} id="province" />
                                    {errors.province && <p className={`${errors.province && 'text-danger'}`}>Province is required.</p>}
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="country" className="form-label">Country *</label>
                                    <input {...register('country', { required: true })} type="text" className={`${errors.country && 'border-danger'} form-control`} id="country" />
                                    {errors.country && <p className={`${errors.country && 'text-danger'}`}>Country is required.</p>}
                                </div>
                                <hr />
                                <div className="col-md-8 mb-3">
                                    <label htmlFor="cv" className="form-label">CV/Resume *</label>
                                    <input required onChange={(e) => { 
                                        setFileCv(e.target.files[0]);
                                    }} className="form-control form-control-md" id="cv" type="file" />
                                </div>
                                <div className="col-md-8 mb-2">
                                    <label htmlFor="github" className="form-label">GitHub URL</label>
                                    <input {...register('gitgub')} type="text" className="form-control" id="github" />
                                </div>
                                <div className="col-md-8 mb-2">
                                    <label htmlFor="website" className="form-label">Website, Blog, Portfolio</label>
                                    <input {...register('website')} type="text" className="form-control" id="website" />
                                </div>
                                <div className="col-auto col-md-8">
                                    <label className="form-label" htmlFor="LinkedIn">LinkedIn Profile URL</label>
                                    <div className="input-group">
                                        <div className="input-group-text">in</div>
                                        <input {...register('linkedin')} type="text" className="form-control" id="LinkedIn" />
                                    </div>
                                </div>
                                <div className="col-12 my-5">
                                    <button type="submit" className="btn btn-outline-info"><i className="fas fa-check-circle"></i> Submit Application</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="bg-dark d-flex flex-wrap justify-content-end align-items-end border-top">
                <ul className=" col-md-4 justify-content-end list-unstyled d-flex" style={{ marginRight: "30px" }}>
                    <div className="my-4">
                        <Link to="/admin-HR" className="text-light" style={{ fontSize: "1.3rem" }}><i className="fas fa-user-tie"></i> sysHR</Link>
                    </div>
                </ul>
            </footer>

        </React.Fragment>
    )

}

export default JobApplication;