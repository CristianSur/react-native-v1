import React, {useMemo, useRef, useState} from "react";
import {Platform, ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {Button, Card, IconButton, Provider as PaperProvider, Text, TextInput,} from "react-native-paper";
import {AnimatePresence, MotiView} from "moti";
import {Easing} from "react-native-reanimated";

type DiaryEntry = { id: number; text: string };

export default function DiaryPage() {
    const [entry, setEntry] = useState("");
    const [entries, setEntries] = useState<DiaryEntry[]>([]);
    const [showAll, setShowAll] = useState(false);
    const navigation = useNavigation();
    const nextIdRef = useRef(0);

    const addEntry = () => {
        if (entry.trim().length === 0) return;
        const newEntry: DiaryEntry = {id: nextIdRef.current, text: entry};
        nextIdRef.current += 1;
        setEntries((prev) => [...prev, newEntry]);
        setEntry("");
    };

    const visibleEntries = useMemo(() => {
        if (showAll) return entries;
        if (entries.length === 0) return [];
        return [entries[entries.length - 1]];
    }, [entries, showAll]);

    return (
        <PaperProvider>
            <View style={styles.container}>
                {/* Header with Profile Button */}
                <View style={styles.headerRow}>
                    <Text variant="headlineMedium" style={styles.header}>
                        📔 My Diary
                    </Text>
                    <IconButton
                        style={styles.writeButton}
                        size={30}
                        icon="arrow-left"
                        onTouchEnd={() => navigation.navigate("Profile" as never)}
                    />
                </View>

                <ScrollView contentContainerStyle={styles.listContent}>
                    {visibleEntries.length === 0 ? (
                        <Text style={styles.emptyText}>
                            No diary entries yet. Write your first one!
                        </Text>
                    ) : (
                        <AnimatePresence exitBeforeEnter>
                            {visibleEntries.map((item, index) => {
                                // const isNew = lastAddedId === item.id;
                                const isNew = true;
                                const enterDelay = 0;
                                return (
                                    <View style={{overflow: "hidden"}} key={item.id}>
                                    <MotiView
                                        style={styles.revealClip}
                                        key={item.id}
                                        from={{
                                            width: "0%",
                                            opacity: isNew ? 0 : 1,
                                            translateX: isNew ? -8 : 0,
                                            translateY: isNew ? -4 : 8,
                                            rotateZ: index % 2 === 0 ? "-0.5deg" : "0.5deg",
                                            perspective: 800,
                                            rotateY: isNew ? "-30deg" : "0deg",
                                    }}
                                        animate={{
                                            width: "100%",
                                            opacity: 1,
                                            translateY: 5,
                                            translateX: 0,
                                            rotateZ: index % 2 === 0 ? "-2deg" : "0.5deg",
                                            perspective: 800,
                                            rotateY: "0deg",

                                        }}
                                        exit={{
                                            opacity: 0,
                                            translateX: -100,
                                            translateY: -100,
                                        }}
                                        transition={{
                                            type: "timing",
                                            duration: 500,
                                            easing: Easing.out(Easing.cubic),
                                            delay: enterDelay
                                        }}
                                    >
                                        <View style={styles.noteWrapper} onLayout={(e) => {
                                        }}>
                                            <Card style={styles.noteCard}>
                                                <Card.Content style={styles.noteContent}>
                                                    <View style={styles.notePin}/>
                                                    <View style={styles.noteRedLine}/>
                                                    <Text variant="bodyLarge" style={styles.noteText}>
                                                        {item.text}
                                                    </Text>
                                                </Card.Content>
                                            </Card>
                                        </View>
                                    </MotiView></View>
                                );
                            })}
                        </AnimatePresence>
                    )}
                </ScrollView>

                {/* Toggle button */}
                {entries.length > 1 && (
                    <Button
                        mode="outlined"
                        style={styles.showButton}
                        onPress={() => setShowAll(!showAll)}
                    >
                        {showAll ? "Show Less" : "Show All Entries"}
                    </Button>
                )}

                {/* Input for new entry (handwriting style) */}
                <View style={styles.inputWrapper}>
                    <View style={styles.inputRedLine}/>
                    <TextInput
                        mode="outlined"
                        label="Write your diary entry..."
                        value={entry}
                        onChangeText={setEntry}
                        multiline
                        style={styles.input}
                        contentStyle={styles.inputContent}
                        outlineColor="#E9E1C9"
                        activeOutlineColor="#C3B692"
                        cursorColor="#1f2a44"
                    />
                </View>

                {/* Write Button (Diary paper style) */}
                <TouchableOpacity style={styles.writeButton} onPress={addEntry}>
                    <Text style={styles.writeButtonText}>Write</Text>
                </TouchableOpacity>
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
    },
    listContent: {
        paddingBottom: 12,
    },
    noteCard: {
        marginBottom: 14,
        borderRadius: 10,
        backgroundColor: "#FFFCF3", // soft paper color
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.12,
        shadowRadius: 6,
        elevation: 3,
        borderWidth: 1,
        borderColor: "#E9E1C9",
    },
    noteContent: {
        paddingVertical: 16,
        paddingHorizontal: 18,
    },
    highlightOverlay: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 10,
        backgroundColor: '#FFF3C4',
    },
    noteWrapper: {
        // flexShrink: 0,
        // position: "relative",
    },
    ripple: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 12,
        backgroundColor: '#C7F9FF',
    },
    revealClip: {
        alignSelf: "flex-start",
        borderRadius: 20,
    },
    rightEdgeShadow: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: 28,
        backgroundColor: 'rgba(0,0,0,0.18)',
    },
    curlShadowRight: {
        position: 'absolute',
        right: -2,
        top: 0,
        width: 30,
        height: 30,
        borderTopRightRadius: 10,
        backgroundColor: 'rgba(0,0,0,0.12)',
        transform: [{skewX: '-16deg'}, {skewY: '-10deg'}],
    },
    cornerCurlRight: {
        position: 'absolute',
        right: -2,
        top: 0,
        width: 26,
        height: 26,
        borderTopRightRadius: 10,
        backgroundColor: 'rgba(255,255,255,0.85)',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.12,
        shadowRadius: 3,
        transform: [{skewX: '-18deg'}, {skewY: '-12deg'}],
    },
    noteText: {
        color: "#3c3a37",
        lineHeight: 22,
        paddingLeft: 18, // leave room for red margin line
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
    notePin: {
        position: "absolute",
        top: 8,
        left: 8,
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#D94F4F",
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.2,
        shadowRadius: 1.5,
    },
    cornerCurl: {
        position: "absolute",
        right: 0,
        top: 0,
        width: 26,
        height: 26,
        borderTopRightRadius: 10,
        backgroundColor: "rgba(0,0,0,0.06)",
        transform: [{skewX: "-18deg"}, {skewY: "-12deg"}],
    },
    revealCover: {},
    leftToRightCover: {},
    peelShadow: {
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: 20,
        backgroundColor: "rgba(0,0,0,0.08)",
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    cornerCurlLeft: {
        position: "absolute",
        left: -2,
        top: 0,
        width: 22,
        height: 22,
        borderTopLeftRadius: 10,
        backgroundColor: "rgba(0,0,0,0.10)",
        transform: [{skewX: "16deg"}, {skewY: "10deg"}],
    },
    input: {
        marginTop: 0,
        backgroundColor: "#FFFCF3",
        fontFamily: Platform.select({ios: "Snell Roundhand", android: "serif"}),
        color: "#1f2a44",
        lineHeight: 24,
        paddingLeft: 20,
    },
    inputContent: {
        paddingVertical: 12,
        paddingLeft: 20,
    },
    inputWrapper: {
        marginTop: 10,
        backgroundColor: "#FFFCF3",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#E9E1C9",
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.08,
        shadowRadius: 5,
        elevation: 2,
        overflow: "hidden",
    },
    inputRedLine: {
        position: "absolute",
        top: 8,
        bottom: 8,
        left: 16,
        width: 1,
        backgroundColor: "#E96A6A",
        opacity: 0.5,
        zIndex: 1,
    },
    fab: {
        position: "absolute",
        right: 20,
        bottom: 20,
        backgroundColor: "#6C63FF",
    },
    emptyText: {
        textAlign: "center",
        color: "#999",
        marginTop: 50,
    },
    showButton: {
        marginTop: 10,
        alignSelf: "center",
    },
    writeButton: {
        backgroundColor: "#FFFCF3",
        paddingVertical: 14,
        paddingHorizontal: 28,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 20,
        alignSelf: "center",
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.12,
        shadowRadius: 6,
        elevation: 3,
        borderWidth: 1,
        borderColor: "#E9E1C9",
    },
    writeButtonText: {
        color: "#3c3a37",
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: 0.5,
    },
});
