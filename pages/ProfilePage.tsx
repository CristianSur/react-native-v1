import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Text, Card } from "react-native-paper";

export default function ProfilePage() {
    const [name, setName] = useState("");
    const [savedName, setSavedName] = useState<string | null>(null);

    const saveName = () => {
        if (name.trim().length > 0) {
            setSavedName(name);
            setName("");
        }
    };

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <Card.Content>
                    <Text variant="headlineSmall" style={{ marginBottom: 10 }}>
                        Profile
                    </Text>
                    {savedName ? (
                        <Text variant="titleMedium">👋 Hello, {savedName}!</Text>
                    ) : (
                        <Text variant="bodyMedium" style={{ marginBottom: 10 }}>
                            Enter your name to personalize your diary.
                        </Text>
                    )}

                    <TextInput
                        mode="outlined"
                        label="Your Name"
                        value={name}
                        onChangeText={setName}
                        style={styles.input}
                    />

                    <Button mode="contained" onPress={saveName}>
                        Save
                    </Button>
                </Card.Content>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#F4F6FA",
        justifyContent: "center",
    },
    card: {
        padding: 20,
        borderRadius: 12,
    },
    input: {
        marginBottom: 10,
        backgroundColor: "white",
    },
});
