import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_GROUP } from "../utils/mutations";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_USERS } from "../utils/queries";

function NewGroup() {
  
  const {loading, data} = useQuery(QUERY_ALL_USERS);

  const userList = data?.users || [];

  const [formData, setFormData] = useState({
    name: '',
    users: [],
  });

  const [createGroup, {error}] = useMutation(CREATE_GROUP);

  const inputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { data } = createGroup({
      variables: { ...formData }
    });
  };

  return (
    <>
      <h1>Create a Group</h1>
      <form className="form" style={style.form}>
        <label>Name:</label>
        <input 
          value={formData.title}
          name="name"
          type="text"
          placeholder="Group name"
          onChange={inputChange}
          style={style.input}
        />
        <label>Users:</label>
              <select name="users" onChange={inputChange}>
                {userList.map((user) => {
                  return (
                    <option key={user._id} value={user.email}>
                      {user.email}
                    </option>
                  );
                })}
              </select>
      </form>
    </>
  );
};

const style = {
  form: {
      margin: '18px',
  },
  input: {
      display: 'block',
      margin: '5px',
      width: '100%',
  },
};

export default NewGroup;