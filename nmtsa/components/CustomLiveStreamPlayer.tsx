import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  Call,
  StreamCall,
  useCallStateHooks,
  useStreamVideoClient,
  VideoRenderer,
} from "@stream-io/video-react-native-sdk";
import IncallManager from "react-native-incall-manager";

export const CustomLivestreamPlayer = (props: {
  callType: string;
  callId: string;
}) => {
  const { callType, callId } = props;
  const client = useStreamVideoClient();
  const [call, setCall] = useState<Call>();

  useEffect(() => {
    if (!client) return;
    const myCall = client.call(callType, callId);
    setCall(myCall);
    myCall.join().catch((e) => {
      console.error("Failed to join call", e);
    });
    return () => {
      myCall.leave().catch((e) => {
        console.error("Failed to leave call", e);
      });
      setCall(undefined);
    };
  }, [callId, callType, client]);

  if (!call) {
    return null;
  }

  return (
    <StreamCall call={call}>
      <CustomLivestreamLayout />
    </StreamCall>
  );
};

const CustomLivestreamLayout = () => {
  const { useParticipants, useParticipantCount } = useCallStateHooks();
  const participantCount = useParticipantCount();
  const [firstParticipant] = useParticipants();

  // Automatically route audio to speaker devices as relevant for watching videos.
  useEffect(() => {
    IncallManager.start({ media: "video" });
    return () => IncallManager.stop();
  }, []);

  return (
    <SafeAreaProvider style={styles.flexed}>
      <Text style={styles.text}>Live: {participantCount}</Text>
      <View style={styles.flexed}>
        {firstParticipant ? (
          <VideoRenderer participant={firstParticipant} />
        ) : (
          <Text style={styles.text}>The host hasn't joined yet</Text>
        )}
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  flexed: {
    flex: 1,
    backgroundColor: "white",
  },
  text: {
    alignSelf: "center",
    color: "white",
    backgroundColor: "blue",
    padding: 6,
    margin: 4,
  },
});