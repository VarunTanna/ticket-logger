import React, { useEffect } from "react";
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { QUERY_PROJECTS } from '../utils/queries';

const Project = () => {
<<<<<<< HEAD
  const {loading, data} = useQuery(QUERY_PROJECTS);
=======
  const { loading, data, refetch } = useQuery(QUERY_PROJECTS);
>>>>>>> c373da92f723b4da0950edc39234be1e8e1d78a6
  const projects = data?.projects || [];
  console.log(projects);

  useEffect(function () {
    refetch();
  })

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
    <>
      <Link className="btn btn-sm btn-primary m-2" to="/newProject">
        Add a Project
      </Link>
<<<<<<< HEAD
    </>
  );
}
  return (
    <>
    <Link className="btn btn-sm btn-primary m-2" to="/newProject">
           Add a Project
           </Link>
          <table>
=======
      <table className='styled-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Repo</th>
            <th>Group</th>
            <th>Delete Project</th>
          </tr>
        </thead>
        <tbody>
          {projects && projects.map((project) => (
>>>>>>> c373da92f723b4da0950edc39234be1e8e1d78a6
            <tr>
              <td className='btn m-1'>{project.name}</td>
              <td>{project.repo}</td>
              <td>{project.group}</td>
              <td className='text-center'><a href={'nowhere/' + project._id}><img src='delete.png' alt={'Delete group ' + project.name}></img></a></td>
            </tr>
<<<<<<< HEAD
            {projects && projects.map((project) => (
             <tr>
               <td>{project.name}</td>
               <td>{project.repo}</td>
               <td>{project.group}</td>
             </tr> 
            ))}
          </table>
           </>
=======
          ))}
        </tbody>
      </table>
    </>
>>>>>>> c373da92f723b4da0950edc39234be1e8e1d78a6
  )
}

export default Project;
