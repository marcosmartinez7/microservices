# microservices

https://www.udemy.com/course/microservices-with-node-js-and-react

Git submodules

Considering https://github.com/marcosmartinez7/microservices is a git repo, and ticketing/common is a repo too: 

To add a submodule, In the parent git run

```bash
git submodule add {localpath}/microservices/ticketing/common/.git/
```

To get full code (since submodules are links not copies)
```bash

git clone https://github.com/marcosmartinez7/microservices.git --recurse-submodules

```
