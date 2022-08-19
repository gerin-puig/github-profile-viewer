import { ScrollView, View, Image, Text, StyleSheet, TouchableOpacity } from "react-native"

//profile screen
//displays found users information such as: username, name, description, follower and following count
//the app user can click on the numbers to go to a list of profiles

const UserProfile = (props, { navigation }) => {
    const data = props.route.params.data
    return (
        <ScrollView style={{
            flex: 1,
            backgroundColor: '#fff',
            paddingTop: 20
        }}>
            <Image
                style={{
                    width: 150,
                    height: 150,
                    alignSelf: "center"
                }}
                source={{ uri: data.avatar_url }}
            />

            <Text
                style={{
                    alignSelf: 'center',
                    fontSize: 26,
                    margin: 15,
                    fontWeight: 'bold'
                }}
            >
                User: {data.login}
            </Text>

            <Text style={styles.smallText}>
                Name: {data.name}
            </Text>

            <Text style={styles.smallText}>
                Description: {data.bio == null ? "N/A" : data.bio}
            </Text>

            {/* makes the numbers touchable if count is more than 0  */}
            {
                data.followers > 0 ?
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 22 }}>Followers:</Text>
                        <TouchableOpacity style={styles.smallText}
                            onPress={() => { props.navigation.navigate("List", { url: data.followers_url }) }}
                        >
                            <Text style={{ fontSize: 22 }}>{data.followers}</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <Text style={styles.smallText}>Followers:   {data.followers}</Text>
            }

            {
                data.following > 0 ?
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 22 }}>Following:</Text>
                        <TouchableOpacity
                            style={styles.smallText}
                            onPress={() => {
                                props.navigation.navigate("List", { url: "https://api.github.com/users/" + data.login + "/following" })
                            }}
                        >
                            <Text style={{ fontSize: 22 }}>{data.following}</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <Text
                        style={styles.smallText}>Following:   {data.following}</Text>
            }

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    smallText:
    {
        alignSelf: 'center',
        fontSize: 22,
        margin: 15
    }
});

export default UserProfile