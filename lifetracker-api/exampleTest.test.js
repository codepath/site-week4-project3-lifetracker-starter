
const {validateEmail} =require('./validateLogin.js')
const {validatePassword} =require('./validateLogin.js')
const {add} =require('./validateLogin.js')


test('validateEmail should return true for a valid email', () => {
    const validEmail= 'codepath@example.com'
    const isValid= validateEmail(validEmail)
    expect(isValid).toBe(true)
})

test('validateEmail should return false for an invalid email', () => {
    const invalidEmail= 'example.com'
    const isValid= validateEmail(invalidEmail)
    expect(isValid).toBe(false)
})

test('validatePassword should return false for an invalid password', () => {
    const invalidPass= 'bb'
    const isValid= validatePassword(invalidPass)
    expect(isValid).toBe(false)
})

test('validatePassword should return true for a valid password', () => {
    const validPass= 'Password123!*'
    const isValid= validatePassword(validPass)
    expect(isValid).toBe(true)
})

test('calls callback with args added', () => {
    const mock= jest.fn()
    add(1,2, mock)
    expect(mock).toHaveBeenCalledWith(3)
})

//jest.mock('file path') mocks all methods in a module 