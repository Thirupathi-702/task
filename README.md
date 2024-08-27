
## deployment link ```https://task-samespace.vercel.app/ ```
# Music Player UI

Welcome to the Music Player UI project! This project is a frontend assessment task to create a responsive music player interface using React.js.

## Table of Contents

- [Design Link](#design-link)
- [API](#api)
- [Requirements](#requirements)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Deployment](https://task-samespace.vercel.app/)



## Design Link

The design for the Music Player UI can be found [here](https://www.figma.com/file/RtKhzEeeuD2FtRsg2dxSe/p/Front-end-Assessment?type=design&node-id=1-2&mode=design&t=zEkwOdYyaeNx0z7m-4).

## API

The application uses the following API to load song data:
- **Endpoint:** `https://cms.samespace.com/items/songs`

**Note:** The API will return different titles, artists, cover images, and durations, but the URL for every song will be the same.

**Image URL Format:** 
```
https://cms.samespace.com/assets/{COVER_IMAGE_ID}
```

## Requirements

1. Use React.js for the implementation.
2. The interface must match the provided design.
3. The application should be responsive. On smaller screens, the player component should be the main interface with a menu button to show the list of songs.
4. Use REST API to load list data.
5. Fetch images based on the "cover" key from the API.
6. Music should continue playing if the user switches to another tab.
7. Background gradient color should change according to the cover image of the song, as shown in the design.
8. The interface should be fluid and interactive with animations/transitions, such as list loading animation and background color change animation.
9. Submit the GitHub repository link and, if possible, deploy a working demo.

## Features

- **Search:** Search through the list of songs.
- **Music Control:** Play, pause, skip to the next or previous song.
- **Tab Navigation:** Switch between different tabs, e.g., For You and Top Tracks.
- **Seeker Control:** Adjust music playback position using a seeker.

## Installation

To get started with the project, clone the repository and install the dependencies:

```bash
git clone https://github.com/yourusername/music-player-ui.git
cd music-player-ui
npm install
```

## Usage

To run the application locally:

```bash
npm start
```

This will start the development server and open the application in your default browser.

## Deployment

The application is deployed on Vercel. You can access the working demo [here](https://task-samespace.vercel.app/).
