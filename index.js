const Nightwatch = require('nightwatch');
const NodeEnvironment = require('jest-environment-node');

const createNightwatchClient = function({
  headless = true,
  browserName = undefined,
  silent = true,
  verbose = false,
  output = true,
  env = null,
  parallel = false,
  devtools = false,
  debug = false,
  persistGlobals = true,
  configFile = './nightwatch.conf.js',
  globals = {},
  webdriver = {},
  timeout = null,
  enableGlobalApis = false,
  reporter = null,
  alwaysAsync = true,
  desiredCapabilities = {}
} = {}) {

  const client = Nightwatch.createClient({
    headless,
    browserName,
    reporter,
    env,
    timeout,
    parallel,
    output,
    devtools,
    debug,
    enable_global_apis: enableGlobalApis,
    silent: silent && !verbose,
    always_async_commands: alwaysAsync,
    test_runner: {
      type: 'jest'
    },
    webdriver,
    persist_globals: persistGlobals,
    config: configFile,
    globals,
    desiredCapabilities
  });

  client.updateCapabilities(desiredCapabilities);

  return client;
};

class NightwatchEnvironment extends NodeEnvironment {
  constructor(config = {}, context) {
    super(config, context);

    this.opts = config.testEnvironmentOptions || {};
    this.client = createNightwatchClient(this.opts);

    this.global.jestNightwatch = this.client;
  }

  async setup() {
    this.opts.autoStartSession = this.opts.autoStartSession || typeof this.opts.autoStartSession == 'undefined';

    // autoStartSession is true by default
    if (this.opts.autoStartSession) {
      this.global.browser = await this.client.launchBrowser();
    }

    if (this.opts.baseUrl) {
      this.global.browser.baseUrl = this.opts.baseUrl;
    }

    if (typeof this.opts.setup == 'function') {
      await this.opts.setup.call(this.global, this.global.browser);
    }
  }

  async teardown() {
    await super.teardown();

    if (typeof this.opts.teardown == 'function') {
      await this.opts.teardown.call(this.global, this.global.browser);
    }
  }
}

module.exports = NightwatchEnvironment;
