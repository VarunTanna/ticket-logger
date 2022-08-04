import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { CREATE_PROJECT } from '../utils/mutations'
import { QUERY_GROUPS} from '../utils/queries'
import Select from "react-select";
import { useNavigate } from 'react-router-dom';
function NewProject() {
  const { loading, data } = useQuery(QUERY_GROUPS)
  const navigate = useNavigate();
  const groupList = data?.groups || [];
  console.log(groupList);
  const groupOptions = [];
  for (let i=0; i < groupList.length; i++) {
    let option = { key: groupList[i]._id, value: groupList[i].users, label: groupList[i].name };
    groupOptions.push(option);
  };
  const [projectName, setProjectName] = useState('');
  const [projectRepo, setProjectRepo] = useState('');
  const [projectGroupId, setProjectGroupId] = useState();
  const [createProject, {error}] = useMutation(CREATE_PROJECT);
  const inputChangeA = (e) => {
    const { name, value } = e.target;
    setProjectName(value);
  };
  const inputChangeB = (e) => {
    const { name, value } = e.target;
    setProjectRepo(value);
  };
  const handleChange = (e) => {
    console.log(e);
    setProjectGroupId(e.key);
  };
  const handleSubmit =  async (e) => {
    e.preventDefault();
    console.log(projectRepo);
    console.log(projectGroupId);
    const { data } =  await createProject({
      variables: { groupId: projectGroupId, name: projectName, repo: projectRepo }
    });
    navigate('/myprojects');
  }
  return (
      <>
          <h1>Create a Project</h1>
          <form className="form" style={style.form}>
              <label>Name:</label>
              <input
                  value={projectName}
                  name="name"
                  type="text"
                  placeholder="project name"
                  onChange={inputChangeA}
                  style={style.input}
              />
              <label>Repository:</label>
              <input 
                  rows={4}
                  value={projectRepo}
                  name="repo"
                  type="text"
                  placeholder="enter github repo"
                  onChange={inputChangeB}
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
              <Select options={groupOptions} onChange={handleChange}/>
              <br></br>
              <button type="button" onClick={handleSubmit} className="submit">
                  Submit
              </button>
          </form>

          {error && (
              <div className="my-3 p-3 bg-danger text-white">
                  <p className="error-text">{error.message}</p>
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