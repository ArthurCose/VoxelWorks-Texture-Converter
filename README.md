# Minecraft -> VoxelWorks Texture Pack Converter

Converts Minecraft 1.13+ resource packs to VoxelWorks terrain atlases. Defaults make use of the latest textures, anything lower will need to customize the output to fill in blanks.

## Building

- Install the latest LTS of NodeJS with npm
- Run `npm install` in the project folder to download dependencies
- Run `npm build`
  - Files will be generated in `dist` for GitHub Pages

# Development

- Make sure to complete the Building section once to have the necessary files to run
- Run `npm start` to start a hot reloading test server

## Usage

- The release should include an html file that can be opened in any of the latest browsers
- Select a Minecraft client jar or resource pack with the file chooser
- Terrain file should generate on the right, right click + `Save as` to save
  - Make sure to follow VoxelWorks naming format: "terrain_blocks\_`NAME`.png" and place in a folder named `VoxelWorksQuest` on your Oculus Quest
- You can use the dropdowns to customize the output, and select the Render button to apply
