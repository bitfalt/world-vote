/// <reference types="astro/client" />

interface ImportMetaEnv {
    readonly XATA_APY_KEY: string
    readonly XATA_BRANCH?: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
