import React, { useContext } from "react";
import { useHistory, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import LoadingSpinner from '../UI-Elements/LoadingSpinner'
import ErrorModal from '../UI-Elements/ErrorModal'

import { useHttpClient } from '../hooks/http-hook'
import { AuthContext } from '../context/auth-context'

const Login = () => {

    const auth = useContext(AuthContext);

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const history = useHistory();

    const loginSubmitHandler = async (data, e) => {
        
        try {
            const responseData = await sendRequest(
                "http://localhost:8080/job-app-sys-api/users/login-user",
                'POST',
                JSON.stringify({
                    email: data.email,
                    password: data.password
                }),
                {
                    'Content-Type': 'application/json',
                }
            );
            e.target.reset();
            auth.login(responseData.userId, responseData.token);
            history.push('/admin-HR');
        } catch (err) { }
    };

    return (
        <section className="vh-100" style={{ backgroundColor: "SteelBlue" }}>
            <ErrorModal error={error} onClear={clearError} />
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card shadow-2-strong" style={{ borderRadius: "1rem" }}>
                            <form onSubmit={handleSubmit(loginSubmitHandler)} className="card-body p-3 text-center">

                                {isLoading && <LoadingSpinner asOverlay />}

                                <h3 className="mb-5">Sign in</h3>

                                <div className="form-outline mb-4">
                                    <input {...register('email', { required: true })} type="email" id="typeEmailX-2" className={`${errors.email && 'border-danger'} form-control form-control-lg`} placeholder="Email" />
                                    {errors.email && <p className={`${errors.email && 'text-danger'}`}>Email is required.</p>}
                                </div>

                                <div className="form-outline mb-4">
                                    <input {...register('password', { required: true })} type="password" id="typePasswordX-2" className={`${errors.password && 'border-danger'} form-control form-control-lg`} placeholder="Password" />
                                    {errors.password && <p className={`${errors.password && 'text-danger'}`}>Password is required.</p>}
                                </div>

                                <div className="form-check d-flex justify-content-start mb-4">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value=""
                                        id="form1Example3"
                                    /> &nbsp;
                                    <label className="form-check-label" for="form1Example3"> Remember password </label>
                                </div>

                                <button className="btn btn-outline-primary me-2  btn-block" type="submit">Login</button>
                            </form>
                            <div className="mb-3">
                                <div className="d-flex justify-content-center links">
                                    Don't have an account? &nbsp; <Link to="/signup" className="ml-2 text-primary">Sign Up</Link>&nbsp; or &nbsp;
                                    <Link to="/" className="ml-2 text-primary">Return Home</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login;