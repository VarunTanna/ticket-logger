import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { CREATE_TICKET } from '../utils/mutations'
import { QUERY_PROJECTS } from '../utils/queries'
import Select from "react-select";

function NewTicket() {

  const { loading, data } = useQuery(QUERY_PROJECTS);

  const projectList = data?.projects || [];

  console.log(projectList);

  const projectOptions = [];

  for (let i=0; i < projectList.length; i++) {
    let option = { key: projectList[i]._id, value: projectList[i].email, label: projectList[i].email };
    projectOptions.push(option);
  };

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    project: '',
    order: ``,
    duedate: '',
  });

  const [createTicket, {error}] = useMutation(CREATE_TICKET);

  const inputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      
    const { data } = createTicket({
      variables: { ...formData }
    });
  }

  return (
      <>
          <h1>Create a Ticket</h1>
          <form className="form" style={style.form}>
              <label>Title:</label>
              <input 
                  value={formData.title}
                  name="title"
                  type="text"
                  placeholder="ticket title"
                  onChange={inputChange}
                  style={style.input}
              />
              <label>Description:</label>
              <textarea 
                  rows={4}
                  value={formData.description}
                  name="description"
                  type="textarea"
                  placeholder="Type your description here"
                  onChange={inputChange}
                  style={style.input}
              />
              <label>Type:</label>
              <input 
                  value={formData.type}
                  name="type"
                  type="text"
                  placeholder="ticket type"
                  onChange={inputChange}
                  style={style.input}
              />
              <label>Project:</label>
              {/* <select name="project" onChange={inputChange}>
                {projectList.map((project) => {
                  return (
                    <option key={project._id} value={project.name}>
                      {project.name}
                    </option>
                  );
                })}
              </select> */}
              <Select options={projectOptions} isMulti/>
              <br></br>
              {/* <input 
                  value={project}
                  name="project"
                  type="text"
                  placeholder="project name"
                  onChange={inputChange}
                  style={style.input}
              /> */}
              <label>Order:</label>
              <input 
                  value={formData.order}
                  name="order"
                  type="integer"
                  placeholder="order number"
                  onChange={inputChange}
                  style={style.input}
              />
              <label>Due Date:</label>
              <input 
                  value={formData.duedate}
                  name="duedate"
                  type="text"
                  placeholder="ticket due date"
                  onChange={inputChange}
                  style={style.input}
              />
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

export default NewTicket;