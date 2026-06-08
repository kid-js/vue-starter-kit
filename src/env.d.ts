interface ImportMetaEnv {
  readonly VITE_BASE_URL: string
  readonly VITE_API_BASE_URL: string
  readonly VITE_API_BASE_URL_AUTH: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
