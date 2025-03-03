# minfi
Welcome to minfi, this repository exists to demonstrate a CI/CD workflow that
can be used to aid the development of a React UI front-end application, a Flask
/ gunicorn back-end application, and facilitate the HTTP request / response
mechanism between the UI and server. Most importantly, this project exists
to demonstrate and highlight the CI/CD workflow that dev teams can use that
begins with this code repository and ends with an automated deployment of any
code changes to a running AWS EKS cluster, all without the developers need for
any interaction aside from pushing a code change.

This workflow works as follows:
1. placeholder
2. placeholder
3. placeholder

## Repository Structure
- `main` branch: the tested and deployed version
- `dev` branch: branched from `main`, this is where frequent code changes and
improvements are made, this branch may be in a broken state. Branches off of
`dev` should adopot the following labels:
  - `feat\<name>`: a new feature to add to `dev`
  - `bug\<name>`: a bug fix to `dev`
  - `debt\<name>`: addresses technical debt
  - `misc\<name>`: anything that doesn't fit into the other labels

## Required Resources
- This `GitHub` repository
- Recommended editor: Microsoft VS Code
- Python version 3.13+
- Node version 22+
- Docker version 26+
- Amazon Web Services account for EKS deployment

## Developer Guide and Workflow
This section contains instructions on how developers can...

### Making code changes


#### Creating a new branch off dev


- git clone
- create a new branch for bug / feat / debt / misc
- Always pull before committing and pushing because...$ git pull
- $ git add .
- $ git commmit -m ""
- $ git push

#### Setting up pull requests


## TODO
- Intent is for this project to be an all-in-one and simple DevOps platform / portfolio
- Set up CI / CD Pipelines
- Create free tier AWS account to deploy to
- Documentation of workflows and best practices (this document)