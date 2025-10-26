# Pomofy

Interactive web application for workflow management.

[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.14-38B2AC.svg)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-5.0.8-purple.svg)](https://zustand-demo.pmnd.rs/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.23.22-pink.svg)](https://www.framer.com/motion/)
[![@dnd-kit](https://img.shields.io/badge/@dnd--kit-6.3.1-orange.svg)](https://dndkit.com/)
[![React Player](https://img.shields.io/badge/React_Player-2.16.0-red.svg)](https://github.com/cookpete/react-player)

[🇷🇺 Russian](README.ru.md) | [🇺🇸 English](README.md)

## ✨ Features

- **🕒 Pomodoro Timer** - customizable work sessions and breaks with automatic switching
- **📋 Task Tracker** - task management synchronized with timer
- **📊 Kanban Board** - interactive board for task management and workflow visualization
- **🎵 Yandex Music** - built-in player with custom playlist management
- **🎶 Spotify** - built-in player with custom playlist management
- **📺 YouTube** - built-in video player with playlist management and search
- **📝 Sticky Notes** - create and edit notes with Markdown support and customization
- **🔗 Quick Links** - manage collection of useful links with quick access
- **🕐 Clock Widget** - display current time and weather
- **🌈 Dynamic Backgrounds** - choose from various background images and effects
- **🔊 Sound Notifications** - audio signals when switching work modes
- **⚡ Drag & Drop** - intuitive interface element interaction

## 🐳 Deployment with Docker

1. Create a `docker-compose.yml` file.
2. Paste the content below into the file.
3. Add .env to work with Youtube API
4. Run the command: `docker-compose up -d`
5. Open `http://localhost:3000` in your browser.

### docker-compose.yml

```yaml
services:
  pomofy:
    image: esoraine/pomofy-app:latest
    container_name: pomofy-app
    ports:
      - '3000:80'
    restart: always
```

## 🚀 Quick Start

### Requirements

- **Node.js** 18+
- **Bun** (recommended) or **npm**

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd pomofy-app
   ```

2. Install dependencies:

   ```bash
   bun install
   # or
   npm install
   ```

3. Start the development server:

   ```bash
   bun dev
   # or
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 🎯 Main Components

### Timer (TimerWidget)

- Customize Pomodoro session duration
- Choose break type (short/long)
- Automatic mode switching
- Sound notifications
- Display remaining time

### Task Tracker (TaskTrackerWidget)

- Create and manage tasks
- Automatic tracking according to timer

### Kanban Board (KanbanWidget)

- Drag-and-drop task movement between columns and within columns
- Create, edit, and delete tasks with multi-line descriptions
- Minimalist design with quick access to main functions

### Yandex Music (YandexWidget)

- Built-in Yandex Music player
- Create and manage custom playlists

### Spotify (SpotifyWidget)

- Built-in Spotify player
- Create and manage custom playlists

### YouTube (YouTubeWidget)

- Built-in YouTube video player
- Create and manage custom playlists
- Mini-mode for compact viewing
- Keyboard shortcuts (space, arrows, M for mute)
- Search and add videos by query

### Sticky Notes (StickyNotesWidget)

- Create and edit notes on the workspace
- Choose note color from palette
- Resize notes
- Lock notes to prevent accidental editing

### Quick Links (QuickLinksWidget)

- Manage collection of useful links and resources
- Organize links by categories

### Clock Widget (WatchWidget)

- Display current time with support for different time zones
- Weather integration - show temperature and weather conditions for selected city
- Customizable time format (12/24 hours)
- Flexible date format settings with strftime syntax support
- Automatic city detection or manual input

### Workspace (WorkflowPage)

- Adaptive grid for widget placement
- Toggle widget visibility
- Drag and Drop interface

## 🔧 Settings

The application automatically saves user settings in localStorage:

- Widget positions
- Widget settings and data
- Theme preferences
- Selected background
