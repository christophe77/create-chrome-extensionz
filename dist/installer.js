"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.installRepo = installRepo;
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
function installRepo(repoUrl, projectName) {
    const projectPath = path_1.default.join(path_1.default.resolve(__dirname, ''), projectName);
    try {
        console.log(`Cloning into ${projectPath}`);
        (0, child_process_1.execSync)(`git clone ${repoUrl} ${projectName}`, {
            stdio: [0, 1, 2],
            cwd: path_1.default.resolve(__dirname, ''),
        });
        console.log(``);
        console.log(`Project cloned into : ${projectPath}`);
        console.log(`Navigate to : ${projectPath} and install dependencies.`);
        console.log(``);
    }
    catch (error) {
        console.log(`Error : ${error}`);
    }
}
//# sourceMappingURL=installer.js.map