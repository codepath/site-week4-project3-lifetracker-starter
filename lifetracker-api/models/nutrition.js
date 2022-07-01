

const db = require("../db")


class Nutrition {
    static async createNutrition(nutrition) {
    // create a new transfer

    if (!nutrition) {
        throw new BadRequestError(`No nutrition sent.`)
    }
    const requiredFields = ["name", "category", "calories", "image_url"]
    requiredFields.forEach((field) => {
        if (!transfer[field] && transaction[field] !== 0) {
        throw new BadRequestError(`Field: "${field}" is required in creating nutrition`)
        }
    })

    const nutritions = await Nutritions.listNutritions()
    const nutritionId = nutritions.length + 1
    const postedAt = new Date().toISOString()

    const newNutrition = { id: nutritionId, postedAt, user_id: user.id, ...nutrition }

    return newNutrition
    }
    
    static async fetchNutritionById(id){
        if (!id) {throw new BadRequestError("No nutrition id provided")}
        const query = `SELECT * FROM nutrition WHERE id = $1`
        const result = await db.query(query, [id])
        const nutrition = result.rows[0]     
        return nutrition
    }
    
    static async listNutritions() {
        const query = `SELECT * FROM nutrition WHERE user_id = $1`
        const result = await db.query(query, [user.id])
        return result
    }

}
