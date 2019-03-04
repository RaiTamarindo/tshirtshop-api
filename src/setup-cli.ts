import * as commander from 'commander';
import * as inquirer from 'inquirer';
import {
    AppConfig,
    IDatabaseConfig,
    IJWTConfig,
} from './config/app.config';
import { container } from './inversify.config';
import { SetupService } from './services/setup.service';

const setupService: SetupService = container.get<SetupService>(SetupService);
const databaseConfig: IDatabaseConfig = AppConfig.getDatabase() || {
    host: null,
    port: null,
    database: null,
    username: null,
    password: null,
};
const jwtConfig: IJWTConfig = AppConfig.getJWT() || { secret: null };
const questions: inquirer.Questions = [
    {
        type: 'input',
        name: 'databaseHost',
        message: 'Enter database host',
        default: databaseConfig.host || 'localhost',
    },
    {
        type: 'input',
        name: 'databasePort',
        message: 'Enter database port',
        default: databaseConfig.port || 3306,
        filter: (port: any) => parseInt(port, 10),
        validate: (port: any) => !isNaN(port),
    },
    {
        type: 'input',
        name: 'databaseUsername',
        message: 'Enter database user name',
        default: databaseConfig.username,
        validate: (username: string) => !!username,
    },
    {
        type: 'password',
        name: 'databasePassword',
        message: 'Enter database password',
        default: databaseConfig.password,
        validate: (password: string) => !!password,
        mask: '*',
    },
    {
        type: 'input',
        name: 'databaseName',
        message: 'Enter database name',
        default: databaseConfig.database,
        validate: (database: string) => !!database,
    },
    {
        type: 'input',
        name: 'jwtExpiration',
        message: 'Enter JWT expiration time, in seconds',
        default: jwtConfig.expiration,
        filter: (expiration: string) => parseInt(expiration, 10),
        validate: (expiration: any) => !isNaN(expiration),
    },
];

async function startSetup() {
    const answers: inquirer.Answers = await inquirer.prompt(questions);

    try {
        await setupService.setup({
            database: {
                host: answers.databaseHost,
                port: answers.databasePort,
                username: answers.databaseUsername,
                password: answers.databasePassword,
                database: answers.databaseName,
            },
            jwtExpiration: answers.jwtExpiration,
        });
        // tslint:disable-next-line: no-console
        console.info('OK: Setup successful!');
    } catch (err) {
        const message: string = typeof err === 'string' ? err : err.message;
        // tslint:disable-next-line: no-console
        console.error(`ERROR: ${message}`);
    }
}

commander
    .description('Setup TShirtShop API Application')
    .command('start')
    .description('Starts the application setup.')
    .action(startSetup);

commander.parse(process.argv);
