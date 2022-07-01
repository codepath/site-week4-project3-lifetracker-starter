import {useNavigate} from 'react-router-dom'
import * as React from 'react'
export default function LoginPage() {
    var isLoggedIn = false;
    const [form, setForm] = React.useState({
        email: "",
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

    const navigate = useNavigate()
    React.useEffect(() => {
        if(isLoggedIn) {
            navigate('/activity');
        }},[]
    )

    return(
        <div className="login-page">
            Login
            <input type="text" name="email" placeholder='email' value={form.email} onChange={handleOnChange}/>
            <input type="text" name='password' placeholder="password" value={form.password} onChange={handleOnChange}/>
            <input type="button" name='login' value="Login" onClick={handleOnClick}/>
        </div>
    )
}