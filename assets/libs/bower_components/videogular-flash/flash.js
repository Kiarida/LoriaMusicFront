"use strict";
angular.module("info.vietnamcode.nampnq.videogular.plugins.flash", [])
    .directive(
        "vgFlashPlayer", ["$rootScope", "$window", "$timeout",
            function($rootScope, $window, $timeout) {
                return {
                    restrict: "A",
                    require: "^videogular",
                    link: function(scope, elem, attr, API) {
                        var formats = {
                                'video/flv': 'FLV',
                                'video/x-flv': 'FLV',
                                'video/mp4': 'MP4',
                                'video/m4v': 'MP4',
                                'application/x-mpegurl':'m3u8',
                        };
                        var playerId = Date.now();
                        var videoSrc = '';
                        console.log("flahs payer ?");
                        function canPlay(type){
                            return type in formats;
                        }
                        function waitForSWF() {

                            //console.log(API);
                            API.mediaElement = angular.element(document.getElementById("videoPlayer_" + playerId));
                            console.log("Waiting for the SWF to be loaded...");
                            if (API.mediaElement[0].hasOwnProperty("vjs_setProperty")) {
                                setProperties();
                                console.log(API);
                                setSource();
                                console.log(API.mediaElement[0].getduration());
                                console.log(API.mediaElement[0].duration());
                            } else {
                                setTimeout(waitForSWF, 100);
                            }
                        }
                        function setProperties() {
                            API.mediaElement[0].vjs_setProperty("eventProxyFunction", "onSWFEvent");
                            API.mediaElement[0].vjs_setProperty("errorEventProxyFunction", "onSWFErrorEvent");
                            API.mediaElement[0].__defineGetter__("currentTime", function() {
                                return API.mediaElement[0].vjs_getProperty("currentTime");
                            });
                            API.mediaElement[0].__defineSetter__("currentTime", function(seconds) {
                                return API.mediaElement[0].vjs_setProperty("currentTime", seconds);
                            });
                            API.mediaElement[0].__defineGetter__("duration", function() {
                                return API.mediaElement[0].vjs_getProperty("duration");
                            });
                            API.mediaElement[0].__defineGetter__("paused", function() {
                                return API.mediaElement[0].vjs_getProperty("paused");
                            });
                            API.mediaElement[0].__defineGetter__("videoWidth", function() {
                                return API.mediaElement[0].vjs_getProperty("videoWidth");
                            });
                            API.mediaElement[0].__defineGetter__("videoHeight", function() {
                                return API.mediaElement[0].vjs_getProperty("videoHeight");
                            });
                            API.mediaElement[0].__defineGetter__("volume", function() {
                                return API.mediaElement[0].vjs_getProperty("volume");
                            });
                            API.mediaElement[0].__defineSetter__("volume", function(volume) {
                                return API.mediaElement[0].vjs_setProperty("volume", volume);
                            });
                            API.mediaElement[0].play = function() {
                                console.log("play");
                                API.mediaElement[0].vjs_play();
                            }
                            API.mediaElement[0].pause = function() {
                                API.mediaElement[0].vjs_pause();
                            };

                            setInterval(function() {
                                API.onUpdateTime({
                                    target: API.mediaElement[0]
                                })
                            }, 600);
                        }

                        function setSource(e) {
                            API.mediaElement[0].vjs_src("https://webstream-vh.akamaihd.net/i/129/580/712/155/audio.mp4/master.m3u8?rid=71507e5f-7805-413f-9be5-1c866c2628cd-i2-fr-FR-music-asset-location&hdnea=exp=1435916159~acl=/i/129/580/712/155/audio.mp4*~hmac=7feab271f2ec256e7ae6c2dae823c3ea75cd4a8415cf0a4ef931a61a872528ad");
                            API.mediaElement[0].play();
                        }
                        function initPlayer(src){
                            videoSrc = src.toString();
                            elem = API.mediaElement.parent();
                            API.mediaElement = angular.element('<div id="videoPlayer_'+playerId+'"></div>');
                            elem.empty();
                            elem.append(API.mediaElement);
                            console.log(videoSrc);
                            var flashvars = {
                                readyFunction: "onSWFReady",
                                eventProxyFunction: "onSWFEvent",
                                errorEventProxyFunction: "onSWFErrorEvent",
                                src: "",
                                autoplay: true,
                                preload: false
                            };

                            var params = {
                                allowScriptAccess: "always",
                                allowNetworking: "all",
                                wmode: "opaque",
                                bgcolor: "#000000"
                            };
                            $window.swfobject.createCSS(API.mediaElement[0].id, "position: absolute;");
                            $window.swfobject.embedSWF("video-js.swf", API.mediaElement[0].id, "100%", "100%", "10.3", "", flashvars, params);
                            setTimeout(waitForSWF, 100);
                        }
                        function destroyFlashPlayer(){

                        }

                        function onSourceChange(source) {
                            if (canPlay(source.type)) {
                                initPlayer(source.src);
                            } else {
                                destroyFlashPlayer();
                            }
                        }
                        scope.$watch(
                            function() {
                                return API.sources;
                            },
                            function(newVal, oldVal) {
                                onSourceChange(newVal[0]);
                            }
                        );

                    }
                }
            }
        ]);