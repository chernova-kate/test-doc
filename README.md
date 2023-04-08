# TestDoc

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.4.

Project is hosted on https://chernova-kate.github.io/

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## About

### Project features:
- component-based approach for project structure (easy maintenance);
- angular material - for UI and drag'n'drop (fast to implement);
- ngrx component store - for state management. Found such a store exhaustive for the task, can be improved.
- every component use OnPush strategy (performance).

### What can be improved:
- add more pages
- styling (variables/markup and so on)
- tests
- file attach via drag'n'drop

## Known issues

- drag'n'drop cdk boundaries fails to detect correct boundary in case of doc scaling.

Can be fixed by manual boundaries' calculating or investigating existing solution (cdkDragBoundary)
