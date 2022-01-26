# jest-environment-nightwatch
**[Nightwatch 2](https://v2.nightwatchjs.org)** environment for Jest. Nightwatch.js is an integrated test framework for performing automated end-to-end testing on web applications and websites, across all major browsers.

[![Build Status][build-badge]][build]
[![version][version-badge]][package]
[![MIT License][license-badge]][license]

```
npm install jest-environment-nightwatch
```

## Usage:
Update your Jest configuration:

```json
{
  testEnvironment: 'jest-environment-nightwatch',
  testEnvironmentOptions: {
    // Nightwatch related options
    headless: true,
    browserName: 'chrome',
    verbose: false,  
    output: true,
    env: null, 
    parallel: false,
    devtools: false,
    debug: false, 
    persistGlobals: true,
    configFile: './nightwatch.conf.js',
    globals: {}, 
    webdriver: {},
    timeout: null,
    enableGlobalApis: false,
    alwaysAsync: true,
    desiredCapabilities: {}
  }
}
```

## Nightwatch options
### .headless

| Type | Description | Default |
|:--- | :--- | :---: |
| Boolean  | Run Nightwatch in headless mode (available in Firefox, Chrome, Edge) | `true` | 

### .browserName

| Type | Description | Default |
|:--- | :--- | :---: |
| String  | Browser name to use; available options are: `chrome`, `firefox`, `edge`, `safari` | none | 

### .verbose

| Type | Description | Default |
|:--- | :--- | :---: |
| Boolean  | Enable complete Nightwatch http logs. | `false` |

### .output

| Type | Description | Default |
|:--- | :--- | :---: | 
| Boolean  | Show Nightwatch output. | `true` |

### .env

| Type | Description | Default |
|:--- | :--- | :---: | 
| String  | Nightwatch test environment to use, from `nightwatch.conf.js`. Learn more about test environments in the [Nightwatch docs](https://v2.nightwatchjs.org/guide/using-nightwatch/concepts.html#defining-test-environments). | none |

### .parallel

| Type | Description | Default |
|:--- | :--- | :---: |
| Boolean  | Set this to true when running tests in parallel | `false` |

### .devtools

| Type | Description | Default |
|:--- | :--- | :---: |
| Boolean  | Chrome only: automatically open the chrome devtools | `false` |

### .debug

| Type | Description | Default |
|:--- | :--- | :---: |
| Boolean  | Component testing only: pause the test execution after rendering the component | `false` |

### .persistGlobals

| Type | Description | Default |
|:--- | :--- | :---: |
| Boolean  | Persist the same globals object between runs or have a (deep) copy of it per each test. Learn more about test globals in the [Nightwatch docs](https://v2.nightwatchjs.org/guide/using-nightwatch/concepts.html#using-test-globals).| `true` |

### .configFile

| Type | Description | Default |
|:--- | :--- | :---: | 
| String  | The Nightwatch config file to use. A config file will be auto-generated by default, but this allows you to change that. Learn more about the Nightwatch config in the [Nightwatch docs](https://v2.nightwatchjs.org/guide/configuration/overview.html). | `./nightwatch.conf.js` |


### .globals

| Type | Description | Default |
|:--- | :--- | :---: | 
| Object  | A list of globals to be used in Nightwatch. Globals are available on `browser.globals`. Learn more about the Nightwatch test globals in the [Nightwatch docs](https://v2.nightwatchjs.org/guide/using-nightwatch/external-globals.html). | none |

### .webdriver

| Type | Description | Default |
|:--- | :--- | :---: | 
| Object  | A list of Webdriver related settings to configure the Nightwatch Webdriver service. Learn more about the Nightwatch webdriver settings in the [Nightwatch docs](https://v2.nightwatchjs.org/guide/configuration/settings.html#webdriver-settings). | none |

### .timeout

| Type | Description | Default |
|:--- | :--- | :---: |
| Number  | Set the global timeout for assertion retries before an assertion fails.  | `5000` |

### .enableGlobalApis

| Type | Description | Default |
|:--- | :--- | :---: |
| Boolean  | The Nightwatch global APIs ([element()](https://v2.nightwatchjs.org/api/element/), [expect()](https://v2.nightwatchjs.org/api/expect/)) are disable by default. | `false` |

### .desiredCapabilities

| Type | Description | Default |
|:--- | :--- | :---: |
| Object  | Define custom Selenium capabilities for the current session. Learn more about the specific browser driver that it is being used on the [Nightwatch docs](https://v2.nightwatchjs.org/guide/browser-drivers-setup/). | none |


## API

### `global.browser`

The Nightwatch [browser API](https://v2.nightwatchjs.org/api/#the-browser-object) object.

### `global.nightwatch_client`

The entire Nightwatch instance.

## License
MIT

[build-badge]: https://github.com/nightwatchjs/jest-environment-nightwatch/actions/workflows/node.js.yml/badge.svg?branch=main
[build]: https://github.com/nightwatchjs/jest-environment-nightwatch/actions/workflows/node.js.yml
[version-badge]: https://img.shields.io/npm/v/jest-environment-nightwatch.svg?style=flat-square
[package]: https://www.npmjs.com/package/jest-environment-nightwatch
[license-badge]: https://img.shields.io/npm/l/jest-environment-nightwatch.svg?style=flat-square
[license]: https://github.com/nightwatchjs/jest-environment-nightwatch/blob/main/LICENSE