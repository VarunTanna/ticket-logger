import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { QUERY_PROJECTS } from '../utils/queries';
import { DELETE_PROJECT } from "../utils/mutations";
import { useNavigate } from 'react-router-dom';


const MyProjects = () => {
  const { loading, data, refetch } = useQuery(QUERY_PROJECTS);
  const [deleteProject, {error}] = useMutation(DELETE_PROJECT);
  const navigate = useNavigate();
  const projects = data?.projects || [];
  // console.log(projects);

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
  const handleDelete =  async (e) => {
    e.preventDefault();
    console.log("handle delete",e, e.key);
    const { data } =  await deleteProject({
      variables: { projectId: e.target.id }
    });
    navigate('/myprojects');
  }

  return (
    <>
      <Link className="btn btn-med btn-primary m-2" to="/newProject">
        Add a Project
      </Link>
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
            
            <tr>
              <td className='btn m-1'>{project.name}</td>
              <td><a href={'https://github.com/' + project.repo} target='_blank'>{project.repo}</a></td>
              <td>{project.group.name}</td>
              <td className='text-center'>
                <img id={project._id} onClick={handleDelete} src='delete.png' alt={'Delete project ' + project.name}></img>
              </td>            
              </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default MyProjects;
