/// <reference types="astro/client" />

interface ImportMetaEnv {
    readonly XATA_API_KEY: string
    readonly XATA_BRANCH?: string
    readonly THIRDWEB_SECRET_KEY: string
    readonly THIRDWEB_CLIENT_ID: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
