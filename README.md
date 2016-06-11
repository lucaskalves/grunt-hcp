# grunt-hcp

> A grunt plugin to manage [HCP server](https://tools.hana.ondemand.com/#cloud) instances based on configuration files.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-hcp --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-hcp');
```

## The "hcp" task

### Overview
In your project's Gruntfile, add a section named `hcp` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  hcp: {
    options: {
          configFile: 'conf/hcp-config.json'
    },
    dev: {
          configFile: 'conf/hcp-dev-config.json'
    },
    prod: {
          configFile: 'conf/hcp-prod-config.json'
    }
  },
});
```

### Options

#### options.configFile
Type: `String`
Default value: `'hcp-config.json'`

The path to the HCP configuration file.

#### Configuration File Options

The HCP properties are stored in separate files so that user specific data don't get messed up with public data.

```json
{
    "localServerPath": "C:/Users/username/workspace/Servers/Java Web Server-config/",
    "sourcePath": "target",
    "hcpHost": "username.hanatrial.ondemand.com",
    "hcpAccount": "usernametrial",
    "hcpUser": "hcp-username or email",
    "hcpAppName": "app",
    "shutdownPort": "8009"
}
```

##### configFile.localServerPath
Type: `String`
Default value: `''`

Path to the local server installation. More information in the [documentation page of neo start-local command](https://help.hana.ondemand.com/help/frameset.htm?cd54325ba712483489ab93eb1864af57.html).

##### configFile.sourcePath
Type: `String`
Default value: `'target/project.war'`

War file that will be deployed to the local or remote server. More information in the [documentation page of neo deploy-local command](https://help.hana.ondemand.com/help/frameset.htm?8fdc143303d2456a84cd660eb7277a6a.html).

##### configFile.hcpHost
Type: `String`
Default value: `'us1.hana.ondemand.com'`

HCP Host in which the local War file will be deployed. More information in the [documentation page of neo deploy command](https://help.hana.ondemand.com/help/frameset.htm?937db4fa204c456f9b7820f83bc87118.html).

##### configFile.hcpAccount
Type: `String`
Default value: `''`

HCP account in which the local War file will be deployed. For trial accounts, it is something like *<username>trial*. More information in the [documentation page of neo deploy command](https://help.hana.ondemand.com/help/frameset.htm?937db4fa204c456f9b7820f83bc87118.html).

##### configFile.hcpUser
Type: `String`
Default value: `''`

HCP username or email to the account in which the local War file will be deployed. More information in the [documentation page of neo deploy command](https://help.hana.ondemand.com/help/frameset.htm?937db4fa204c456f9b7820f83bc87118.html).

##### configFile.hcpAppName
Type: `String`
Default value: `'hcp-config.json'`

Application name that will be used in the remote Java application. It will be used in the application URL. More information in the [documentation page of neo deploy command](https://help.hana.ondemand.com/help/frameset.htm?937db4fa204c456f9b7820f83bc87118.html).

##### configFile.shutdownPort
Type: `String`
Default value: `'8009'`

Port that is used to shutdown the application. More information in the [documentation page of neo stop-local command](https://help.hana.ondemand.com/help/frameset.htm?ee02d4dd64464c6199de07322926d8cd.html).

### Commands

All commands are executed under the context of a given target. For exemple, we start a local server using the *dev* target by running:

  `grunt hcp:dev:start-local`

It will read the configuration file specified in the *dev* target and start a local server using that HCP configuration.

#### hcp:*target*:start-local

Starts a pre-installed local server using the command `neo start-local`. More information: [neo start-local Documentation](https://help.hana.ondemand.com/help/frameset.htm?cd54325ba712483489ab93eb1864af57.html).

#### hcp:*target*:stop-local
Stops a local server using the command `neo stop-local`. More information: [neo stop-local Documentation](https://help.hana.ondemand.com/help/frameset.htm?ee02d4dd64464c6199de07322926d8cd.html).

#### hcp:*target*:deploy-local
Deploy war file(s) to a local server using the command `neo deploy-local`. More information: [neo deploy-local Documentation](https://help.hana.ondemand.com/help/frameset.htm?8fdc143303d2456a84cd660eb7277a6a.html).

#### hcp:*target*:deploy
Deploy war file(s) to a remote server using the command `neo deploy`. More information: [neo deploy Documentation](https://help.hana.ondemand.com/help/frameset.htm?937db4fa204c456f9b7820f83bc87118.html).

#### hcp:*target*:restart
Restarts a remote server using the command `neo restart`. More information: [neo restart Documentation](https://help.hana.ondemand.com/help/frameset.htm?7c0f7a18a4564e0e8b6f997d230285ff.html).


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
0.1.0: First version.

### License
Copyright (c) 2016 Lucas Alves.

Released under the [MIT license](https://tldrlegal.com/license/mit-license).
