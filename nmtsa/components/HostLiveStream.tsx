// Broadcast LiveStream
import React from "react";
import {
  StreamVideoClient,
  StreamVideo,
  User,
  StreamCall,
} from "@stream-io/video-react-native-sdk";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LivestreamView from "./LiveStreamView";
import { Text } from "react-native";

const apiKey = "mmhfdzb5evj2";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL1RhdHRlcmVkX1BlZGlhdHJpY2lhbiIsInVzZXJfaWQiOiJUYXR0ZXJlZF9QZWRpYXRyaWNpYW4iLCJ2YWxpZGl0eV9pbl9zZWNvbmRzIjo2MDQ4MDAsImlhdCI6MTc1OTk5NzE3OCwiZXhwIjoxNzYwNjAxOTc4fQ.gx9QYooQikv4vgxhjAJCOVYAy9swCX5XkPksA-X3Xno";
const userId = "Tattered_Pediatrician";
const callId = "DvfjRH1O6dR6CvgOiXNR0";

const user: User = { id: userId, name: "Tutorial" };
const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call("livestream", callId);
call.join({ create: true });

export default function App() {
  return (
    <StreamVideo client={client} language="en">
      <StreamCall call={call}>
        <SafeAreaProvider style={{ flex: 1, backgroundColor: "white" }}>
          <LivestreamView />
        </SafeAreaProvider>
      </StreamCall>
    </StreamVideo>
  );
}