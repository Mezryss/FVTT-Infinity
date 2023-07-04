import fs from 'fs';
import gulp from 'gulp';
const { dest, series, src } = gulp;

import gulpClean from 'gulp-clean';
import gulpYaml from 'gulp-yaml';
import gulpZip from 'gulp-zip';

const RELEASE_FILES = ['external/**/*', 'fonts/**/*', 'images/**/*', 'module/**/*', 'lang/**/*', 'templates/**/*', 'template.json', 'system.json', 'Infinity.css', 'CHANGELOG.md', 'README.md', 'LICENSE'];

export function zip() {
	let version;
	try {
		const systemJsonFile = fs.readFileSync('./system.json', { encoding: 'utf8' });
		const systemJson = JSON.parse(systemJsonFile);
		version = systemJson['version'];
	} catch {
		version = 'unknown';
	}

	return src(RELEASE_FILES, { base: '.' })
		.pipe(gulpZip(`infinity-${version}.zip`))
		.pipe(dest('.'));
}

export function clean() {
	return src(['lang/', 'system.json', 'template.json'], { allowEmpty: true }).pipe(gulpClean());
}

export function data() {
	return src('yaml/**/*.yml').pipe(gulpYaml()).pipe(dest('.'));
}

function watchDirs() {
	gulp.watch('yaml/**/*.yml', data);
}

export const watch = series(clean, data, watchDirs);
export const release = series(clean, data, zip);
export default series(clean, data);
