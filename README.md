# [fiona.co.za](https://fiona.co.za)

Portfolio website built with [NextJS](https://nextjs.org) and [React](https://reactjs.org).

Hosted on [Netlify](https://netlify.com), using [Netlify CMS](https://netlifycms.org) for content editing.

Styled with [TailwindCSS](https://tailwindcss.com).

## Project Structure

```
.
|-- src
|   |-- components
|   |-- lib
|   |-- pages
|   `-- styles
|-- public
|   |-- admin
|   |-- favicon.ico
|   `-- images
|-- content
|   |-- pages
|   `-- projects
```

All components and pages are in the `src` folder, under `/src/components` and `/src/pages` respectively. `/src/lib` contains utility functions for fetching and parsing content. This site is statically generated. At build time, all the pages are pre-rendered into HTML. This is faster than generating HTML each time a server request is made.

The `public` folder contains all static resources, including images and Netlify CMS configuration files.

The site pulls information from `content` at build time. This includes page content from `/content/pages`, as well as project descriptions in `/content/projects` Both are Markdown files with YAML front-matter. It is effectively a file-system CMS, which uses Netlify CMS as its front-end. If the amount of content on the site grew, I would have to migrate the CMS to a more long term solution. But this works fine for now and makes it possible to rapidly prototype.

## Local Development

Install yarn if it isn't already installed.

```
$ npm install --global yarn
```

Clone the repository, change into it, and install the dependencies.

```
$ git clone https://github.com/emilioziniades/fiona-co-za
$ cd fiona-co-za
$ yarn install
```

Once you have cloned the repository and installed the dependencies, you can start a development server.

```
$ yarn dev
```

This will open a port on [localhost:3000](localhost:3000) if the port is open. Open up the development server in your browser and take a look around. NextJS makes use of hot-reloading, so any changes you make will update immediately. If you are inclined, try fiddling around with the site. To experiment with Netlify CMS, you should change the backend setting in `/public/admin/config.yml`. Replace `git-gateway` with `test-repo`, and you can visit [https://localhost:3000/admin/index.html](https://localhost:3000/admin/index.html) to see how Netlify CMS parses the config file into a pretty neat CMS that even my mom could use.

I built this over the course of about a week, so it is definitely rough around the edges. I am also learning TypeScript, and so there is a mixture of JS and TS files.

If you have any fantastic ideas, feel free to open a pull request.

## TODO

- [ ] smooth page transition between project and projects pages
- [ ] \(maybe\) move individual project pages into a modal on the project page
- [x] paginate individual project pages
- [x] lazy load images with a blur
- [x] add two boxes to bottom of CV page
- [x] netlify cms
- [x] sort projects by category and add category headings
