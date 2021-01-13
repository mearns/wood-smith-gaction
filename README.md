# Wood Smith 2 Google Actions Project

## Development

Quick overview: We use Google Actions SDK to define our scenes, intents, types, etc., which is basically
the dialog pattern for the Google Assistant. These are defined pretty much entirely in YAML files in
the `sdk/` directory. Some of these are configured to delegate to a webhook to do some work. We're deploying
firebase functions to serve those webhooks. The entire firebase application is in the `firebase/` directory,
but the webhook functions are defined specifically as "Firebase Functions", under the `firebase/functions/`
directory.

### Deploy Google Actions

```console
$ cd sdk
$ gactions push
```

### Deploy Firebase Functions

```console
$ cd firebase
$ firebase deploy
```

### Run Firebase Locally

```console
$ cd firebase
$ firebase emulate
```
