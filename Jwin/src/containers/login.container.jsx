import { useForm } from "react-hook-form";
import LoginComponent from "../componentes/login.component";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/sessionApi"
import Swal from "sweetalert2";
import { logged_in } from "../redux/actions/authActions"
import { useDispatch } from 'react-redux'

const LoginContainer = () => {
    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
    const navigate = useNavigate()
    const dispatch = useDispatch()

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
                dispatch(logged_in())
                navigate('/')
            }
        },
        onError: (error) => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message
            });
        }
    })
    const onSubmit = handleSubmit(data => {
        reset()
        const formData = {
            password: data.Contraseña,
            email: data.Correo,
        }
        accesLogin.mutate(formData)
    })
    return (
        <>
            <LoginComponent
                onSubmit={onSubmit}
                errors={errors}
                register={register}
                watch={watch}
            />
        </>
    )
}

export default LoginContainer
