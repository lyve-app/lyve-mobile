![lyve logo](https://raw.githubusercontent.com/lyve-app/lyve-backend/main/assets/lyve_logo.svg)

## About the Project

> This is the mobile frontend codebase of the lyve platform

Lyve is a livestreaming platform where users can create and watch livestreams. Viewers can engage with streamers through chat and by sending rewards, fostering a lively and interactive community. Lyve enhances the experience with gamification, offering achievements and promotion points that help streamers gain more visibility on the platform.

### Techstack

- TypeScript
- React-Native
- Expo
- Tamagui

## Getting Started

### Prerequisites

This project uses Yarn as package manager

```bash
 npm install --global yarn
```

### Installation

```bash
  yarn install
```

### Run Locally

> Note that the codebase uses development builds instead of Expo Go

To run the App locally please refer first to [Introduction to development builds](https://docs.expo.dev/develop/development-builds/introduction/#what-is-expo-dev-client)

#### Run Ios

```bash
  yarn ios:native
```

#### Run Android

```bash
  yarn android:native
```

### Run Tests

```bash
  yarn test
```

## Environment Variables

```yml
EXPO_PUBLIC_KEYCLOAK_REALM_URL=
EXPO_PUBLIC_KEYCLOAK_CLIENT_ID=

EXPO_PUBLIC_API_URL=

EXPO_PUBLIC_ANDROID_GIPHY_API_KEY=
EXPO_PUBLIC_IOS_GIPHY_API_KEY=
```

## Contributing

<a href="https://github.com/orgs/lyve-app/lyve-mobile/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=lyve-app/lyve-mobile" />
</a>