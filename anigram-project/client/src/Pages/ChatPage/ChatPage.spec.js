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



describe('Testing the quizroom page', () => {
    // let io, serverSocket, clientSocket, clientEndpoint;
    const testfunc = jest.fn()

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

    it('the div for the page is rendered at the start', ()=>{
        let initState = {};
        renderWithReduxProvider(<ChatPage />, { initState });
        let chatPageDiv = screen.getByRole('chatPage')
        expect(chatPageDiv).toBeInTheDocument()
    })

    it('should have access to the test username set up in the test environment', ()=>{
        let initState = {auth: {isAuthenticated: true, username: "mattr"}};
        renderWithReduxProvider(<ChatPage />, { initState });
        let headerName = screen.getByRole('h1-user')
        expect(headerName).toBeInTheDocument()
        expect(headerName.textContent).toEqual('mattr')

    })

    

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
