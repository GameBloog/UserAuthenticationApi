const UserCreateService = require("./UserCreateService")
const UserRespositoryInMemory = require("../repositories/UserRespositoryInMemory")

it("user should be create", async () => {
  const user = {
    name: "User Test",
    email: "user@test.com",
    password: "123",
  }

  const userRespositoryInMemory = new UserRespositoryInMemory()
  const userCreateService = new UserCreateService(userRespositoryInMemory)
  const userCreated = await userCreateService.execute(user)

  expect(userCreated).toHaveProperty("id")
})
