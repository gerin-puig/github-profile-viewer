import { useState } from 'react';
import { Button, Dimensions, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

//the search screen, it contains an inputbox to enter search and button to confirm
//here the user can enter a username to search for a user; if no user is found, will tell user no user found
//if user is found, will navigate to found users Profile

const SearchUser = ({ navigation }) => {
    const [searchInput, onChangeInput] = useState("")
    const [isFound, setIsFound] = useState(true)

    //search button pressed
    const SearchPressed = () => {
        fetch("https://api.github.com/users/" + searchInput)
            .then((response) => response.json())
            .then((json) => {
                //if a user is not found it will contain a property of message that says "Not Found"
                //uf user is found it will not have message property
                if (json.message !== "Not Found") {
                    setIsFound(true)
                    navigation.navigate("Profile", { data: json })
                }
                else {
                    setIsFound(false)
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 20 }}>Enter a Username to search for:</Text>
            <TextInput
                style={{
                    height: 40,
                    width: Dimensions.get("screen").width - 20,
                    margin: 12,
                    textAlign: 'center',
                    borderColor: 'gray',
                    borderWidth: 0.2,
                    fontSize: 20
                }}
                onChangeText={onChangeInput}
                value={searchInput}
                placeholder={"Enter Username here"}
            />

            <Button
                title='Search'
                onPress={SearchPressed}
            />

            {
                isFound == false ?
                    <Text style={{ marginTop: 30, fontSize: 22, fontWeight: 'bold', color:'red' }}>Username Not Found!</Text>
                    :
                    null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 100
        // justifyContent: 'center',
    },
});


export default SearchUser