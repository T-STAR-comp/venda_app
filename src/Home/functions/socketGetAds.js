// Fetch ads via WebSocket from ws://localhost:5000/ws/ads
// Usage: socketGetAds(onAdsReceived)

export function socketGetAds(onAdsReceived) {
  const ws = new WebSocket('ws://localhost:5000/ws/ads');

  ws.onopen = () => {
    // Optionally, you can send a message to the server if needed
    // ws.send(JSON.stringify({ type: 'get_ads' }));
  };

  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      if (onAdsReceived) {
        onAdsReceived(data);
      }
    } catch (err) {
      console.error('Failed to parse ad data from WebSocket:', err);
    }
  };

  ws.onerror = (err) => {
    console.error('WebSocket error:', err);
  };

  ws.onclose = () => {
    // Optionally handle reconnect logic here
    console.warn('WebSocket connection closed');
  };

  return ws; // Return the WebSocket instance for further control if needed
}

