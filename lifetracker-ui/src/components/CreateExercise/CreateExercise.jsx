import { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function CreateExercise({userId}) {
  const [exerciseData, setExerciseData] = useState({
    exerciseName: "",
    exerciseCategory: "",
    exerciseDuration: "",
    exerciseIntensity: "",
  });

  const navigate = useNavigate()

//when handlesubmit is clicked this async function is run and it 
  const exerciseSubmitForm = async (
    exerciseName,
    exerciseCategory,
    exerciseDuration,
    exerciseIntensity,
    
  ) => {
    try {
      let response = await axios.post("https://lifetracker-api-txny.onrender.com/exerciseRoutes/newExercise", {
        exerciseName,
        exerciseCategory,
        exerciseDuration,
        exerciseIntensity,
        userId

      }
      );
    } catch (error) {
      console.log(error);
    }
  };
   
//when submit is cliked run the exercisesubmit function with the inputs given
  const handleSubmit = (event) => {

    event.preventDefault();
    exerciseSubmitForm(
      exerciseData.exerciseName,
      exerciseData.exerciseCategory,
      exerciseData.exerciseDuration,
      exerciseData.exerciseIntensity,
    );
      navigate("/exercise")
  };
  console.log("Exercise data object: ", exerciseData)

  return (
    <div className="newForm">
      <h1> EXERCISE</h1>
      <form>
        <div className="exerciseName">
          <label>Exercise</label>
          <input
            id="exercisename"
            type="text"
            value={exerciseData.exerciseName}
            onChange={(event) =>
              setExerciseData({
                ...exerciseData,
                exerciseName: event.target.value,
              })
            }
            placeholder="Name"
            required
          />
        </div>

        <div className="categoryExercise">
          <label>Category</label>
          <select
            id="exercisecategory"
            value={exerciseData.exerciseCategory}
            onChange={(event) =>
              setExerciseData({
                ...exerciseData,
                exerciseCategory: event.target.value,
              })
            }
            required
          >
            <option value="">Select a category</option>
            <option value="run">Run</option>
            <option value="bike">Bike</option>
            <option value="lift">Lift</option>
            <option value="swim">Swim</option>
            <option value="sports">Sports</option>
          </select>
        </div>

        <div className="durationInput">
          <label htmlFor="duration">Duration:</label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={exerciseData.exerciseDuration}
            onChange={(event) =>
              setExerciseData({
                ...exerciseData,
                exerciseDuration: event.target.value,
              })
            }
            required
          />
        </div>
        <div className="intensityInput">
          <label htmlFor="intensity">Intensity:</label>
          <input
            type="number"
            id="intensity"
            name="intensity"
            value={exerciseData.exerciseIntensity}
            onChange={(event) =>
              setExerciseData({
                ...exerciseData,
                exerciseIntensity: event.target.value,
              })
            }
            required
          />
        </div>

        <button className="submitbutton" onClick={handleSubmit} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
