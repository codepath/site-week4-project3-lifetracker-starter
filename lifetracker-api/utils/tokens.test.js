// LOOK INTO THIS MORE BC I THINK IT'S WRONG/DON'T UNDERSTAND
const { generateJWT, validateAndDecodeJWT } = require('./tokens');

describe('Token Utility Functions', () => {
  const payload = { userId: 1234 };
  const secretKey = 'mySecretKey';

  it('should generate a valid JWT for user payloads', () => {
    const token = generateJWT(payload, secretKey);
    expect(token).toBeDefined();
    // You can add additional assertions to validate the token structure, expiration, etc.
  });

  it('should extract a payload from a valid JWT with the correct secret', () => {
    const token = generateJWT(payload, secretKey);
    const decoded = validateAndDecodeJWT(token, secretKey);
    expect(decoded).toEqual(payload);
  });

  it('should not extract a payload from an invalid JWT', () => {
    const invalidToken = 'invalidToken';
    expect(() => {
      validateAndDecodeJWT(invalidToken, secretKey);
    }).toThrow('Invalid JWT');
  });
});
