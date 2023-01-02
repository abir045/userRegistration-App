import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { options } from "../constants/Data";
import { useUserContext } from "../hooks/useUserContext";

const UserForm = () => {
  //
  const { dispatch } = useUserContext();
  const [name, setName] = useState("");
  const [title, setTitle] = useState([]);

  const [error, setError] = useState(null);
  // empty fields state for form
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //get the inputs from inputs
    const user = { name, title };

    const response = await fetch("/api/sectors", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      // setting empty fields to json.emptyFields array from the backend

      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setName("");
      setTitle("");
      setError(null);
      setEmptyFields([]);
      console.log("new workout added", json);
      //dispatching add user action with the payload of user input:  name, title
      dispatch({ type: "CREATE_USER", payload: json });
    }
  };

  return (
    <div className="flex flex-col mt-[5%]">
      <form onSubmit={handleSubmit} className="flex flex-col mx-[5%] space-y-5">
        <h3>
          Please enter your name and pick the Sectors you are currently involved
          in.
        </h3>
        <label>Enter your name</label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          name="name"
          className={emptyFields && emptyFields.includes("name") ? "error" : ""}
        />

        <label>Pick the Sectors</label>

        <MultiSelect
          options={options}
          value={title}
          onChange={setTitle}
          labelledBy="Select"
          className={
            emptyFields && emptyFields.includes("title") ? "error" : ""
          }
        />

        <button>Save</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default UserForm;
