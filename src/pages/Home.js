import React, { useEffect } from "react";
import UserDetails from "../components/UserDetails";
import UserForm from "../components/UserForm";
import { useUserContext } from "../hooks/useUserContext";

export const Home = () => {
  const { users, dispatch } = useUserContext();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/sectors");
      const json = await response.json();

      if (response.ok) {
        // setUsers(json);
        dispatch({ type: "SET_USERS", payload: json });
      }
    };

    fetchUsers();
  }, [dispatch]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 bg-gray-100 ">
      <UserForm />

      <div className="flex flex-col ml-[5%] mt-[5%] ">
        <h1 className="text-2xl font-bold">List of users</h1>
        {/* mapping users array and passing user prop to child component */}

        {users &&
          users.map((user) => <UserDetails key={user._id} user={user} />)}
      </div>
    </div>
  );
};
