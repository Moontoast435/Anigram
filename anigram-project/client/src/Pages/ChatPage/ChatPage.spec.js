/**
 * @jest-environment jsdom
 */

import React from 'react'
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event';
import 'core-js'
const { createServer } = require("http");
import {default as ChatPage} from './index'
import WS from "jest-websocket-mock"


describe('Testing the quizroom page', () => {

    // let io, serverSocket, clientSocket, clientEndpoint;
    const testfunc = jest.fn()
    let ws

    // beforeAll((done) => {
    //     const httpServer = createServer();
    //     io = new Server(httpServer);
    //     httpServer.listen(() => {
    //       const port = httpServer.address().port;
    //       clientSocket = new Client(`http://localhost:${port}`);
    //       clientEndpoint = `http://localhost:${port}`
    //       io.on("connection", (socket) => {
    //         serverSocket = socket;
    //       });
    //       clientSocket.on("connect", done);
    //     });
    //   });
    
      

    //   beforeEach(() => {
    //     let initState = { isAuthenticated: true, username: "mattr" };
    //     renderWithReduxProvider(<ChatPage />, { initState });
    // });

    // afterAll(() => {
    //     io.close();
    //     clientSocket.close();
    //   });

    beforeEach(() => {
        ws = new WS("ws://127.0.0.1:8000/ws/ac/", { jsonProtocol: true });
    });
    afterEach(() => {
        WS.clean()
      });

    it('the div for the page is rendered at the start', ()=>{
        let initState = {};
        renderWithReduxProvider(<ChatPage />, { initState });
        let chatPageDiv = screen.getByRole('chatPage')
        expect(chatPageDiv).toBeInTheDocument()
    })

    it('connects to the websocket server on startup', async () => {
        let initState = {auth: {isAuthenticated: true}, profile: { username: "mattr"}};
        renderWithReduxProvider(<ChatPage />, { initState });
        await ws.connected
        
        await expect(ws).toReceiveMessage(({"type": "online", "username": "mattr"}));
        await expect(ws).toReceiveMessage(({"type": "getList"}));
    })

    it('displays a list of open conversations for the user to select from', async () => {
        let initState = {auth: {isAuthenticated: true}, profile: { username: "mattr"}};
        renderWithReduxProvider(<ChatPage />, { initState });
        await ws.connected
        const mock_data = [["seanm"], ["marina"], ["testUser"]]
        await ws.send({ type: "set_list", data: mock_data });
        let chatList = screen.getByRole("chatList")
        expect(chatList).toBeInTheDocument()
        expect(chatList.children.length).toEqual(mock_data.length + 1)
    })

    it('Opens a selected chat and displays the log of messages', async () => {
        let initState = {auth: {isAuthenticated: true}, profile: { username: "mattr"}};
        renderWithReduxProvider(<ChatPage />, { initState });
        await ws.connected
        const mock_data = [{'id': 9, 'sender': 'mattr', 'recipient': 'Kate Bush', 'message': 'Hello?', 'date': '2022-09-07 12:10:29.894310'}, {'id': 10, 'sender': 'mattr', 'recipient': 'Kate Bush', 'message': 'For the record I was a fan before strange things', 'date': '2022-09-07 12:10:37.273186'}, {'id': 11, 'sender': 'Kate Bush', 'recipient': 'mattr', 'message': 'Who?', 'date': '2022-09-07 12:24:55.270246'}]
        await ws.send({ type: "set_log", data: mock_data });
        let chatLog = screen.getByRole("chatLog")
        expect(chatLog).toBeInTheDocument()
        expect(chatLog.children.length).toEqual(mock_data.length + 2)
    })

    it('Opens a selected chat and displays the log of messages', async () => {
        let initState = {auth: {isAuthenticated: true}, profile: { username: "mattr"}};
        renderWithReduxProvider(<ChatPage />, { initState });
        await ws.connected
        const mock_data = [["seanm"], ["marina"], ["testUser"]]
        await ws.send({ type: "set_list", data: mock_data });
        let createChatBtn = screen.getByText('Start new chat')
       expect(createChatBtn).toBeInTheDocument()
    })

    // [{'id': 9, 'sender': 'mattr', 'recipient': 'Kate Bush', 'message': 'Hello?', 'date': '2022-09-07 12:10:29.894310'}, {'id': 10, 'sender': 'mattr', 'recipient': 'Kate Bush', 'message': 'For the record I was a fan before strange things', 'date': '2022-09-07 12:10:37.273186'}, {'id': 11, 'sender': 'Kate Bush', 'recipient': 'mattr', 'message': 'Who?', 'date': '2022-09-07 12:24:55.270246'}]

    





    // it('should have access to the test username set up in the test environment', ()=>{
    //     let initState = {auth: {isAuthenticated: true, username: "mattr"}};
    //     renderWithReduxProvider(<ChatPage />, { initState });
    //     let headerName = screen.getByRole('h1-user')
    //     expect(headerName).toBeInTheDocument()
    //     expect(headerName.textContent).toEqual('mattr')
    // })

    

    // it("should work with sockets", (done) => {
    //     clientSocket.on("host-user", () => {
    //         expect(2+2).toBe(4);
    //         done();
    //     });
    //     serverSocket.emit("host-user");
    // });

    // it("should pass a question object inside the next question event", (done) => {
    // let mockQuestion = {incorrect_answers: ["1","2","3"], correct_answer: "4"}
    // clientSocket.on("next-question", (arg) => {
    //     expect(arg).toEqual({nextQuestion:mockQuestion})
    //     done();
    // });
    // io.emit('next-question', {nextQuestion:mockQuestion})
    
    // });

    //   it('new-user event will be sent upon entering a username', (done)=>{
    //     clientSocket.on("new-user", (arg) => {
    //         expect(arg).toEqual({userList: ["testUser"]})
    //         done()
    //     });
    //     let usernameInput = screen.getByRole('textbox')
    //     expect(usernameInput).toBeInTheDocument()
    //     userEvent.type(usernameInput, 'testUser')
    //     let submitBtn = screen.getByRole('button')
    //     userEvent.click(submitBtn)     
    //     io.emit('new-user', {userList: ["testUser"]})
    // })

})
