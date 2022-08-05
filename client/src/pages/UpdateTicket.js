import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { QUERY_PROJECTS } from '../utils/queries';
import { QUERY_SINGLE_TICKET } from '../utils/queries';
import { UPDATE_TICKET } from '../utils/mutations';
import Select from "react-select";
import { useNavigate } from 'react-router-dom';

function UpdateTicket() {

  const { loading, data } = useQuery(QUERY_PROJECTS);

  const [ updateTicket, {error} ] = useMutation(UPDATE_TICKET);

  const projectList = data?.projects || [];

  const param = window.location.pathname;
  console.log(param);

  const params = param.split('/');
  const ticketId = params[2];
  console.log(ticketId);

  const { ticketloading, ticketData } = useQuery(QUERY_SINGLE_TICKET, {
    variables: { ticketId: ticketId }
  });

  console.log(ticketData);
  const ticket = ticketData?.ticket;

  console.log(ticket);


  const navigate = useNavigate();

  const projectOptions = [];
  const userOptions = [];


  for (let i=0; i < projectList.length; i++) {
    let option = { key: projectList[i]._id, value: projectList[i].name, label: projectList[i].name };
    projectOptions.push(option);
  };

  const typeOptions = [
    {value: "Bug 🦟", label: "Bug 🦟"},
    {value: "Feature ✨", label: "Feature ✨"},
    {value: "Styling ✨", label: "Styling ✨"},
    {value: "Other", label: "Other"},
  ];

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    order: 0,
    duedate: '1/1/1980',
  });

  const [project, setProject] = useState('')
  const [type, setType] = useState('')

  // const [createTicket, {error}] = useMutation(CREATE_TICKET);

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
      
    const { data } = updateTicket({
      variables: { ...formData, type: String(type), projectId: project, userID: null }
    });
    navigate('/');
    
  }

  return (
      <>
          <h1>Update My Ticket</h1>
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

export default UpdateTicket;