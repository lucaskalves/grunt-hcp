/*
 * grunt-hcp
 * 
 *
 * Copyright (c) 2016 Lucas Alves
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
    var cp = require('child_process');
    var inquirer = require('inquirer');

    // default hcp config
    var defaultHCPConfig = {
        localServerPath: "",
        sourcePath: "target",
        hcpHost: "us1.hana.ondemand.com",
        hcpAccount: "",
        hcpUser: "",
        hcpAppName: "app",
        shutdownPort: "8009"
    };

    // returns a new array with a copy of the default properties in defs that are not declared in conf
    var shallowMerge = function(conf, defs) {
        var res = {};
        for (var defsAttr in defs) {
            res[defsAttr] = defs[defsAttr];
        }
        for (var confAttr in conf) {
            res[confAttr] = conf[confAttr];
        }
        return res;
    };

    // returns the argsList of a command 
    var getArgs = function(commandName, commandTemplates) {
        var args = [commandName];
        return args.concat(commandTemplates[commandName].args);
    };

    grunt.registerMultiTask('hcp', 'Easier API for SAP Hana Cloud Platform servers.', function(command, appName) {
        var options = this.options({
            configFile: "hcp-config.json"
        });

        // load the hcp server configuration
        var hcpConfig = grunt.file.readJSON(options.configFile);
        hcpConfig = shallowMerge(hcpConfig, defaultHCPConfig);

        // console neoCommands 
        var neoCommands = {
            "start-local": {
                args: ["--location", hcpConfig.localServerPath,
                    "--shutdown-port", hcpConfig.shutdownPort
                ]
            },
            "stop-local": {
                args: ["--shutdown-port", hcpConfig.shutdownPort]
            },
            "deploy-local": {
                args: ["--location", hcpConfig.localServerPath,
                    "--source", hcpConfig.sourcePath
                ]
            },
            "deploy": {
                args: ["--host", hcpConfig.hcpHost,
                    "--source", hcpConfig.sourcePath,
                    "--account", hcpConfig.hcpAccount,
                    "--user", hcpConfig.hcpUser,
                    "--application", (appName || hcpConfig.hcpAppName)
                ]
            },
            "restart": {
                args: ["--host", hcpConfig.hcpHost,
                    "--account", hcpConfig.hcpAccount,
                    "--user", hcpConfig.hcpUser,
                    "--application", (appName || hcpConfig.hcpAppName)
                ]
            }
        };

        var runCommand = function(doneAsync, extraArgs) {
            extraArgs = extraArgs || [];
            var child = grunt.util.spawn({
                cmd: 'neo',
                args: getArgs(command, neoCommands).concat(extraArgs),
                stdio: 'inherit'
            }, doneAsync);
            child.stdout.pipe(process.stdout);
            child.stderr.pipe(process.stderr);
        }

        // runs the command if it is defined
        if (!(command in neoCommands)) {
            grunt.fail.warn("Command not found. Command: " + command);
        }

        // Execute the command the command
        var requireAuthentication = ['deploy', 'restart'];
        var done = this.async();
        if (requireAuthentication.indexOf(command) >= 0) {
            inquirer.prompt({
                type: "password",
                message: "Enter your HCP password",
                name: "password"
            }).then(function(answers) {
                runCommand(done, ['--password', answers[0]]);
            });
        } else {
            runCommand(done);
        }
    });
};