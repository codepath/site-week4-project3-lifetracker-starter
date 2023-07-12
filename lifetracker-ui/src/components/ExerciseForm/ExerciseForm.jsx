//import "./ExcercisePage.css"
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function ExcerciseForm({user, addExercise, setExercise, exercise}) {
    const [isAuthenticated, setIsAuthenticated] = useState(user?.email) 
    console.log("E FORM")
    console.log(isAuthenticated)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [form, setForm] = useState({
      user_email: user?.email,
      title: "",
      duration: 0,
      intensity: 0
    })

    const handleOnInputChange = (event) => {
      setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
    }
  
    const handleOnSubmit = async (e) => {
      e.preventDefault()
      setIsLoading(true)
      setExercise(exercise.push(form))
  
      try {
        const res = await axios.post(`http://localhost:3005/exercise/`, form)
        if (res?.data?.exercise) {
          addExercise(res.data.exercise)
          setForm({ user_email: user?.email,
            title: "",
            duration: 0,
            intensity: 0 })
        } else {
          setError("Something went wrong with post creation.")
        }
      } catch (err) {
        console.log(err)
        const message = err?.response?.data?.error?.message
        setError(message ?? String(err))
      } finally {
        setIsLoading(false)
      }
      navigate("/exercise")
    }
   
  //   const handleOnSubmitt = async () => {

  //       setIsLoading(true)
  //       setErrors((e) => ({ ...e, form: null }))
    
  //       // if (form.passwordConfirm !== form.password) {
  //       //   setErrors((e) => ({ ...e, passwordConfirm: "Passwords do not match." }))
  //       //   setIsLoading(false)
  //       //   return
  //       // } else {
  //       //   setErrors((e) => ({ ...e, passwordConfirm: null }))
  //       // }
    
  //       //try {
  //         const res = await axios.post("http://localhost:3005/exercise/", {
            
  //           user: user,
  //           user_email: user?.email,
  //           title: form.title,
  //           duration: form.duration,
  //           intensity: form.intensity,
  //           date: form.date,
        
  //   })
  //         console.log("REQUEST")
  //         console.log(user)
  //         //if (res?.data.user) {
  //           //setAppState(res.data)
  //           setIsLoading(false)
  //          // navigate("/activity")

  // }
  //     //     } else {
  //     //       console.log("!!!!  NOT SUCCESFUL")
  //     //       setErrors((e) => ({ ...e, form: "Something went wrong with exercise creation" }))
  //     //       setIsLoading(false)
  //     //     }
  //     //   } catch (err) {
  //     //     console.log(err)
  //     //     console.log("!!!! + ERROR")
  //     //     const message = err?.response?.data?.error?.message
  //     //     setErrors((e) => ({ ...e, form: message ? String(message) : String(err) }))
  //     //     setIsLoading(false)
  //     //   }
  //     // }
    

    return (
        <div className="Excercise">
            
                {/* // isAuthenticated ? */}
                    <>
                        <div className="banner">
                            <h1> Excercise </h1>
                        </div>
                        <h1>Enter an Excercise</h1>
                        <div>
                            <form className="ExcerciseForm">
                                <label for="Name">Excercise Name</label><br />
                                <input type="text" placeholder="Add the name of your workout!" id="name" name="title" value={form.title} onChange={handleOnInputChange} /><br /><br />
                                <label for="cars">Choose a category:</label>
                                <label for="Duration">Duration(min)</label><br />
                                <input type="text" placeholder="How long was your workout?" id="workout" name="duration" value={form.duration} onChange={handleOnInputChange} /><br /><br />
                                <label for="intensity">Intensity(1-10)</label><br />
                                <input type="text" placeholder="How intense was your workout?" id="intense" name="intensity" value={form.intensity} onChange={handleOnInputChange} /><br /><br />
                                <button onClick={handleOnSubmit}>Submit this Excercise</button>
                            </form>
                            <h1> Previously Tracked Activities </h1>
                            {/* {
                                results?.map((item) => {
                                    const worktime = new Date(item.worktime)
                                    const formattedDateTime = `${worktime.toLocaleDateString()} ${worktime.toLocaleTimeString()}`
                                    return (
                                        <div className="workoutCards" key={item.workoutid}>
                                            <p className="Date">Date Added: {formattedDateTime}</p>
                                            <p>Workout ID =#{item.workoutid}</p>
                                            <p>{item.name}</p>
                                            <p>Intensity: {item.intensity}/10</p>
                                            <p>Duration: {item.duration}min</p>
                                        </div>
                                    )
                                })
                            } */}

                        </div>
                    </>
                    {/* :
                    <h1> DELETE THIS</h1>
            } */}
        </div>
    )
}

export default ExcerciseForm

{/* <select id="workouts" name="category" value={form.category} onChange={handleOnInputChange}>
<option value="select">Select</option>
<option value="run">Run</option>
<option value="bike">Bike</option>
<option value="lift">Lift</option>
<option value="swim">Swim</option>
<option value="sports">Sports</option>
</select><br /><br /> */}
