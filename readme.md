# VTT Thumbnails Plugin for Video.js

The VTT Thumbnails plugin is a Video.js plugin that allows you to display thumbnails from a sprite image on the progress bar of your video player.

## Compatibility

This plugin version is compatible with Video.js v8.x.

## Getting Started

### Prerequisites

Make sure you have [Video.js](https://videojs.com/) installed in your project before using this plugin.

### Installation

Include the Video.js library and the `videojs-vtt-thumbnails.js` file in your HTML file:

```html
<!-- Video.js CSS -->
<link rel="stylesheet" href="https://unpkg.com/video.js/dist/video-js.css">

<!-- Video.js library -->
<script src="https://unpkg.com/video.js/dist/video.js"></script>

<!-- VTT Thumbnails plugin -->
<script src="path/to/vtt-thumbnails.js"></script>
```

### Usage

Initialize Video.js as you normally would and add the VTT Thumbnails plugin:

```javascript
// Create a video player
var player = videojs('video');

// Add VTT Thumbnails plugin
player.vttThumbnails({
    spriteUrl: 'path/to/sprite.jpg',
    vttData: 'path/to/thumbnails.vtt'
});
```

Make sure to replace `'video'`, `'path/to/sprite.jpg'`, and `'path/to/thumbnails.vtt'` with your actual video player ID, sprite image path, and VTT data path.

## Options

- `spriteUrl`: URL/path to the sprite image.
- `vttData`: URL/path to the VTT file containing thumbnail data.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

---