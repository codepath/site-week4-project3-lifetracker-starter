import * as React from "react"

export default function RegistrationPage() {
    const [form, setForm] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: ""
      })

    const handleOnChange = (eve) => {
        let targetName = eve.target.name;
        let targetValue = eve.target.value;

        setForm((prevForm) => ({...prevForm, [targetName]: targetValue}))
    }

    const handleOnClick = () => {
        console.log(form);
    }

    return (
        <div>RegistrationPage
            <input type="text" name="firstName" placeholder="first_name" value={form.firstName} onChange={handleOnChange}/>
            <input type="text" name="lastName" placeholder="last_name" value={form.lastName} onChange={handleOnChange}/>
            <input type="text" name="email" placeholder="email" value={form.email} onChange={handleOnChange}/>
            <input type="text" name="username" placeholder="username" value={form.username} onChange={handleOnChange}/>
            <input type="text" name="password" placeholder="password" value={form.password} onChange={handleOnChange}/>
            <input type="button" name="submit" value="create account" onClick={handleOnClick} onChange={handleOnChange}/>
        </div>
    )
}