import './App.css'
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})


function App() {

    let {register, handleSubmit, reset, formState: {errors, isSubmitting}, setError} = useForm({
        defaultValues: {
            email: "test@gmail.com"
        },
        resolver: zodResolver(schema)
    });

    const onSubmit = async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            throw new Error();
            console.log(data);
        } catch (error) {
            setError("root", {
                message: "This email is already taken"
            })
        }

    }

    return (
        <div className="formContainer">
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="Email" {...register("email", {
                    required: "Email is required",
                    pattern: /^[a-z0-9._5+-]+@[a-z.-]+\.[a-z]{2,4}$/,
                })}/>
                {errors.email && <div>{errors.email.message}</div>}

                <input type="password" placeholder="Password" {...register("password",
                    // { ----------- This is validation by Zod library ------------
                    //     required: "Password is required",
                    //     minLength: {
                    //         value: 5,
                    //         message: "Password must have 5 characters"
                    //     }
                    // }
                )}/>
                {errors.password && <div>{errors.password.message}</div>}

                <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Loading..." : "Submit"}</button>

                {errors.root && <div>{errors.root.message}</div>} {/*Global Form error comes from backend*/}
            </form>
        </div>
    )
}

export default App
