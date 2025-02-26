"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const figlet_1 = __importDefault(require("figlet"));
const inquirer_1 = __importDefault(require("inquirer"));
const installer_1 = require("./installer");
function handleAnswers(answers) {
    const front = answers.front.toLowerCase();
    const typescript = answers.typescript === 'Yes' ? 'ts' : 'js';
    const repoUrl = `https://github.com/christophe77/ccez-${front}-${typescript}`;
    try {
        (0, installer_1.installRepo)(repoUrl, answers.projectName);
    }
    catch (error) {
        console.log(error);
    }
}
function launchPrompt() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const welcomeMessage = figlet_1.default.textSync('Create Chrome ExtensionZ');
            const packageInfo = require('./package.json');
            const version = packageInfo.version;
            const versionText = figlet_1.default.textSync(`v. ${version}`);
            console.log(welcomeMessage);
            console.log(versionText);
            const answers = yield inquirer_1.default.prompt([
                {
                    type: 'input',
                    name: 'projectName',
                    message: 'Project name :',
                },
                {
                    type: 'list',
                    name: 'front',
                    message: 'Frontend :',
                    choices: ['React-19', 'React-18', 'Vanilla'],
                    default: 'React-19',
                },
                {
                    type: 'list',
                    name: 'typescript',
                    message: 'TypeScript :',
                    choices: ['Yes', 'No'],
                    default: 'Yes',
                },
            ]);
            handleAnswers(answers);
        }
        catch (error) {
            console.log(error);
        }
    });
}
const ccez = {
    launchPrompt,
};
exports.default = ccez;
//# sourceMappingURL=ccez.js.map