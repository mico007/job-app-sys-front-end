import React, { useContext } from "react";
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import LoadingSpinner from '../UI-Elements/LoadingSpinner'
import ErrorModal from '../UI-Elements/ErrorModal'

import { useHttpClient } from '../hooks/http-hook'
import { AuthContext } from '../context/auth-context'

const Register = () => {

    const auth = useContext(AuthContext);

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const history = useHistory();

    const signupSubmitHandler = async (data, e) => {
        
        try {
            const responseData = await sendRequest(
                "https://job-application-sys.herokuapp.com/job-app-sys-api/users",
                'POST',
                JSON.stringify({
                    fullName: data.fullName,
                    email: data.email,
                    password: data.password
                }),
                {
                    'Content-Type': 'application/json',
                }
            );
            e.target.reset();
            history.push('/login');
        } catch (err) { }
    };

    return (
        <section className="vh-100" style={{ backgroundColor: "SteelBlue" }}>
            <ErrorModal error={error} onClear={clearError} />
            <div className="container py-4 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card shadow-2-strong" style={{ borderRadius: "1rem" }}>
                            <form onSubmit={handleSubmit(signupSubmitHandler)} className="card-body p-5 text-center">

                                {isLoading && <LoadingSpinner asOverlay />}

                                <h3 className="mb-4">Register</h3>

                                <div className="form-outline mb-3">
                                    <input {...register('fullName', { required: true })} type="text" id="typeEmailX-2" className={`${errors.fullName && 'border-danger'} form-control`} placeholder="Fullname" />
                                    {errors.fullName && <p className={`${errors.fullName && 'text-danger'}`}>Your name is required.</p>}
                                </div>

                                <div className="form-outline mb-3">
                                    <input {...register('email', { required: true })} type="email" id="typePasswordX-2" className={`${errors.email && 'border-danger'} form-control`} placeholder="Email" />
                                    {errors.email && <p className={`${errors.email && 'text-danger'}`}>Your email is required.</p>}
                                </div>

                                <div className="form-outline mb-3">
                                    <input {...register('password', { required: 'Password is required.', minLength: { value: 6, message: 'Password should be at least 6 characters.' } })} type="password" id="typePasswordX-2" className={`${errors.password && 'border-danger'} form-control`} placeholder="Password" />
                                    {errors.password && <p className={`${errors.password && 'text-danger'}`}>{errors.password.message}.</p>}
                                </div>


                                <button className="btn btn-outline-primary me-2  btn-block" type="submit">Sign Up</button> 

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register;