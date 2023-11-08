'use strict';

// setup
chrome.runtime.onInstalled.addListener(details => {
    // pinch in settings
    if (details.reason === 'install') {
        // configure default memory
        const defaultSettings = {
            advanced: 0,
            mode: 0,
            speed: 1,
            speedCustom: 0.4,
            mult: 0.4,
            smoothness: 1,
            smoothnessCustom: 4,
            steps: 4,

            fixTouchpadScroll: true,
            fixTouchpadScrollThreshold: 30,
            fixFixed: true,
            fixFixedTransparency: true,
            fixAbsolute: true,
            fixAbsoluteBorder: false
        };

        chrome.storage.sync.get(Object.keys(defaultSettings), items => {
            if (chrome.runtime.lastError) console.error(chrome.runtime.lastError);
            else {
                Object.keys(defaultSettings).forEach(key => {
                    if (items[key] === undefined) {
                        const object = {};
                        object[key] = defaultSettings[key];
                        chrome.storage.sync.set(object);
                    }
                });
            }
        });
    }

    // oxford context settings
    chrome.contextMenus.create({
        title:"Look for : %s",
        contexts: ["selection"],
        onclick: chrome.contextMenus.onClicked.addListener(lookUpOxford),
        id:"oxford_dictionary"
    })
});


function lookUpOxford(info,tab) {
    if(info){
        var token=info.selectionText;
        var oxfordUrl = 'https://www.oxfordlearnersdictionaries.com/search/english/?q='+token;
        lookUpSelection(token, oxfordUrl);
    }     
}

function lookUpSelection(text, url){
    if(text){
        var w = 550;
        var h = 500;
        var width=1024, height=720;
        var left = (width-w/2)+w/2;
        var top = (height/2)-h/2;
        var cur_window = chrome.windows.create({'url': url, 
            'type': 'popup',
            'width': w,
            'height': h,
            'left': left, 
            'top': top }, function(window) {}
            );
    }  
}
