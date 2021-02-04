const YAML = require("js-yaml");
const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");

async function main() {
    const [, , srcPath, destPath] = process.argv;
    await generateDir(srcPath, destPath);
}

async function generateDir(srcPath, destPath) {
    await mkdirp(destPath);
    const children = await fs.promises.readdir(srcPath, {
        encoding: "utf-8",
        withFileTypes: true
    });
    await Promise.all(
        children.map(async child => {
            const fullPath = path.join(srcPath, child.name);
            const fullDestPath = path.join(
                destPath,
                child.name.replace(/\.[^.]*$/, ".yaml")
            );
            if (child.isDirectory()) {
                return generateDir(fullPath, fullDestPath);
            } else if (child.isFile()) {
                switch (path.extname(child.name)) {
                    case ".js":
                        await generateFileFromJS(fullPath, fullDestPath);
                        break;

                    case ".yaml":
                    case ".yml":
                        await generateFileFromYAML(fullPath, fullDestPath);
                        break;

                    default:
                        throw new Error(
                            `Don't know what to do with this type of file (based on extension): ${fullPath}`
                        );
                }
                await fs.promises.chmod(fullDestPath, 0o444);
            } else {
                throw new Error(
                    "Don't know how to handle a directory entry that is neither a directory nor a file: " +
                        fullPath
                );
            }
        })
    );
}

async function generateFileFromYAML(fullPath, fullDestPath) {
    await fs.promises.copyFile(fullPath, fullDestPath);
    console.log(`Copied YAML file to ${fullDestPath}`);
}

async function generateFileFromJS(fullPath, fullDestPath) {
    try {
        const childExport = await import(`../${fullPath}`);
        await fs.promises.writeFile(
            fullDestPath,
            YAML.dump(childExport.default),
            "utf8"
        );
        console.log(`Generated from JavaScript: ${fullDestPath}`);
    } catch (error) {
        throw Object.assign(
            new Error(
                `Error generating contents from ${fullPath}: ${error.message}`
            ),
            {
                name: error.name,
                stack: error.stack
            }
        );
    }
}

async function enter() {
    try {
        await main();
    } catch (error) {
        console.error(error);
        process.exitCode = 1;
    }
}

enter();
