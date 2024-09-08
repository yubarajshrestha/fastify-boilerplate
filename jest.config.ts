import { pathsToModuleNameMapper } from 'ts-jest'
import { compilerOptions } from './tsconfig.json'

module.exports = {
	verbose: false,
	preset: 'ts-jest',
	transform: {
		'^.+\\.tsx?$': `ts-jest`,
	},
	modulePathIgnorePatterns: ['<rootDir>/build/'],
	moduleDirectories: ['node_modules', '<rootDir>'],
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
	collectCoverage: true,
	testEnvironment: 'node',
	testResultsProcessor: 'jest-sonar-reporter',
	setupFiles: ['dotenv/config'],
	globalSetup: '<rootDir>/tests/helpers/setup.ts',
	globalTeardown: '<rootDir>/tests/helpers/teardown.ts',
}
