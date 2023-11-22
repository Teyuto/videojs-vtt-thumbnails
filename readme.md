# VTT Thumbnails Plugin for Video.js

The VTT Thumbnails plugin is a Video.js plugin that allows you to display thumbnails from a sprite image on the progress bar of your video player.

## Compatibility

This plugin version is compatible with Video.js v8.x.

## Getting Started

### Prerequisites

Make sure you have [Video.js](https://videojs.com/) installed in your project before using this plugin.

### Installation

Include the Video.js library and the `videojs-vtt-thumbnails` files in your HTML file:

```html
<!-- VTT Thumbnails plugin -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Teyuto/videojs-vtt-thumbnails/src/videojs-vtt-thumbnails.css">
<script src="https://cdn.jsdelivr.net/gh/Teyuto/videojs-vtt-thumbnails/src/videojs-vtt-thumbnails.js"></script>
```

### Usage

Initialize Video.js as you normally would and add the VTT Thumbnails plugin:

```javascript
// Create a video player
var player = videojs('video');

// Add VTT Thumbnails plugin by vttData Url
player.vttThumbnails({
    spriteUrl: 'path/to/sprite.jpg',
    vttData: 'path/to/thumbnails.vtt'
});

// Add VTT Thumbnails plugin by vttData String
player.vttThumbnails({
    spriteUrl: 'path/to/sprite.jpg',
    vttData:`1
            00:00:00,000 --> 00:00:05,000
            sprite.jpg#xywh=0,0,100,67
            
            2
            00:00:05,000 --> 00:00:10,000
            sprite.jpg#xywh=100,0,100,67
            
            3
            00:00:10,000 --> 00:00:15,000
            sprite.jpg#xywh=200,0,100,67
            `;
});
```

Make sure to replace `'video'`, `'path/to/sprite.jpg'`, and `'path/to/thumbnails.vtt'` with your actual video player ID, sprite image path, and VTT data path.

## Options

- `spriteUrl`: URL/path to the sprite image.
- `vttData`: URL/path to the VTT file containing thumbnail data or VTT string data.

## Example
Check the `example/index.html` file for a working example.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

---