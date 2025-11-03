import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'

function virtualFilesPlugin({ totalFiles, fileCharacters }) {
    const PREFIX = '/virtual:gen/'
    const INDEX_ID = '/virtual:gen/index.js'
    const ids = Array.from({length: totalFiles}, (_, i) => {
        const num = String(i + 1).padStart(4, '0')
        return `${PREFIX}file-${num}.js`
    })

    return {
        name: 'virtual-files-modules',

        resolveId(id) {
            if (id === INDEX_ID) return id
            if (id.startsWith(PREFIX)) return id
            return null
        },

        load(id) {
            if (id === INDEX_ID) {
                const imports = ids.map((p) => `import '${p}';`).join('\n')
                return `// Auto-generated \n${imports}\n`
            }

            if (id.startsWith(PREFIX)) {
                const idx = ids.indexOf(id)
                const label = idx >= 0 ? `file-${String(idx + 1).padStart(4, '0')}` : id.slice(PREFIX.length)
                return `// Auto-generated ${label}\nexport const id = '${label}';\nexport default id;\n //${Array(fileCharacters).join()}`
            }

            return null
        },
        transformIndexHtml(html) {
            if (typeof html === 'string' && html.includes("virtual:gen/index.js")) {
                return html
            }
            return {
                tags: [
                    {
                        tag: 'script',
                        attrs: {
                            src: '/virtual:gen/index.js',
                            type: 'module',
                        },
                        injectTo: 'head',
                    },
                ],
            }
        },
    }
}

export default defineConfig({
    plugins: [
        mkcert(),
        react(),
        virtualFilesPlugin({
            totalFiles: 3000,
            fileCharacters: 50_000,
        }),
    ],
    server: {
      https: true,
      // WA for the issue from Vite
      //  https://github.com/vitejs/vite/pull/21024
      // {
      //     streamResetBurst: 100000,
      //     streamResetRate: 33,
      // },
    },
})
