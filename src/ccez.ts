import figlet from 'figlet';
import { input, select } from '@inquirer/prompts';
import { installRepo } from './installer';
import { Answers } from './types/answers';
import { CCEZ } from './types/ccez';

function handleAnswers(answers: Answers): void {
	const baseUrl = `https://github.com/christophe77/ccez`;
	const front = answers.selectedTechno.toLowerCase();
	const repoUrl = `${baseUrl}-${front}-${answers.useTypeScript === 'yes' ? 'ts' : 'js'}`

	try {
		installRepo(repoUrl, answers.projectName);
	} catch (error) {
		console.log(error);
	}
}

async function launchPrompt(): Promise<void> {
	try {
		const welcomeMessage = figlet.textSync('Create Chrome ExtensionZ');
		const packageInfo = require('./package.json');
		const version = packageInfo.version;
		const versionText = figlet.textSync(`v. ${version}`);

		console.log(welcomeMessage);
		console.log(versionText);

		const tsRepos = ['React-19', 'React-18', 'Vue-2', 'Vue-3', 'Vanilla'];
		const jsRepos = ['Vanilla'];

		const projectName: string = await input({ message: 'Project name :' });
		const useTypeScript: string = await select({
			message: 'TypeScript :',
			choices: ['yes', 'no'],
			default: 'yes',
		});
		const selectedTechno: string = await select({
			message: 'Techno :',
			choices: useTypeScript === 'yes' ? tsRepos : jsRepos,
			default: 'React-19',
		});
		const answers: Answers = {
			projectName,
			useTypeScript,
			selectedTechno,
		};
		handleAnswers(answers);
	} catch (error) {
		console.log(error);
	}
}

const ccez: CCEZ = {
	launchPrompt,
};
export default ccez;
