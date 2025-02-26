import figlet from 'figlet';
import inquirer from 'inquirer';
import { installRepo } from './installer';
import { Answers } from './types/answers';
import { CCEZ } from './types/ccez';

function handleAnswers(answers: Answers): void {
    const front = answers.front.toLowerCase();
    const typescript = answers.typescript === 'Yes' ? 'ts' : 'js';

    const repoUrl = `https://github.com/christophe77/ccez-${front}-${typescript}`;
    try {
        installRepo(
            repoUrl,
            answers.projectName,
        );
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

		const answers: Answers = await inquirer.prompt([
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
	} catch (error) {
		console.log(error);
	}
}

const ccez: CCEZ = {
	launchPrompt,
};
export default ccez;
