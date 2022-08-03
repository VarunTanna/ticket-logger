const axios = require ('axios');

// Using axios, we create a search method that is specific to our use case and export it at the bottom
const getGitRepos = (users) => {
  let repos =[];
  for(let i=0;i<users.length;i++){
  //   const currentUser = users[i];
  //   const url = `https://api.github.com/users/${currentUser}/repos`;
  //   const jsonReturn = JSON.parse(await axios.get(url));
  //   for(let j=0;j<users.length;j++){
  //     const currentRepo = jsonReturn[j];
  //     repos.push(currentRepo.full_name)
  //   }
  }
  return repos;
}

const doesGitUserExist = async (id) => {
    const url = `https://api.github.com/users/${id}`;
    return await fetchSuccess(url)
}

const doesGitRepoExist = (repo) => {
  const url = `https://api.github.com/repos/${repo}`;
  return fetchSuccess(url);
}

const fetchSuccess = async (url) => {
  let ret=""
  try {
    ret=await axios.get(url);
    //console.log('axios return',ret)
  } catch (err) {
    //console.log('fetch error',err)
  }
  return ret
}

module.exports = {
  getGitRepos,
  doesGitRepoExist,
  doesGitUserExist
}