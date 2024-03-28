import '@testing-library/jest-dom';

class MockWebSocket {
  onopen = null;
  onmessage = null;
  onerror = null;
  onclose = null;

  eventListeners = {
    open: [],
    message: [],
    error: [],
    close: [],
  };

  constructor(url) {
    setTimeout(() => this.triggerEvent('open'));
  }

  addEventListener(event, callback) {
    if (this.eventListeners[event]) {
      this.eventListeners[event].push(callback);
    }
  }

  triggerEvent(event, data) {
    if (this.eventListeners[event]) {
      this.eventListeners[event].forEach((callback) => callback(data));
    }
  }

  send() {}

  close() {
    this.triggerEvent('close');
  }
}

global.WebSocket = MockWebSocket;