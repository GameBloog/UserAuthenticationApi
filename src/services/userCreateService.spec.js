const UserCreateService = require("./UserCreateService")
const UserRespositoryInMemory = require("../repositories/UserRespositoryInMemory")
const AppError = require("../utils/AppError")

describe("UserCreateService", () => {
  let userRespositoryInMemory = null
  let userCreateService = null

  beforeEach(() => {
    userRespositoryInMemory = new UserRespositoryInMemory()
    userCreateService = new UserCreateService(userRespositoryInMemory)
  })

  it("user should be create", async () => {
    const user = {
      name: "User Test",
      email: "user@test.com",
      password: "123",
    }

    const userCreated = await userCreateService.execute(user)
    expect(userCreated).toHaveProperty("id")
  })

  it("user not should be create with exists email", async () => {
    const user1 = {
      name: "User Test 1",
      email: "user@test.com",
      password: "123",
    }

    const user2 = {
      name: "User Test 2",
      email: "user@test.com",
      password: "456",
    }

    await userCreateService.execute(user1)
    expect(async () => {
      await userCreateService.execute(user2)
    }).rejects.toEqual(new AppError("Este email já está em uso"))
  })
})
