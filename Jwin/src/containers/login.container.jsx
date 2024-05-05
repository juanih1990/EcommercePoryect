import { useForm } from "react-hook-form";
import LoginComponent from "../componentes/login.component";

const LoginContainer = () => {
    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();

    const onSubmit = handleSubmit(data => {
        reset()
        const formData = {
            password: data.Contraseña,
            email: data.Correo,
        }
        console.log(formData)

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
