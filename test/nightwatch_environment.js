const assert = require('assert');
const NodeEnvironment = require('jest-environment-node');
const NightwatchEnvironment = require('../index.js');
const Nightwatch = require('nightwatch');
const NightwatchClient = require('nightwatch/lib/core/client.js');

describe('NightwatchEnvironment Unit Tests', function() {
  it('create and verify the instance', function() {
    const instance = new NightwatchEnvironment({});

    assert.ok(instance instanceof NodeEnvironment);
    assert.ok(instance.global.nightwatch_client instanceof NightwatchClient);
  });

  it('verify defaults', function(done) {
    const origFn = Nightwatch.createClient;

    Nightwatch.createClient = function({
      headless,
      browserName,
      reporter,
      silent,
      output,
      env,
      parallel,
      devtools,
      debug,
      persist_globals,
      config,
      globals,
      webdriver,
      timeout,
      test_runner,
      always_async_commands,
      enable_global_apis
    } = {}) {
      assert.strictEqual(headless, true);
      assert.strictEqual(browserName, undefined);
      assert.strictEqual(reporter, null);
      assert.strictEqual(silent, true);
      assert.strictEqual(output, true);
      assert.strictEqual(env, null);
      assert.strictEqual(timeout, null);
      assert.strictEqual(parallel, false);
      assert.strictEqual(enable_global_apis, false);
      assert.strictEqual(always_async_commands, false);
      assert.strictEqual(devtools, false);
      assert.strictEqual(debug, false);
      assert.strictEqual(persist_globals, true);
      assert.strictEqual(config, './new-config.js');
      assert.deepStrictEqual(globals, {});
      assert.deepStrictEqual(webdriver, {});
      assert.deepStrictEqual(test_runner, {type: 'jest'});

      Nightwatch.createClient = origFn;
      done();
    };

    const instance = new NightwatchEnvironment({
      testEnvironmentOptions: {
        configFile: './new-config.js',
        alwaysAsync: false
      }
    });
  });

  it('with changed settings', function() {
    const instance = new NightwatchEnvironment({
      testEnvironmentOptions: {
        desiredCapabilities: {
          'goog:chromeOptions': {
            w3c: true,
            args: ['no-sandbox']
          }
        },
        env: 'chrome',
        timeout: 1100,
        headless: false,
        enableGlobalApis: true,
        devtools: true,
        debug: true,
        verbose: true,
        webdriver: {
          host: 'localhost',
          port: 4000
        },
        custom_assertions_path: './assertions'
      }
    });

    const {settings, queue, transport, api} = instance.global.nightwatch_client;
    assert.strictEqual(settings.capabilities.browserName, 'chrome');
    assert.strictEqual(settings.desiredCapabilities.browserName, 'chrome');
    assert.strictEqual(settings.desiredCapabilities['goog:chromeOptions'].args[0], 'no-sandbox');
    assert.strictEqual(settings.globals.waitForConditionTimeout, 1100);
    assert.strictEqual(settings.always_async_commands, true);
    assert.strictEqual(settings.enable_global_apis, true);
    assert.deepStrictEqual(settings.test_runner, {type: 'jest'});
    assert.strictEqual(settings.webdriver.host, 'localhost');
    assert.strictEqual(settings.webdriver.port, 4000);
    assert.strictEqual(queue.tree.foreignRunner, true);
    assert.strictEqual(queue.tree.cucumberRunner, false);
  });

  it('test with setup', async function() {
    const instance = new NightwatchEnvironment();
    instance.client.launchBrowser = function() {
      return Promise.resolve({value: true});
    };

    await instance.setup();

    assert.deepStrictEqual(instance.global.browser, {value: true});
  });

  it('test with setup and auto_start off', async function() {
    const instance = new NightwatchEnvironment({
      testEnvironmentOptions: {
        auto_start_session: false
      }
    });

    await instance.setup();
    assert.strictEqual(instance.global.browser, undefined);
  });
});
