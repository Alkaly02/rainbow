import { User } from "../types"

export const storage = {
  saveUser: (user: User) => {
    localStorage.setItem("user", JSON.stringify(user))
  },
  getUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },
  removeUser: () => {
    localStorage.removeItem("user")
  },
  clear: () => {
    localStorage.clear()
  }
}
