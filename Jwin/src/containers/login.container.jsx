import { useForm } from "react-hook-form";
import LoginComponent from "../componentes/login.component";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { loginUser , gmailLogin } from "../api/sessionApi"
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
            })
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

    const gmailQuery  = useQuery({
        queryKey: ['gmailLogin'],
        queryFn: gmailLogin,
        enabled: false
    })

    const onGoogleLogin = () => {
        console.log("entro al boton ")
        gmailQuery.refetch()// Aquí manejas la lógica para la consulta gmailLogin
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
