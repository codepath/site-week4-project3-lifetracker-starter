const db = require("../db")
const bcrypt = require("bcrypt")
const {validateFields} = require("../utils/validate")


class Nutrition {

    //creates nutrition table object with values from db-this object will be sent back up to frontend
        static createNutritionTable(nutrition){
            return{
                id: nutrition.id, 
                name : nutrition.name,
                category : nutrition.cateogry, 
                calories : nutrition.calories, 
                quantity : nutrition.quantity,
                image_url : nutrition.image_url, 
                username_id : nutrition.username_id
                // location : user.location, 
                // date : user.date
            }
        }

        //need to add data to database
        static async create(data){
           // const {nutritionName,quantity,calories,category} = data

            const result = await db.query(`
            INSERT INTO nutrition(
                name,
                category,
                calories,
                quantity,
                image_url)
                VALUES($1,$2,$3,$4,$5)
                RETURNING name, category, calories, quantity, image_url
            `,[data.nutritionName, data.category, data.calories, data.quantity,data.image_url])

            const nutrition = result.rows[0]
            return nutrition
        }
     //save nutrition data into the database


}

module.exports= Nutrition