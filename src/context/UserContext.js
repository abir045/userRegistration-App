import { createContext, useReducer } from "react";

export const UserContext = createContext();

export const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USERS":
      return {
        users: action.payload,
      };
    case "CREATE_USER":
      return {
        users: [...state.users, action.payload],
      };
    case "UPDATE_USER":
      const updatedUser = action.payload;
      return {
        ...state.users.map((user) =>
          user._id === updatedUser.id ? updatedUser : user
        ),
      };

    case "DELETE_USER":
      return {
        //checking the deleted users id against user id's and filtering out that user

        users: state.users.filter((u) => u._id !== action.payload._id),
      };

    default:
      return state;
  }
};

//global user state provider

export const UserContextProvider = ({ children }) => {
  // access to state and dispatch for calling a reducer action
  // useReducer takes in the reducer and initial state
  const [state, dispatch] = useReducer(userReducer, {
    users: null,
  });

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
