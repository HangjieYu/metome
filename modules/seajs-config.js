/* eslint-disable max-len */
seajs.config({
    base: '/',
    preload: [
      Function.prototype.bind ? '' : 'es5Safe',
      window.JSON ? '' : 'json',
    ],
    alias: {
        'main': 'modules/public/main/main',
        /* common*/
        'util': 'modules/common/util.js',
        /* uicontrol*/
        'emotion': 'modules/uicontrol/emotion/emotion',
        'twemoji': 'modules/uicontrol/twemoji/twemoji',
        'dot': 'modules/uicontrol/doT/doT.js'
    },
    map: [
       [/^(.*\.(?:css|js|htm|html))(\?.*)?$/i, '$1?2016']
    ]
});
