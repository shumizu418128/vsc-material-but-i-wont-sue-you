import * as fs from 'fs-extra';
import * as path from 'path';

import {generateTheme} from '@moxer/vscode-theme-generator';
import {ThemeSetting} from './types';
import {getColorSet, getSemanticTokenColors} from './color-set';
import {BUILD_FOLDER_PATH} from '../../src/env';

const THEME_BUILD_PATH = path.join(BUILD_FOLDER_PATH, 'themes');
const themes = ['default', 'darker', 'lighter', 'ocean', 'palenight', 'deepforest'];

const withHC = themes.reduce((acc, src) => {
  acc = acc.concat(`${src}-hc`);
  return acc;
}, themes);

const themeModules = withHC.map(async theme => import(`./settings/specific/${theme}`).then(res => res.default));

const generate = async (): Promise<void> => {
  await fs.mkdirp(THEME_BUILD_PATH);
  const modules = await Promise.all(themeModules) as ThemeSetting[];
  for (const theme of modules) {
    const colorSet = getColorSet(theme);
    const outPath = path.join(THEME_BUILD_PATH, `${theme.name}.json`);
    generateTheme(theme.name, colorSet, outPath);
    const generated = (await fs.readJSON(outPath)) as Record<string, unknown>;
    const existingSemantic = generated.semanticTokenColors as
      | Record<string, string | {foreground?: string; fontStyle?: string}>
      | undefined;
    generated.semanticTokenColors = {
      ...(existingSemantic ?? {}),
      ...getSemanticTokenColors(theme)
    };
    await fs.writeJSON(outPath, generated, {spaces: 2});
  }
};

const run = async (): Promise<void> => {
  try {
    await generate();
  } catch (error) {
    console.error('ERROR build:generate-themes', error);
    process.exit(1);
  }
};

void run();
