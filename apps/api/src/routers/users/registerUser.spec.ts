describe('registerUser', () => {
  it('should return 201 with correct body', async () => {
    const { status, body } = await httpClient.request('/users', {
      method: 'POST',
      body: { username: 'user1', password: 'pass1' },
    });
    expect(status).toBe(201);
    expect(body).toMatchObject({
      user: { id: expect.any(Number), username: 'user1' },
      registration_valid_until: expect.any(String),
    });
  });
});
