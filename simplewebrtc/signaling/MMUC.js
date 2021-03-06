"use strict";
// --------------------------------------------------------------------
// Our custom XMPP extensions for MMUC + DataChannels
// --------------------------------------------------------------------
Object.defineProperty(exports, "__esModule", { value: true });
var MMUC_NS = 'http://andyet.net/xmlns/mmuc';
var TALKY_CORE_NS = 'https://talky.io/ns/core';
var TALKY_CORE_DATACHANNEL = 'https://talky.io/ns/datachannel';
function default_1(client, stanza) {
    var types = stanza.utils;
    var TalkyCoreUser = stanza.define({
        element: 'user',
        fields: {
            customerData: {
                get: function () {
                    var data = types.getText(this.xml);
                    if (data) {
                        return JSON.parse(data);
                    }
                    return {};
                }
            },
            roomId: types.attribute('rid'),
            sessionId: types.attribute('sid'),
            type: types.attribute('type')
        },
        name: 'talkyUserInfo',
        namespace: TALKY_CORE_NS
    });
    var MediaStream = stanza.define({
        element: 'mediastream',
        fields: {
            audio: types.attribute('audio'),
            msid: types.attribute('msid'),
            video: types.attribute('video')
        },
        name: '_mediaStream',
        namespace: MMUC_NS
    });
    var ScreenCapture = stanza.define({
        element: 'screen',
        fields: {
            id: types.attribute('id')
        },
        name: '_screenCapture',
        namespace: TALKY_CORE_NS
    });
    var DataChannel = stanza.define({
        element: 'description',
        fields: {
            applicationType: { value: 'datachannel' }
        },
        name: '_datachannel',
        namespace: TALKY_CORE_DATACHANNEL,
        tags: ['jingle-application']
    });
    var Conference = stanza.define({
        element: 'conf',
        fields: {
            bridged: types.boolAttribute('bridged'),
            lastN: types.numberAttribute('last-n'),
            media: types.attribute('media')
        },
        name: 'mmuc',
        namespace: MMUC_NS
    });
    var Status = stanza.define({
        element: 'status',
        fields: {
            active: types.boolAttribute('active'),
            media: types.attribute('media'),
            mode: types.attribute('mode'),
            ready: types.boolAttribute('ready'),
            recordable: types.boolAttribute('recordable'),
            stamp: types.dateAttribute('stamp')
        },
        name: 'mmucStatus',
        namespace: MMUC_NS
    });
    var RecordingStatus = stanza.define({
        element: 'recording',
        fields: {
            active: types.boolAttribute('active'),
            stamp: types.dateAttribute('stamp'),
            state: types.attribute('state'),
            uri: types.attribute('uri')
        },
        name: 'recording',
        namespace: MMUC_NS
    });
    var ParticipantState = stanza.define({
        element: 'state',
        fields: {
            speaking: types.boolAttribute('speaking')
        },
        name: 'mmuc',
        namespace: MMUC_NS
    });
    var CallControl = stanza.define({
        element: 'query',
        fields: {
            endMedia: types.boolSub(MMUC_NS, 'end-media'),
            startRecord: types.boolSub(MMUC_NS, 'start-recording')
        },
        name: 'mmuc',
        namespace: MMUC_NS
    });
    var StartCall = stanza.define({
        element: 'start-media',
        fields: {
            media: types.attribute('media')
        },
        name: 'startMedia',
        namespace: MMUC_NS
    });
    var EndRecord = stanza.define({
        element: 'end-recording',
        fields: {
            uri: types.attribute('uri')
        },
        name: 'endRecord',
        namespace: MMUC_NS
    });
    stanza.extend(Status, RecordingStatus);
    stanza.extend(CallControl, StartCall);
    stanza.extend(CallControl, EndRecord);
    stanza.withPresence(function (Presence) {
        stanza.extend(Presence, Conference);
        stanza.extend(Presence, MediaStream, 'mediaStreams');
        stanza.extend(Presence, TalkyCoreUser);
    });
    stanza.withMessage(function (Message) {
        stanza.extend(Message, Status);
        stanza.extend(Message, ParticipantState);
    });
    stanza.withIQ(function (IQ) {
        stanza.extend(IQ, CallControl);
    });
    stanza.withDefinition('content', 'urn:xmpp:jingle:1', function (Content) {
        stanza.extend(Content, DataChannel);
    });
    stanza.withDefinition('description', 'urn:xmpp:jingle:apps:rtp:1', function (RTP) {
        stanza.extend(RTP, ScreenCapture, 'screenCaptures');
    });
    stanza.withDefinition('jingle', 'urn:xmpp:jingle:1', function (Jingle) {
        stanza.extend(Jingle, MediaStream, 'mediaStreams');
    });
}
exports.default = default_1;
