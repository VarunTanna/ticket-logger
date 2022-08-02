import React from "react";
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { QUERY_PROJECTS } from '../utils/queries';

const Project = () => {
  const projects = useQuery(QUERY_PROJECTS);
  console.log(projects);

if (!projects.length) {
  return (
    <>
      <h3>No Projects Yet</h3>
      <Link className="btn btn-lg btn-primary m-2" to="/newProject">
      Add a Project
      </Link>
    </>
  );
}
  return (
          <table>
            <tr>
              <th>Name</th>
              <th>Repo</th>
              <th>Group</th>
            </tr>
            {projects && projects.map((project) => (
             <tr>
               <td>{project.name}</td>
               <td>{project.repo}</td>
               <td>{project.group}</td>
             </tr> 
            ))}
          </table>
  )
  }

export default Project;
