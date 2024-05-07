import { useForm } from "react-hook-form";
import RecoveryPassComponent from "../componentes/recoveryPass.component";
import Swal from "sweetalert2";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom"
import { useState } from 'react'
import { updatePass } from '../api/sessionApi'



const RecoveryPassContainer = () => {
    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
    const navigate = useNavigate()
    const urlParams = new URLSearchParams(window.location.search)

    const email = urlParams.get('email')
    const expirationTime = urlParams.get('expirationTime')
    const _id = urlParams.get('_id')

    const [error, setError] = useState(null)


    const recoveryPassMutation = useMutation({
        mutationFn: updatePass,
        onSuccess: (data) => {
            if (data && typeof data === 'string' || data === undefined) {
                Swal.fire({

                    icon: 'error',
                    title: 'Error',
                    text: data
                });
            } else {
                Swal.fire({
                    icon: 'success',
                    title: '¡Contraseña actualizada!',
                    text: 'Comienza a comprar ! :)'
                }).then(() => {
                    navigate('/session')
                });
                
            }
        },
        onError: (error) => {
            console.log("entro ak " + error)
            if (error.response && error.response.data.error === 'El enlace de restablecimiento de contraseña ha expirado.') {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'El enlace de restablecimiento de contraseña ha expirado.',
                    onClose: () => navigate('/session')
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.message || 'Error inesperado'
                });
            }
        }
    })
    const onSubmit = async (data) => {
        try {


            reset()
            const formData = {
                email: email,
                password: data.Contraseña,
                expirationTime: expirationTime,
                id: _id

            }
            recoveryPassMutation.mutate(formData)

        } catch (error) {
            console.log(error)

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,
                onClose: () => navigate('/session')
            });

        }
    }
    return (
        <>
            <RecoveryPassComponent
                onSubmit={handleSubmit(onSubmit)}
                errors={errors}
                register={register}
                watch={watch}
            />
        </>
    )
}

export default RecoveryPassContainer