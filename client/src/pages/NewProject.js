import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { CREATE_PROJECT } from '../utils/mutations'
import { QUERY_GROUPS} from '../utils/queries'
import Select from "react-select";

function NewProject() {

  const { loading, data } = useQuery(QUERY_GROUPS)

  const groupList = data?.groups || [];

  console.log(groupList);

  const groupOptions = [];

  for (let i=0; i < groupList.length; i++) {
    let option = { key: groupList[i]._id, value: groupList[i].name, label: groupList[i].users };
    groupOptions.push(option);
  };

  const [formData, setFormData] = useState({
    name: '',
    repo: '',
    group: ''
  });

  const [createProject, {error}] = useMutation(CREATE_PROJECT);

  const inputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      
    const { data } = createProject({
      variables: { ...formData }
    });
  }

  return (
      <>
          <h1>Create a Project</h1>
          <form className="form" style={style.form}>
              <label>Name:</label>
              <input 
                  value={formData.name}
                  name="name"
                  type="text"
                  placeholder="project name"
                  onChange={inputChange}
                  style={style.input}
              />
              <label>Repository:</label>
              <textarea 
                  rows={4}
                  value={formData.repo}
                  name="repo"
                  type="textarea"
                  placeholder="enter github repo"
                  onChange={inputChange}
                  style={style.input}
              />
              <label>Group:</label>
              {/* <select name="group" onChange={inputChange}>
                {groupList.map((group) => {
                  return (
                    <option key={group._id} value={group.name}>
                      {group.name}
                    </option>
                  );
                })}
              </select> */}
              <Select options={groupOptions} isMulti/>
              <br></br>
              <button type="button" onClick={handleSubmit} className="submit">
                  Submit
              </button>
          </form>
          {error && (
              <div>
                  <p className="error-text">{error}</p>
              </div>
          )}
      </>
  )
}

const style = {
  form: {
      margin: '18px',
  },
  input: {
      display: 'block',
      margin: '5px',
      width: '100%',
  },
}

export default NewProject;