describe("Test Config", () => {
    test("Config derived from process.env", () => {
        process.env.SECRET_KEY="keykey"
        process.env.PORT = 4000
        process.env.DATABASE_URL = "db_url"
        process.env.NODE_ENV = "envy"

        const config = require("./config")
        
        expect(config.SECRET_KEY).toEqual("keykey")
        expect(config.PORT).toEqual(4000)
        expect(config.getDatabaseUri()).toEqual("db_url")
        
        delete process.env.SECRET_KEY
        delete process.env.PORT
        delete process.env.DATABASE_URL

        expect(config.getDatabaseUri()).toEqual("postgresql://postgres://postgres:postgres@localhost:5432/rate_my_setup_advanced")
    })

    test("Database URI changes for test environment", () => {
        const config = require("./config")
        expect(config.getDatabaseUri()).toEqual("postgresql://postgres://postgres:postgres@localhost:5432/rate_my_setup_advanced")
        
        process.env.NODE_ENV = "test"

        expect(config.getDatabaseUri()).toEqual("postgresql://postgres://postgres:postgres@localhost:5432/rate_my_setup_advanced _test")
    })
})