import { useForm } from "react-hook-form";
import LoginComponent from "../componentes/login.component";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/sessionApi"
import Swal from "sweetalert2";
import { logged_in } from "../redux/actions/authActions"
import { is_admin } from '../redux/actions/isAdminAction'
import { useDispatch } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'
import { useState } from "react";

const LoginContainer = () => {
    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
    const { user, loginWithRedirect } = useAuth0()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [form, setForm] = useState({})




    const accesLogin = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            if (data && typeof data === 'string') {
                Swal.fire({

                    icon: 'error',
                    title: 'Error',
                    text: data
                });
            } else {
                if (form.password === 'C0s1pr0nomadic' && form.email === 'cosypro@cosypro.com') {
                    dispatch(is_admin())
                }
                dispatch(logged_in())
                navigate('/')
            }
        },
        onError: (error) => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message
            })
        }
    })
    const onSubmit = handleSubmit(data => {
        reset()
        const formData = {
            password: data.Contraseña,
            email: data.Correo,
        }
        setForm(formData)
        accesLogin.mutate(formData)
    })


    const onGoogleLogin = () => {
        loginWithRedirect()
    };


    return (
        <>
            <LoginComponent
                onSubmit={onSubmit}
                errors={errors}
                register={register}
                watch={watch}
                onGoogleLogin={onGoogleLogin}
            />
        </>
    )
}
export default LoginContainer
