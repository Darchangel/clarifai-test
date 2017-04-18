# Clarifai test

Tests the clarifai image recognition API

## Dependencies

- NodeJS

---

- Clarifai
- Lodash

The dependencies are included in the `package.json` file, just use `npm install` to install them.

## Usage

First, go to `clarifai.js` and replace `YOUR_CLARIFAI_CLIENT_ID` and `YOUR_CLARIFAI_CLIENT_SECRET` for your respective API client ID and secret.

Then, in the command line, run `node clarifai.js <url_or_image> <keyword>`

The arguments are:
- `<url_or_image>`: Url of an image, or (relative) path to an image file. This is the image that will be uploaded and recognized.
- `<keyword>`: Keyword to match against the keywords returned for the image.
