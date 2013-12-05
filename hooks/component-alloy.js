exports.cliVersion = '>=3.X';

exports.init = function (logger, config, cli, appc) {

    var exec = require('child_process').exec;

    cli.addHook('build.pre.compile', function (build, finished) {
        logger.info(JSON.stringify(build));

        logger.info("Running component-alloy plugin...");

        exec('pwd', function (error, stdout, stderr) {
            var appDir = stdout.replace('\n','') + '/app';
            logger.info('app dir = '+appDir);
            exec('cd "' + appDir + '" && ulimit -n 10000 && component build -v -c -o widgets -n component', function (error, stdout, stderr) {
                logger.info(stdout);
                if (stderr.length) {
                    logger.error(stderr);
                    return process.exit(1);
                }
                if (error != null) {
                    logger.error(error);
                    return process.exit(1);
                }
                var fs = require('fs');
                return fs.rename(appDir+'/widgets/component.js', appDir+'/lib/component.js', function(err) {
                    if (err) {
                        logger.info('errror='+JSON.stringify(err));
                        return process.exit(1);
                    }
                    return fs.appendFile(appDir+'/lib/component.js', '\nmodule.exports = require;', function(err) {
                        if (err) {
                            logger.info('errror='+JSON.stringify(err));
                            return process.exit(1);
                        }
                        var component = require(appDir+'/lib/component');
                        var code = "";
                        for (var key in component.aliases) {
                            var path = component.aliases[key];
                            code += '\nrequire.alias("'+path+'","'+(key.split('deps/')[1])+'");';
                        }
                        return fs.appendFile(appDir+'/lib/component.js', code, finished);
                    });
                });
            });
        });
    });
};