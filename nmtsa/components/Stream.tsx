import {
  Call,
  HostLivestream,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  User,
} from "@stream-io/video-react-native-sdk";
import { useEffect, useState } from "react";

const apiKey = "kv9p7epty92x";
const userId = "cnawale418 ";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiY25hd2FsZTQxOCIsInZhbGlkaXR5X2luX3NlY29uZHMiOjM2MDAsImlhdCI6MTc1OTkxMzQwMywiZXhwIjoxNzU5OTE3MDAzfQ.lHw2RyeGbVKnu9TUJmxB4HGeO1B4cFvZIBpN9M4Kzao";

const callId = "my-call-id";
const user: User = { id: userId };

const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call("default", callId);
call.join({ create: true });

export default function Stream() {
  return (
    <StreamCall call={call}>
      <HostLivestream />
    </StreamCall>
  );
}