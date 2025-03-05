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
- `client`: 
- `deployments`:
- `docker`:
- `server`:

GitHub Branches:
- `main`: the tested and deployed version
- `dev`: branched from `main`, this is where frequent code changes and
improvements are made, this branch may be in a broken state.

## Required Resources
- This `GitHub` repository
- Recommended editor: Microsoft VS Code
- Python version 3.13+
- Node version 22+
- Docker version 26+
- Amazon Web Services account for EKS deployment

## Developer Guide and Workflow
This section contains instructions on how developers can...

### Development Workflow
Use short-lived branches directly off of `dev` and encourage frequent merging
of small changes.

1. Always pull the latest `dev` changes.
```
$ git checkout dev
$ git pull origin dev
```
2. Use a descriptive branch name, adopot the following labels:
  - `feat/<short-name>`: a new feature to add to `dev`
  - `bug/<short-name>`: a bug fix to `dev`
  - `debt/<short-name>`: addresses technical debt
  - `misc/<short-name>`: anything that doesn't fit into the other labels

Example:
```
$ git checkout -b feat/add-new-env-config
```
3. Keep changes small and focused. Make branches specific to a single feature or
fix and avoid working on unrelated changes in the same branch.

4. Regularly merge `dev` into your branch:
```
$ git checkout dev
$ git pull origin dev
$ git checkout feat/add-new-env-config
$ git merge dev
```

5. Add and commit your code changes to the branch:
```
$ git add .
$ git commit -m "Adding new configuration for dev env"
```

6. Push and create a Pull Request after committing changes:
```
$ git push origin feat/add-new-env-config
```
Then, open a PR against dev on GitHub, add a clear description, and request
reviews.

7. Delete merged branches once the PR has been merged:
```
git branch -d feat/add-new-env-config  # Delete local branch
git push origin --delete feat/add-new-env-config  # Delete remote branch
```

## TODO 
- Intent is for this project to be an all-in-one and simple DevOps platform / portfolio
- Set up CI / CD Pipelines
- Create free tier AWS account to deploy to
- Documentation of workflows and best practices (this document)