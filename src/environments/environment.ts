// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import { InjectionToken, Injector } from '@angular/core';
export class Environment {
  production = false;
  BaseServiceUrl = 'http://localhost:62622/';
  DefaultLanguage = 'en-US';
}

const injector = Injector.create([
  { provide: Environment, useClass: Environment, deps: [] }
]);
export const environment: Environment = injector.get(Environment);
