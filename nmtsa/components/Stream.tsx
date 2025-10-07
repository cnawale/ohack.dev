import {
    StreamCall,
    StreamVideo,
    StreamVideoClient,
    User,
} from "@stream-io/video-react-native-sdk"

import { useEffect, useState } from "react"

const apiKey = "kv9p7epty92x"
const userId = "anonymous" // UserID created during Register
const secret = "3zuvgz5xcqwpxwmdn8avqaaae5xtjdw99x2crbhcj6ph7rygyrauwtg66bspg493"

const token = "my-token"
const callId = "my-call-id" //

const user: User = { id: userId }
const client = new StreamVideoClient({ apiKey, user, token })
const call = client.call("default", callId)

call.join({ create: true })
export default function Stream() {
    return (
        <StreamVideo client={client}>
            <StreamCall call={call}>{/* Your UI */}</StreamCall>
        </StreamVideo>
    );
}