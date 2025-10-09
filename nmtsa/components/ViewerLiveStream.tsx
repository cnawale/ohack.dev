import {
  LivestreamPlayer,
  StreamVideo,
  StreamVideoClient,
  User,
} from "@stream-io/video-react-native-sdk";

import { useEffect } from "react";

const apiKey = "mmhfdzb5evj2";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL01hcm9vbl9KYWNrcmFiYml0IiwidXNlcl9pZCI6Ik1hcm9vbl9KYWNrcmFiYml0IiwidmFsaWRpdHlfaW5fc2Vjb25kcyI6NjA0ODAwLCJpYXQiOjE3NTk5OTg4ODIsImV4cCI6MTc2MDYwMzY4Mn0.TTVlnN6sxzBc_nl2WBJWuM8C1xMyR7DS0KNKggeD5ZY";
const callId = "DvfjRH1O6dR6CvgOiXNR0";

const user: User = { type: "anonymous" };
const client = new StreamVideoClient({ apiKey, user, token });

export default function ViewerLiveStream() {
  return (
    <StreamVideo client={client}>
      <LivestreamPlayer callType="livestream" callId={callId} />
    </StreamVideo>
  );
}