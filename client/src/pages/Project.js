import React from "react";
import { useQuery } from '@apollo/client';

import { QUERY_PROJECTS } from '../utils/queries';

const Project = ({
  project,
  name,
  repo,
  showName = true,
  showGroup = true,
}) => {
  if (!project.length) {
    return <h3>No Project Yet</h3>
  }

  return (
    <div>
      <div className="projectTable">
          <table>
            <tr>
              <th>Name</th>
              <th>Repo</th>
              <th>Group</th>
            </tr>
            {project && project.map((project) => (
             <tr>
               <td>{project.description}</td>
               <td>{project.project}</td>
               <td>{project.order}</td>
               <td>{project.duedate}</td>
             </tr> 
            ))}
          </table>
        </div>
    </div>
  )
}

export default Project;
