import "./ExerciseCard.css"

export default function ExercisePage({ user, exercises, index}) {

    return(


        <div className='added-excercises'>
        {exercises.map((exercise, index) => (
          <div className='an-excercise' key={index}>
            <h3 className='added-time'>Today at {exercise.date}</h3>
            <h1 className='added-title'>{exercise.title}</h1>
            <div className='sub-exercise-info'>
              <div className='left-exercise'>
                <h3 className='duration'>
                  Duration <br />
                  <br />
                  {exercise.duration}
                </h3>
              </div>
              <div className='right-exercise'>
                <h3 className='duration'>
                  Intensity <br />
                  <br />
                  {exercise.intensity}
                </h3>
              </div>
            </div>
          </div>
        ))}
        </div>
    //     <h1> Previously Tracked Activities </h1>
         
    //         results?.map((item) => {
    //             const worktime = new Date(item.worktime)
    //             const formattedDateTime = `${worktime.toLocaleDateString()} ${worktime.toLocaleTimeString()}`
    //             return (
    //                 <div className="workoutCards" key={item.workoutid}>
    //                     <p className="Date">Date Added: {formattedDateTime}</p>
    //                     <p>Workout ID =#{item.workoutid}</p>
    //                     <p>{item.name}</p>
    //                     <p>Intensity: {item.intensity}/10</p>
    //                     <p>Duration: {item.duration}min</p>
    //                 </div>
    //             )
    //         })
        
    )

}