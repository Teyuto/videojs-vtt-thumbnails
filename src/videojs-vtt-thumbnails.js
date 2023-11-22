(function (videojs) {
    var registerPlugin = videojs.registerPlugin || videojs.plugin;

    function vttThumbnails(options) {
        var player = this;

        var thumbnailContainer = document.createElement('div');
        thumbnailContainer.className = 'thumbnail-preview';

        player.el().appendChild(thumbnailContainer);

        function createThumbnails(spriteUrl, vttData) {
            if (vttData === undefined) {
                console.error('vttData is undefined');
                return;
            }

            if (typeof vttData === 'string') {
                processVttData(spriteUrl, vttData);
            } else if (typeof vttData === 'object' && vttData.url) {
                fetch(vttData.url)
                    .then(response => response.text())
                    .then(data => processVttData(spriteUrl, data))
                    .catch(error => console.error('Error fetching VTT data:', error));
            } else {
                console.error('Invalid vttData format');
            }
        }

        function processVttData(spriteUrl, vttData) {
            console.log(vttData);
            const lines = vttData.split('\n');
            let index = 0;

            while (index < lines.length) {
                const line = lines[index].trim();
                if (line !== '') {
                    const matchTime = line.match(/(\d+:\d+:\d+,\d+) --> (\d+:\d+:\d+,\d+)/);
                    if (matchTime) {
                        const [, startTime, endTime] = matchTime;
                        const xywhLine = lines[index + 1];
                        const matchXYWH = xywhLine.match(/#xywh=(\d+),(\d+),(\d+),(\d+)/);
                        if (matchXYWH) {
                            const [, x, y, width, height] = matchXYWH;
                            createThumbnail(spriteUrl, parseVttTime(startTime), x, y, width, height);
                        }
                    }
                }
                index += 1;
            }
        }

        function createThumbnail(spriteUrl, startTime, x, y, width, height) {
            const thumbnail = document.createElement('div');
            thumbnail.className = 'thumbnail';
            thumbnail.dataset.startTime = startTime;

            const percentage = startTime / player.duration();
            const progressBar = player.controlBar.progressControl.el();
            const barRect = progressBar.getBoundingClientRect();
            thumbnail.style.left = `${barRect.width * percentage}px`;

            thumbnail.style.backgroundImage = `url(${spriteUrl})`;
            thumbnail.style.backgroundPosition = `-${x}px -${y}px`;
            thumbnail.style.width = `${width}px`;
            thumbnail.style.height = `${height}px`;
            thumbnailContainer.appendChild(thumbnail);
        }

        function parseVttTime(timeString) {
            const match = timeString.match(/(\d+:\d+:\d+,\d+)/);

            if (match) {
                const [fullMatch] = match;
                const timeArray = fullMatch.split(':').map(parseFloat);

                if (Array.isArray(timeArray) && timeArray.length === 3) {
                    const [hours, minutes, seconds] = timeArray;
                    return hours * 3600 + minutes * 60 + seconds;
                } else {
                    console.error('Error format VTT:', timeString);
                    return 0;
                }
            } else {
                console.error('Error format VTT:', timeString);
                return 0;
            }
        }

        createThumbnails(options.spriteUrl, options.vttData);

        player.controlBar.progressControl.on('mousemove', function (e) {
            const progressBar = player.controlBar.progressControl.el();
            const barRect = progressBar.getBoundingClientRect();
            const percentage = (e.clientX - barRect.left) / barRect.width;
            const time = percentage * player.duration();

            document.querySelectorAll('.thumbnail').forEach(thumbnail => {
                thumbnail.style.display = 'none';
            });

            const closestThumbnail = findClosestThumbnail(time);
            if (closestThumbnail) {
                closestThumbnail.style.display = 'block';
            }

            thumbnailContainer.style.left = e.pageX + 'px';
            thumbnailContainer.style.display = 'block';
        });

        player.controlBar.progressControl.on('mouseleave', function () {
            thumbnailContainer.style.display = 'none';
        });

        function findClosestThumbnail(time) {
            const thumbnails = document.querySelectorAll('.thumbnail');
            let closestThumbnail = null;
            let minDifference = Infinity;

            thumbnails.forEach(thumbnail => {
                const thumbnailTime = parseFloat(thumbnail.dataset.startTime);
                const difference = Math.abs(thumbnailTime - time);

                if (difference < minDifference) {
                    minDifference = difference;
                    closestThumbnail = thumbnail;
                }
            });

            return closestThumbnail;
        }
    }

    registerPlugin('vttThumbnails', vttThumbnails);
})(window.videojs);