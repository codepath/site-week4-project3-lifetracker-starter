INSERT INTO posts (exercise_name, category, duration, intensity, user_id)
             VALUES ($1, $2, $3, $4, (SELECT id FROM usersLT WHERE email = $5)
             RETURNING exercise_name, category, duration, intensity, user_id`

`SELECT * FROM newexcercise AS e
        JOIN userlt AS u ON u.email = e.user_email
        ORDER BY e.date DESC`