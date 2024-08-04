import userRepo from "../Repository/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../Interface/user";
import config from "../Config/index.config";
import cacheService from "../Cache/cacheService";

const creatToken = (_id: string) => {
  return jwt.sign({ _id: _id }, config.SECRET, { expiresIn: "1d" });
};

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
async function signUp(newUser: User) {
  if (!isValidEmail(newUser.email)) throw Error("Email not valid");

  if (newUser.age <= 0) throw Error("Age not valid");

  if (newUser.password.length < 8) throw Error("Password not strong enough!");

  if (await userRepo.getUserByEmail(newUser.email)) {
    throw Error("Email already signed up");
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newUser.password, salt);
    const response = await userRepo.save({ ...newUser, password: hash });
    const token = creatToken(response.id);
    await cacheService.setHash(response.id, response);
    return {
      message: "User created successfully",
      token: token,
      user: response,
    };
  } catch (error: unknown) {
    if (error instanceof Error)
      throw new Error(`Error signing up: ${error.message}`);
    //for non error objects
    throw new Error(`unexpected Error Signing up u ${String(error)}`);
  }
}
async function getUsers() {
  try {
    const cached = await cacheService.getAllUsers();
    if (cached) return { users: cached };

    const users = await userRepo.getUsers();
    if (!users) throw new Error("No users found!");
    await cacheService.setAllUsers(users);
    return { users };
  } catch (error: unknown) {
    if (error instanceof Error)
      throw new Error(`Error fetching Users: ${error.message}`);
    //for non error objects
    throw new Error(`unexpected Error fetching users ${String(error)}`);
  }
}
async function getUserByEmail(email: string) {
  if (!isValidEmail(email)) throw Error("Email not valid!");
  try {
    const response = await userRepo.getUserByEmail(email);
    if (!response) throw Error("User not found!");
    return { user: response };
  } catch (error: unknown) {
    if (error instanceof Error)
      throw new Error(`Error fetching User: ${error.message}`);
    //for non error objects
    throw new Error(`unexpected Error fetching users ${String(error)}`);
  }
}
async function getUserByPhone(phone: string) {
  try {
    const response = await userRepo.getUserByPhone(phone);
    if (response) return { user: response };
    else {
      throw Error("User not found!");
    }
  } catch (error: unknown) {
    if (error instanceof Error)
      throw new Error(`Error fetching User by email: ${error.message}`);
    //for non error objects
    throw new Error(`unexpected Error fetching user by email${String(error)}`);
  }
}
async function deleteUserByEmail(email: string) {
  try {
    const response = await userRepo.deleteUserByEmail(email);
    await cacheService.del([
      `user:${email}`,
      `user:${response.id}`,
      "AllUsers",
    ]);
    return { response };
  } catch (error: unknown) {
    if (error instanceof Error)
      throw new Error(`Error deleting User: ${error.message}`);
    //for non error objects
    throw new Error(`unexpected Error deleting user ${String(error)}`);
  }
}
async function updateAgeByEmail(email: string, age: number) {
  try {
    const isEmailThere = await userRepo.getUserByEmail(email);
    if (!isEmailThere) {
      throw new Error("Email not signed up");
    }
    const response = await userRepo.updateAgeByEmail(email, age);
    if (response) {
      await cacheService.del([`user:${email}`, "AllUsers"]);

      return { user: response };
    } else throw Error("Erro while updating Age");
  } catch (error: unknown) {
    if (error instanceof Error)
      throw new Error(`Error updating User: ${error.message}`);
    throw new Error(`unexpected Error updating user ${String(error)}`);
  }
}

async function signIn(email: string, password: string) {
  try {
    if (!email || !password) throw Error("All fields must be filled!");
    if (!isValidEmail(email)) throw Error("Invalid Email");
    const user = await userRepo.getUserByEmail(email);
    if (!user) throw Error("Email not signed up");
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw Error("Incorrect passsword");
    const token = creatToken(user.id);
    return { token: token };
  } catch (error: unknown) {
    if (error instanceof Error)
      throw new Error(`Error signing in User: ${error.message}`);
    throw new Error(`unexpected Error signing in users ${String(error)}`);
  }
}

async function getUserById(id: string) {
  try {
    const cached = await cacheService.getHash(id);
    if (cached) return { user: cached };

    const response = await userRepo.getUserById(id);
    if (!response) throw Error("User not found");

    await cacheService.setHash(id, response);
    return { user: response };
  } catch (error: unknown) {
    if (error instanceof Error) throw Error(error.message);
    throw new Error(`Unexpected Error getting user ${String(error)}`);
  }
}
async function deleteAllUsers() {
  try {
    const { users } = await getUsers();
    if (users) {
      // Extract user IDs and emails

      const userIds = users.map((user) => user.id);
      const userEmails = users.map((user) => user.email);

      // Create cache keys for IDs and emails
      const keysToDelete = userIds.map((id) => `user:${id}`);
      const emailsToDelete = userEmails.map((email) => `user:${email}`);

      // Delete cache entries for both IDs and emails
      await cacheService.del([...keysToDelete, ...emailsToDelete]);
    }

    const response = await userRepo.deleteAllUsers();
    if (response.count > 0) {
      await cacheService.del(["AllUsers"]);
      return response;
    } else {
      throw new Error("Error deleting users!");
    }
  } catch (error: unknown) {
    if (error instanceof Error)
      throw new Error(`Error deleting Users: ${error.message}`);
    //for non error objects
    throw new Error(`unexpected Error deleting users ${String(error)}`);
  }
}

export default {
  signUp,
  getUsers,
  getUserByEmail,
  getUserByPhone,
  deleteUserByEmail,
  updateAgeByEmail,
  signIn,
  getUserById,
  deleteAllUsers,
};
