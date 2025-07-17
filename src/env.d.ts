/// <reference types="vite/client" />

interface ImportMetaEnv {
      readonly VITE_BSC_TESTNET_CONTRACT: '0x04CA166F3E38EE18deD480BaA6Bb3fC9c98a59c6'
    readonly VITE_HEDERA_TESTNET_CONTRACT: '0xcE48924fE33B1dCD0c4CFbB3Cc99149a18CA439E'
    readonly PINATA_API_KEY: '21a10388defc5da67527'
    readonly PINATA_SECRET_KEY: 'b0b3f94e5ad0869da9ffeef4d45de0e86897c54362a572999534e1eb9e94fc48'
    // more env variables...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }