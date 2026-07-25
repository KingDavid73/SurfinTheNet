module.exports = {
  packagerConfig: {
    asar: {
      unpack: "**/node_modules/@node-llama-cpp/**/*"
    },
    extraResource: [
      "models",
      "personas"
    ],
    ignore: [
      /^\/artifacts($|\/)/,
      /^\/artwork($|\/)/,
      /^\/assets($|\/)/,
      /^\/docs($|\/)/,
      /^\/out($|\/)/,
      /^\/src($|\/)/,
      /^\/scripts($|\/)/,
      /^\/songs($|\/)/,
      /^\/models($|\/)/,
      /^\/personas($|\/)/,
      /^\/node_modules\/@node-llama-cpp\/win-arm64($|\/)/,
      /^\/\.git($|\/)/,
      /^\/save\.json$/,
      /^\/(?:MUSIC_INDEX\.txt|tsconfig\.json|vite\.config\.ts|package-lock\.json|forge\.config\.cjs)$/
    ]
  },
  makers: [
    {
      name: "@electron-forge/maker-zip",
      platforms: ["win32", "darwin", "linux"]
    }
  ]
};
