# trakt-lite on android tv

## Pre-requisites
- Install [Android Studio](https://developer.android.com/studio).
- [Create virtual devices](https://developer.android.com/studio/run/managing-avds) in Android Studio.
  - It is recommended to create both a 1080p TV and a 4K TV.

## Developing

- Start a local development server for Trakt Lite. For more details on how to do that, see:
[README.md](../client/README.md).
- Open this folder in Android Studio.
  - If `Run` is not available, sync the project with the gradle files (in Android Studio `File -> Sync Project with Gradle Files`).
- Select one of your virtual TVs as the device, and `Run`.
  - Note: not physically run, but run in Android Studio.
- For debugging the webview, you can use `chrome://inspect/#devices` in Chrome. See [README.md](../../README.md) for more details.

## Building

TBD