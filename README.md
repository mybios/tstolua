# TypeScript to Lua

[TypeScript Homepage](http://www.typescriptlang.org/)

## Building

In order to build the TypeScript compiler, ensure that you have [Git](http://git-scm.com/downloads) and [Node.js](http://nodejs.org/) installed. Note that you need to have autocrlf off as we track whitespace changes (`git config --global core.autocrlf false`).

Clone a copy of the repo:

```
git clone https://github.com/freedot/tstolua.git
```

Change to the tstolua directory:

```
cd tstolua
```

Install Jake tools and dev dependencies:

```
npm install -g jake
npm install
```

Use one of the following to build and test:

```
jake local            # Build the compiler into built/local 
jake clean            # Delete the built compiler 
jake LKG              # Replace the last known good with the built one.
                      # Bootstrapping step to be executed when the built compiler reaches a stable state.
jake tests            # Build the test infrastructure using the built compiler. 
jake runtests         # Run tests using the built compiler and test infrastructure. 
                      # You can override the host or specify a test for this command. 
                      # Use host=<hostName> or tests=<testPath>. 
jake runtests-browser # Runs the tests using the built run.js file. Syntax is jake runtests. Optional
                        parameters 'host=', 'tests=[regex], reporter=[list|spec|json|<more>]'.
jake baseline-accept  # This replaces the baseline test results with the results obtained from jake runtests. 
jake -T               # List the above commands. 
```


## Usage

```shell
node built/local/tsc.js hello.ts
```

