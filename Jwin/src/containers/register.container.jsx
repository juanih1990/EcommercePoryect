import { useMutation } from '@tanstack/react-query'
import { registerUser } from '../api/sessionApi.js'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import RegisterForm from '../componentes/register.component.jsx'
import Swal from 'sweetalert2'

import React from 'react'

const RegisterContainer = () => {
    const { register, handleSubmit, formState: { errors }, watch ,reset } = useForm();
    const navigate = useNavigate()
    const addUserMutation = useMutation({
        mutationFn: registerUser,
        onSuccess: (data) => {
                if (data && typeof data === 'string') { 
                    console.log(data)
                    Swal.fire({
                     
                        icon: 'error',
                        title: 'Error',
                        text: data
                    });
                } else {
                    Swal.fire({
                        icon: 'success',
                        title: '¡Registro exitoso!',
                        text: 'Gracias por unirte a jwin.'
                    }).then(() => {
                        navigate('/');
                    });
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
            name: data.Nombre,
            lastName: data.Apellido,
            age: data.Edad,
            password: data.Contraseña,
            email: data.Correo,
        }

        delete formData.Nombre
        delete formData.Apellido
        delete formData.Edad
        delete formData.Contraseña
        delete formData.Correo
        addUserMutation.mutate(formData)
        
    })
    return (
        <>
            <RegisterForm
            onSubmit={onSubmit}
            errors={errors}
            register={register}
            watch={watch}
            />
       </>
        
    )
}

export default RegisterContainer
