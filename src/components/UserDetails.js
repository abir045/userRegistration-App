import React from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";

import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const UserDetails = ({ user }) => {
  //invoking dispatch from  the global state

  const { dispatch } = useUserContext();

  const handleDelete = async () => {
    const response = await fetch("/api/sectors/" + user._id, {
      method: "DELETE",
    });
    const json = await response.json();

    // dispatching delete_user action to reducer to get the payload of user id from async handleclick function

    if (response.ok) {
      dispatch({ type: "DELETE_USER", payload: json });
    }
  };

  return (
    <div className="flex flex-col space-y-5 bg-white my-5 p-4 rounded-lg">
      <h4 className="text-xl text-teal-500 font-bold">{user.name}</h4>
      <div className="flex">
        <span className="flex space-x-3 font-bold mr-3">Sector:</span>

        {/* mapping through title array */}
        {user.title.map((item) => (
          <div className="flex">
            <p key={item}>{item.label}&nbsp; </p>
          </div>
        ))}
      </div>
      <p>
        {formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })}
      </p>
      <div className="flex items-center justify-between">
        <Link to={`/edit/${user._id}`}>
          <button>
            <FiEdit size={20} />
          </button>
        </Link>
        <button onClick={handleDelete}>
          <RiDeleteBin6Line size={20} />
        </button>
      </div>
    </div>
  );
};

export default UserDetails;
