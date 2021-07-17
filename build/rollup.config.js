import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
// import postcss from 'rollup-plugin-postcss-modules'
import postcss from 'rollup-plugin-postcss'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import pkg from '../package.json'
import clear from 'rollup-plugin-clear'
import babel from '@rollup/plugin-babel'
import { getPackagesSync } from '@lerna/project'
import path from 'path'

const isProduction = !process.env.ROLLUP_WATCH
const deps = Object.keys(pkg.dependencies)
const noElPrefixFile = /(utils|directives|hooks|locale|style)/
const getOutFile = (compName, dir = 'lib') => {
  if (noElPrefixFile.test(compName)) {
    return `${dir}/${compName}/index.js`
  }
  return `${dir}/${compName}/index.js`
}
const inputs = getPackagesSync()
  .map((pkg) => pkg.name)
  .filter((name) => !name.includes('style'))

export default inputs.map((name) => {
  return {
    input: path.resolve(__dirname, `../packages/${name}/index.ts`),
    output: [
      {
        format: 'es',
        file: getOutFile(name, 'es'),
      },
      {
        format: 'cjs',
        file: getOutFile(name, 'lib'),
        exports: 'named',
      },
    ],
    plugins: [
      clear({
        targets: [`es/${name}`, `lib/${name}`],
      }),
      typescript(),
      resolve({
        preferBuiltins: false,
      }),
      commonjs(),
      babel({
        babelHelpers: 'bundled',
        presets: ['@babel/preset-env'],
        exclude: '**/node_modules/**',
      }),
      json(),
      postcss({
        extract: 'index.css',
      }),
      isProduction && terser(),
    ],
    external(id) {
      return (
        /^react/.test(id) ||
        /^@resonance-ui/.test(id) ||
        deps.some((k) => new RegExp('^' + k).test(id))
      )
    },
  }
})

