import { createElement } from 'lwc'; // this function is only avaliable in test files
import MeetingRooms from 'c/meetingRooms';

describe("c-meetingRooms", () => {
    afterEach(() => {
        while(document.body.firstChild) document.body.removeChild(document.body.firstChild);
    });
    it('count of meeting room sholud be 7', () => {
        const meetingRooms = createElement('c-meetingRooms', {is: MeetingRooms});
        document.body.appendChild(meetingRooms);
        const allMeetingRoomComponents = meetingRooms.shadowRoot.querySelectorAll('c-meeting-room');
        expect(allMeetingRoomComponents.length).toBe(7);
    });
    it('title should be Meeting Rooms', () => {
        const meetingRooms = createElement('c-meetingRooms', {is: MeetingRooms});
        document.body.appendChild(meetingRooms);
        const lightningCard = meetingRooms.shadowRoot.querySelector('lightning-card');
        expect(lightningCard.title).toBe('Meeting Rooms');
    })
})