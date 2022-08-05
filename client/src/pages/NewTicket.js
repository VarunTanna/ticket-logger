import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { CREATE_TICKET } from '../utils/mutations'
import { QUERY_PROJECTS } from '../utils/queries'
import Select from "react-select";
import { useNavigate } from 'react-router-dom';

function NewTicket() {

  const { loading, data } = useQuery(QUERY_PROJECTS);

  const projectList = data?.projects || [];

  const navigate = useNavigate();

  const projectOptions = [];
  const userOptions = [];


  for (let i=0; i < projectList.length; i++) {
    let option = { key: projectList[i]._id, value: projectList[i].name, label: projectList[i].name };
    projectOptions.push(option);
  };

  const typeOptions = [
    {value: "Bug", label: "Bug"},
    {value: "Feature", label: "Feature"},
    {value: "Styling", label: "Styling"},
    {value: "Other", label: "Other"},
  ];

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    order: ``,
    duedate: '',
  });

  const [project, setProject] = useState('')
  const [type, setType] = useState('')

  const [createTicket, {error}] = useMutation(CREATE_TICKET);

  const inputChange = (e) => {
    const { name, value } = e.target;
    if(name == 'order') {
      setFormData({ ...formData, [name]: parseInt(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleChangeA = (e) => {
    //console.log(e.value);
    setProject(e.key);    
  };

  const handleChangeB = (e) => {
    //console.log(e.value);
    setType(e.value);    
  };


  const handleSubmit = (e) => {
    console.log(formData)
    console.log(project);
    e.preventDefault();
      
    const { data } = createTicket({
      variables: { ...formData, type: String(type), projectId: project, userID: null }
    });
    navigate('/home');
    
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
                  rows={3}
                  value={formData.description}
                  name="description"
                  type="textarea"
                  placeholder="Type your description here"
                  onChange={inputChange}
                  style={style.input}
              />
              <label>Type:</label>
              {/* <input 
                  value={formData.type}
                  name="type"
                  type="text"
                  placeholder="ticket type"
                  onChange={inputChange}
                  style={style.input}
              /> */}
              <Select  
                id="type"
                name="type"
                options={typeOptions}
                onChange={handleChangeB}
              />
              <label>Project:</label>
              <Select 
                id="project"
                name="project"
                // onChange={selectChange}
                options={projectOptions} onChange={handleChangeA}/>
              <label>User Assignment:</label>
              
              <br></br>
              <label>Sprint #:</label>
              <input 
                  value={formData.order}
                  name="order"
                  type="number"
                  placeholder="target sprint number"
                  onChange={inputChange}
                  style={style.input}
              />
              <label>Due Date:</label>
              <input 
                  value={formData.duedate}
                  name="duedate"
                  type="date"
                  placeholder="MM/DD/YYYY"
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