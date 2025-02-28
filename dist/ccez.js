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
const prompts_1 = require("@inquirer/prompts");
const installer_1 = require("./installer");
function handleAnswers(answers) {
    const baseUrl = `https://github.com/christophe77/ccez`;
    const front = answers.selectedTechno.toLowerCase();
    const repoUrl = `${baseUrl}-${front}-${answers.useTypeScript === 'yes' ? 'ts' : 'js'}`;
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
            const tsRepos = ['React-19', 'React-18', 'Vue-3', 'Vanilla'];
            const jsRepos = ['Vue-3', 'Vanilla'];
            const projectName = yield (0, prompts_1.input)({ message: 'Project name :' });
            const useTypeScript = yield (0, prompts_1.select)({
                message: 'TypeScript :',
                choices: ['yes', 'no'],
                default: 'yes',
            });
            const selectedTechno = yield (0, prompts_1.select)({
                message: 'Techno :',
                choices: useTypeScript === 'yes' ? tsRepos : jsRepos,
                default: 'React-19',
            });
            const answers = {
                projectName,
                useTypeScript,
                selectedTechno,
            };
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