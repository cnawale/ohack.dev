// Render LiveStream (Host)
import {
  useCall,
  useCallStateHooks,
  VideoRenderer,
} from "@stream-io/video-react-native-sdk";
import { View, Button, Text, StyleSheet } from "react-native";
import { useEffect } from "react";
import IncallManager from "react-native-incall-manager";

export default function LivestreamView() {
  const { useParticipantCount, useLocalParticipant, useIsCallLive } =
    useCallStateHooks();

  const call = useCall();
  const totalParticipants = useParticipantCount();
  const localParticipant = useLocalParticipant();
  const isCallLive = useIsCallLive();

  // Automatically route audio to speaker devices as relevant for watching videos.
  // Please read more about `media` and `auto` options in the documentation of react-native-incall-manager
  // https://github.com/react-native-webrtc/react-native-incall-manager#usage
  useEffect(() => {
    IncallManager.start({ media: "video" });
    return () => IncallManager.stop();
  }, []);

  return (
    <View style={styles.flexed}>
      <Text style={styles.text}>Live: {totalParticipants}</Text>
      <View style={styles.flexed}>
        {localParticipant && (
          <VideoRenderer
            participant={localParticipant}
            trackType="videoTrack"
          />
        )}
      </View>
      <View style={styles.bottomBar}>
        {isCallLive ? (
          <Button onPress={() => call?.stopLive()} title="Stop Live" />
        ) : (
          <Button
            onPress={() => {
              call?.goLive();
            }}
            title="Go Live"
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flexed: {
    flex: 1,
  },
  text: {
    alignSelf: "center",
    color: "white",
    backgroundColor: "blue",
    padding: 6,
    margin: 4,
  },
  bottomBar: {
    alignSelf: "center",
    margin: 4,
  },
});