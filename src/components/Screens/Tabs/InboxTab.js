// external imports
import {
    ScrollView,
    StyleSheet,
    Pressable,
    FlatList,
    Text,
    View
} from 'react-native';
import { useState, useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

// internal imports
import { Header, LogInMessage } from '../../Misc/System';
import { InboxNotification } from '../../Misc/Displays';
import { Container } from '../../Misc/Templates';

const InboxTab = () => {
    const { top } = useSafeAreaInsets();
    const currentUser = useSelector(({ user }) => (user))

    const [chats, setChats] = useState([]);
    const [currTab, setCurrTab] = useState(0);

    const renderMessagesView = () => (
        <View>
        {/* <FlatList
            style={styles.pageContent}
            data={chats}
            renderItem={(chat) => {
                <InboxNotification chat={chat} key={chat.id}/>
            }}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
        /> */}
        </View>
    )

    const renderCommentsView = () => (
        <ScrollView style={styles.pageContent}>

        </ScrollView>
    )

    const renderContent = () => {
        if (currentUser) {
            return (
                <View>
                    <View style={styles.topBar}>
                        {["MESSAGES", "COMMENTS"].map((title, idx) => (
                            <Pressable
                                style={[styles.tab, currTab === idx && styles.selectedTab]}
                                onPress={() => setCurrTab(idx)}
                            >
                                <Text style={[styles.tabText, currTab === idx && styles.selectedText]}>{title}</Text>
                            </Pressable>
                        ))}
                    </View>
                    {/* {currTab === 0 ? renderMessagesView() : renderCommentsView()} */}
                </View>
            );
        }

        return (
            <LogInMessage title="liked listings">You can add to and edit your liked listings once you've logged in.</LogInMessage>
        );
    }

    return (
        <Container safe={!currentUser} style={currentUser && { paddingTop: top }}>
            <Header hr={!currentUser} title='Inbox' />
            {renderContent()}
        </Container>
    );
}

export default InboxTab;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    // pageContent: {
    //   flex: 1
    // },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 2,
        paddingTop: 5,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderColor: 'black',
        borderBottomWidth: 0.5,
    },
    tabText: {
        fontSize: 10,
        letterSpacing: 3,
        fontWeight: '800',
        color: 'gray'
    },
    selectedTab: {
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderBottomWidth: 0,
    },
    selectedText: {
        color: 'black'
    }
});
