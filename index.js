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
    this.global.nightwatch_client = this.client.nightwatch_client;
  }

  async setup() {
    await super.setup();

    this.opts.auto_start_session = this.opts.auto_start_session || typeof this.opts.auto_start_session == 'undefined';

    // auto_start_session is true by default
    if (this.opts.auto_start_session) {
      this.global.browser = await this.client.launchBrowser();
    }
  }
}

module.exports = NightwatchEnvironment;
