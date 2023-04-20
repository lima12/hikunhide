// ==UserScript==
// @name         hikunhide
// @namespace    hikunhide
// @version      1.2
// @description  Removes the ng-hide class from a specific element on Metrodist CMS pages.
// @exclude      https://cms1.metrodist.net/#/portal
// @exclude      https://cms2.metrodist.net/#/portal
// @exclude      https://cms3.metrodist.net/#/portal
// @exclude      https://rsm.metrodist.net/#/portal
// @exclude      107.0.13.226/#/portal
// @exclude      107.0.13.228/#/portal
// @exclude      107.0.13.229/#/portal
// @exclude      107.0.13.227/#/portal
// @match        107.0.13.226/*
// @match        107.0.13.228/*
// @match        107.0.13.229/*
// @match        107.0.13.227/*
// @match        https://cms1.metrodist.net/*
// @match        https://cms2.metrodist.net/*
// @match        https://cms3.metrodist.net/*
// @match        https://rsm.metrodist.net/*
// @run-at       document-end
// @icon         https://www.google.com/s2/favicons?sz=64&domain=metrodist.net
// @require      https://gist.githubusercontent.com/BrockA/2625891/raw/9c97aa67ff9c5d56be34a55ad6c18a314e5eb548/waitForKeyElements.js
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @updateURL    https://raw.githubusercontent.com/lima12/hikunhide/main/hikunhide.js
// @grant        none
// ==/UserScript==
/* globals jQuery, waitForKeyElements */

(function() {
    'use strict';

    var footer = document.createElement('div');
    footer.style.position = 'fixed';
    footer.style.bottom = '0';
    footer.style.left = '0';
    footer.style.right = '0';
    footer.style.backgroundColor = '#F44336';
    footer.style.color = '#FFF';
    footer.style.padding = '5px';
    footer.style.fontFamily = 'Helvetica';
    document.body.appendChild(footer);

    var isModified = false;
    var countdown = 30;

    function modifyElement() {
        const node = document.querySelector('.ellipsis.menu.menu-2.collapsed[name="user"]');
        if (node && node.classList.contains('ng-hide')) {
            console.log('Removing ng-hide class from element:', node);
            node.classList.remove('ng-hide');
            isModified = true;
        }
    }

    function checkElement() {
        const node = document.querySelector('.ellipsis.menu.menu-2.collapsed[name="user"]');
        if (node) {
            if (!isModified) {
                console.log('Element found, removing ng-hide class from element on Metrodist CMS pages...');
                modifyElement();
                footer.innerHTML = 'Tampermonkey is running. Removing ng-hide class from element in 30 seconds. - developed by William Le';
                countdown = 30;
            } else {
                console.log('Element already modified, skipping...');
                footer.innerHTML = 'Tampermonkey is running. Element already modified. - developed by William Le';
            }
        } else {
            console.log('Element not found, retrying in 30 seconds...');
            footer.innerHTML = 'Tampermonkey is running. Element not found. Retrying in ' + countdown + ' seconds. - developed by William Le';
        }
        countdown--;
    }

    function forceLoad() {
        console.log('Forcing element load...');
        footer.innerHTML = 'Tampermonkey is running. Forcing element load... - developed by William Le';
        modifyElement();
        countdown = 30;
    }

    console.log('Repeating script every 10 seconds to check for element and remove ng-hide class from element on Metrodist CMS pages...');
    setInterval(function() {
        checkElement();
    }, 10000);

    var button = document.createElement('button');
    button.innerHTML = 'Force Load';
    button.style.position = 'fixed';
    button.style.bottom = '50px';
    button.style.left = '50px';
    button.style.padding = '10px';
    button.style.fontSize = '16px';
    button.style.backgroundColor = '#F44336';
    button.style.color = '#FFF';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';
    button.onclick = forceLoad;
    button.style.fontFamily = 'Helvetica';
    document.body.appendChild(button);
})();