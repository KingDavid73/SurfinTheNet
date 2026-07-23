module.exports = {
  packagerConfig: {
    asar: true,
    ignore: [
      /^\/artifacts($|\/)/,
      /^\/out($|\/)/,
      /^\/src($|\/)/,
      /^\/node_modules($|\/)/,
      /^\/\.git($|\/)/,
      /^\/(?:tsconfig\.json|vite\.config\.ts|package-lock\.json|forge\.config\.cjs)$/
    ]
  },
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: { name: "surfin_the_net" }
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin", "linux"]
    }
  ]
};
