import { useForm } from "react-hook-form";
import ReminderComponent from "../componentes/reminder.component";
import Swal from "sweetalert2";
import { useMutation } from "@tanstack/react-query";
import { reminder } from '../api/sessionApi'
import { useNavigate } from "react-router-dom"

const ReminderContainer = () => {
    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
    const navigate = useNavigate ()
    const reminderMail = useMutation({
        mutationFn: reminder,
        onSuccess: (data) => {
            if (data && typeof data === 'string') {
                Swal.fire({

                    icon: 'error',
                    title: 'Error',
                    text: data
                });
            } else {
                navigate('/session')
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
    const onSubmit = async (data) => {
        reset()
        const formData = {
            email: data.Correo,
        }
      reminderMail.mutate(formData)
        
    }
    return (
        <>
            <ReminderComponent
                onSubmit={handleSubmit(onSubmit)}
                errors={errors}
                register={register}
                watch={watch}
            />
        </>
    )
}

export default ReminderContainer
