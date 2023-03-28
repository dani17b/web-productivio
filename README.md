# Productivio
This is a react project made by students. 


## Pre-requisites:
### NodeJS.
If you dont have NodeJS installed in your computer, you can find the last version [here](https://nodejs.org/en).
To verify it was successfully installed, open your command console and type: `node -v`. It should display the version you just installed.

### Package Management.
Once Node is set-up, go to your command console and type: `npm install --global yarn`.
We are using ***yarn*** as our dependency management tool. To check it was successfully installed, type the following command: `yarn --version`

---
Now that everything is ready, let's continue


## Quickstart:
**1.** Clone the following repositories: 
 - ` git clone https://github.com/dani17b/web-productivio.git `  
 - ` git clone https://github.com/dani17b/lib-productivio.git `

**2.** Set-Up Lib:
 - When you have finished cloning the repositories listed above, head up to lib-productivio: 
`cd './lib-productivio' | yarn install`.
- When the yarn install finish...  type this: `yarn build` and then `yarn link`, you should see a **success** message.

**3.** Set-Up Web:
- First of all, write `yarn link "lib-productivio"` to have all the imports from the lib.
- Now, you can write `yarn install`, wait for it to end and type `yarn start`.

## Contributing
We're following a basic workflow. Create a issue, self-assign it (or don't if you are not gonna do it), create a branch, then a PR and wait for some approvals to merge the branch into develop or main. 
 
