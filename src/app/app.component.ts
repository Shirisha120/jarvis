import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Jarvis Voice Assistant';
  output = 'Say something...';
  response: string | null = null;

  recognition: any;
  synth = window.speechSynthesis;
  constructor() {
    // Initialize speech recognition
    const { webkitSpeechRecognition } = window as any;
    this.recognition = new webkitSpeechRecognition();
    this.recognition.lang = 'en-US';
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 1;

    this.recognition.onresult = (event: any) => {
      const speechResult = event.results[0][0].transcript.toLowerCase();
      this.output = `You said: ${speechResult}`;
      this.respondToCommand(speechResult);
    };

    this.recognition.onspeechend = () => {
      this.recognition.stop();
    };

    this.recognition.onerror = (event: any) => {
      this.output = `Error occurred in recognition: ${event.error}`;
    };
  }

  startListening() {
    this.output = 'Listening...';
    this.recognition.start();
  }
  
  respondToCommand(command: string) {
    let response = '';

    if (command.includes('hello')) {
      response = 'Hello, how can I assist you today?';
    } else if (command.includes('time')) {
      response = `The current time is ${new Date().toLocaleTimeString()}`;
    } else if (command.includes('date')) {
      response = `Today is ${new Date().toLocaleDateString()}`;
    } else if (command.includes('how are you')) {
      response = "I'm just a program, but thanks for asking!";
    } else {
      response = "Sorry, I didn't understand that.";
    }

    this.speak(response);
  }
  speak(text: string) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    this.synth.speak(utterance);
  }
}
