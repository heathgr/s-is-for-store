# Getting Started

Setting up a project from scratch is beyond the scope of this tutorial.  So we have put together a repository that has beginnings of our app.  Over the course of this tutorial, you will add S is for Store to the project and make it functional.

## Clone The Project

First, you will need to clone the project.  In the terminal, go to the folder where you want the project to be.  Then enter the following command:

```
git clone git@github.com:heathgr/t-is-for-tutorial.git
```

If you want to clone the project using https, use this command:

```
https://github.com/heathgr/t-is-for-tutorial.git
```

Once the project has been cloned, go to the root of the project:

```
cd t-is-for-tutorial
```

## Install the Project's Dependencies

Install the project's dependencies with the following command:

```
npm install
```

## Start The Development Servers

Start the development servers with the following command:

```
npm start
```

This command does the following:
  1. It starts a [json-server](https://www.npmjs.com/package/json-server) on port 3001.  This server will handle all the API requests for this project.
  2. The project should open in your default browser.  A development server is hosting the project locally.  The project will automatically update as you write your code.

## Conclusion

The project's development environment should be up an running.  In the next section you will add S is for Store to the project and create a store.
