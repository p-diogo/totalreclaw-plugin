import * as esbuild from 'esbuild';

// Plugin to handle permissionless's dynamic import("ox") which confuses esbuild.
// permissionless wraps it in try/catch for optional WebAuthn — we don't use WebAuthn,
// so we replace the dynamic import with a rejection.
const oxDynamicImportPlugin = {
  name: 'ox-dynamic-import',
  setup(build) {
    // Only intercept the specific file with the problematic dynamic import
    build.onLoad({ filter: /permissionless.*utils\/ox\.js$/ }, async (args) => {
      return {
        contents: `
          export async function getOxModule() {
            throw new Error("ox WebAuthn not available in bundled build");
          }
          export function hasOxModule() { return false; }
          export async function getOxExports() {
            throw new Error("ox WebAuthn not available in bundled build");
          }
        `,
        loader: 'js',
      };
    });
  },
};

await esbuild.build({
  entryPoints: ['index.ts'],
  bundle: true,
  format: 'esm',
  platform: 'node',
  target: 'node18',
  outfile: 'dist/index.js',
  external: ['@huggingface/transformers'],
  plugins: [oxDynamicImportPlugin],
});
