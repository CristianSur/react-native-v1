import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TextInput, Text, Card, IconButton, Provider as PaperProvider } from "react-native-paper";
import { useAppContext } from "../context/AppContext";

export default function ProfilePage() {
    const [name, setName] = useState("");
    const { userName, setUserName, totalNotes } = useAppContext();
    const navigation = useNavigation();

    const saveName = () => {
        if (name.trim().length > 0) {
            setUserName(name.trim());
            setName("");
        }
    };

    return (
        <PaperProvider>
            <View style={styles.container}>
                {/* Header with Back Button */}
                <View style={styles.headerRow}>
                    <IconButton
                        icon="arrow-left"
                        size={30}
                        onPress={() => navigation.goBack()}
                    />
                    <Text variant="headlineMedium" style={styles.header}>
                        👤 Profile
                    </Text>
                    <View style={{ width: 30 }} />
                </View>

                <View style={styles.content}>
                    {/* Greeting Card */}
                    <Card style={styles.greetingCard}>
                        <Card.Content style={styles.greetingContent}>
                            <View style={styles.notePin} />
                            <View style={styles.noteRedLine} />
                            <Text variant="headlineSmall" style={styles.greetingText}>
                                {userName ? `👋 Hi ${userName}!` : "👋 Welcome!"}
                            </Text>
                        </Card.Content>
                    </Card>

                    {/* Statistics Card */}
                    <Card style={styles.statsCard}>
                        <Card.Content style={styles.statsContent}>
                            <View style={styles.notePin} />
                            <View style={styles.noteRedLine} />
                            <Text variant="titleLarge" style={styles.statsTitle}>
                                📊 Your Statistics
                            </Text>
                            <View style={styles.statItem}>
                                <Text variant="headlineLarge" style={styles.statNumber}>
                                    {totalNotes}
                                </Text>
                                <Text variant="bodyLarge" style={styles.statLabel}>
                                    Total Notes
                                </Text>
                            </View>
                        </Card.Content>
                    </Card>

                    {/* Name Input Card */}
                    {!userName && (
                        <Card style={styles.inputCard}>
                            <Card.Content style={styles.inputContent}>
                                <View style={styles.notePin} />
                                <View style={styles.noteRedLine} />
                                <Text variant="titleMedium" style={styles.inputTitle}>
                                    ✏️ Set Your Name
                                </Text>
                                <Text variant="bodyMedium" style={styles.inputDescription}>
                                    Enter your name to personalize your diary experience.
                                </Text>
                                
                                <TextInput
                                    mode="outlined"
                                    label="Your Name"
                                    value={name}
                                    onChangeText={setName}
                                    style={styles.input}
                                    contentStyle={styles.inputText}
                                    outlineColor="#E9E1C9"
                                    activeOutlineColor="#C3B692"
                                    cursorColor="#1f2a44"
                                />

                                <TouchableOpacity style={styles.saveButton} onPress={saveName}>
                                    <Text style={styles.saveButtonText}>Save Name</Text>
                                </TouchableOpacity>
                            </Card.Content>
                        </Card>
                    )}
                </View>
            </View>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EDE7D5", // warm parchment-like background for diary
        padding: 16,
        paddingTop: 40,
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    header: {
        fontWeight: "700",
        color: "#3c3a37",
    },
    content: {
        flex: 1,
    },
    greetingCard: {
        marginBottom: 16,
        borderRadius: 10,
        backgroundColor: "#FFFCF3", // soft paper color
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 6,
        elevation: 3,
        borderWidth: 1,
        borderColor: "#E9E1C9",
    },
    greetingContent: {
        paddingVertical: 20,
        paddingHorizontal: 18,
        position: "relative",
    },
    greetingText: {
        color: "#3c3a37",
        paddingLeft: 18, // leave room for red margin line
        fontWeight: "600",
    },
    statsCard: {
        marginBottom: 16,
        borderRadius: 10,
        backgroundColor: "#FFFCF3",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 6,
        elevation: 3,
        borderWidth: 1,
        borderColor: "#E9E1C9",
    },
    statsContent: {
        paddingVertical: 20,
        paddingHorizontal: 18,
        position: "relative",
    },
    statsTitle: {
        color: "#3c3a37",
        paddingLeft: 18,
        marginBottom: 16,
        fontWeight: "600",
    },
    statItem: {
        alignItems: "center",
        paddingLeft: 18,
    },
    statNumber: {
        color: "#D94F4F",
        fontWeight: "700",
        fontSize: 48,
    },
    statLabel: {
        color: "#3c3a37",
        fontWeight: "500",
    },
    inputCard: {
        borderRadius: 10,
        backgroundColor: "#FFFCF3",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 6,
        elevation: 3,
        borderWidth: 1,
        borderColor: "#E9E1C9",
    },
    inputContent: {
        paddingVertical: 20,
        paddingHorizontal: 18,
        position: "relative",
    },
    inputTitle: {
        color: "#3c3a37",
        paddingLeft: 18,
        marginBottom: 8,
        fontWeight: "600",
    },
    inputDescription: {
        color: "#3c3a37",
        paddingLeft: 18,
        marginBottom: 16,
        opacity: 0.8,
    },
    input: {
        marginBottom: 16,
        backgroundColor: "#FFFCF3",
    },
    inputText: {
        paddingLeft: 20,
        color: "#1f2a44",
    },
    saveButton: {
        backgroundColor: "#FFFCF3",
        paddingVertical: 14,
        paddingHorizontal: 28,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 6,
        elevation: 3,
        borderWidth: 1,
        borderColor: "#E9E1C9",
    },
    saveButtonText: {
        color: "#3c3a37",
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: 0.5,
    },
    notePin: {
        position: "absolute",
        top: 8,
        left: 8,
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#D94F4F",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.5,
    },
    noteRedLine: {
        position: "absolute",
        top: 10,
        bottom: 10,
        left: 24,
        width: 1,
        backgroundColor: "#E96A6A",
        opacity: 0.6,
    },
});
