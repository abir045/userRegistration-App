import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { useNavigate, useParams } from "react-router-dom";
import { options } from "../constants/Data";
import { useUserContext } from "../hooks/useUserContext";

const Edituser = () => {
  const [seletedUser, setSelectedUser] = useState({
    name: "",
    title: [],
  });
  // const [name, setName] = useState("");
  const [title, setTitle] = useState([]);

  const { users, dispatch } = useUserContext();

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const userId = id;
    const seletedUser = users.find((user) => String(user._id) === userId);

    console.log(seletedUser);

    if (seletedUser) {
      setSelectedUser(seletedUser);
    }
    return;
  }, [id, users]);

  const handleOnName = (e) => {
    const { name, value } = e.target;
    setSelectedUser((seletedUser) => ({
      ...seletedUser,
      [name]: value,
    }));
  };

  const handleOnTitle = (e) => {
    setTitle(e);
    setSelectedUser((selectedUser) => ({
      ...selectedUser,
      title: [...title],
    }));
  };

  const updateUser = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/sectors/" + seletedUser._id, {
      method: "PATCH",
      body: JSON.stringify(seletedUser),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    console.log(json);

    if (response.ok) {
      // setName("");
      // setTitle("");
      // setError(null);
      // console.log("new workout added", json);
      //dispatching update user action with the payload of user input name, title

      dispatch({ type: "UPDATE_USER", payload: json });
      navigate("/");
    }
  };

  return (
    <form className="flex flex-col space-y-5" onSubmit={updateUser}>
      <h3>
        Please enter your name and pick the Sectors you are currently involved
        in.
      </h3>
      <label>Enter your name</label>
      <input
        type="text"
        onChange={handleOnName}
        value={seletedUser?.name}
        name="name"
      />

      <label>Pick the Sectors</label>

      <MultiSelect
        options={options}
        value={seletedUser?.title}
        onChange={handleOnTitle}
        // onChange={setTitle}
        labelledBy="Select"
        name="title"
      />

      <button type="submit">Save</button>
    </form>
  );
};

export default Edituser;
