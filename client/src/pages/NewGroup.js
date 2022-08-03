import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_GROUP } from "../utils/mutations";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_USERS } from "../utils/queries";
import Select from "react-select";

function NewGroup() {

  const { loading, data } = useQuery(QUERY_ALL_USERS);

  const userList = data?.users || [];
  console.log(userList);

  const userOptions = [];

  for (let i=0; i < userList.length; i++) {
    let option = { key: userList[i]._id, value: userList[i].email, label: userList[i].email };
    userOptions.push(option);
  };

  console.log(userOptions);

  const [groupName, setGroupName] = useState('');
  const [groupUsers, setGroupUsers] = useState('');

  // const [formData, setFormData] = useState({
  //   name: '',
  //   users: '',
  // });

  const [createGroup, { error }] = useMutation(CREATE_GROUP);

  const inputChange = (e) => {
    const { name, value } = e.target;
    // setFormData({ ...formData, [name]: value });
    setGroupName(value);
    setGroupUsers(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    console.log(groupUsers);
    const { data } = createGroup({
      variables: { name: groupName, users: [groupUsers] }
    });
  };

  return (
    <>
      <h1>Create a Group</h1>
      <form className="form" style={style.form}>
        <label>Name:</label>
        <input
          value={groupName}
          name="name"
          type="text"
          placeholder="Group name"
          onChange={inputChange}
          style={style.input}
        />
        <label>Users:</label>
        {/* <select name="users" onChange={inputChange} multiple={true}>
          {userList.map((user) => {
            return (
              <option key={user._id} value={user.email}>
                {user.email}
              </option>
            );
          })}
        </select> */}
        <Select options={userOptions} isMulti/>
        <button type="button" onClick={handleSubmit} className="submit">
          Submit
        </button>
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