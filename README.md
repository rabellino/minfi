# minfi

## TODO
- Intent is for this project to be an all-in-one and simple DevOps platform / portfolio
- Set up CI / CD Pipelines
- Create free tier AWS account to deploy to
- Documentation of workflows and best practices (this document)

## Developer Guide and Workflow

### Making code changes in Development branch (dev)

- main branch (the "prod" version)
- dev branch (the development branch off main where frequent changes and improvements are made, may be in a broken state)
    - branch of dev is a place to add new features, fix bugs, address tech debt, etc

#### Creating a new branch off dev


- git clone
- create a new branch for bug / feat / debt / misc
- Always pull before committing and pushing because...$ git pull
- $ git add .
- $ git commmit -m ""
- $ git push

#### Setting up pull requests