import { useEffect, useState } from "react"
import { ScrollView, View, Image, Text, TouchableOpacity, ActivityIndicator, Dimensions, StyleSheet } from "react-native"
import SkeletonComponent from "./components/Skeleton"

//list screen
//contains a list of user found follower/following
//can select any person from list to view profile

const List = (props) => {
    const fUrl = props.route.params.url + "?per_page=200" // '&page=' + page
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        //get list of users data
        dataPromise(fUrl).then((val) => {
            setData(val)
            setTimeout(() => {
                setIsLoading(false)
            }, 500);
        })

    }, [])

    //a promise to return api data
    const dataPromise = (url, sort = true) => {
        return new Promise((onSuccess, onFail) => {
            fetch(url)
                .then((response) => response.json())
                .then((json) => {
                    if (sort) {
                        //sorts data in order of a-z
                        let sorted = json.sort((a, b) => (a.login.toUpperCase() > b.login.toUpperCase()) ? 1 : -1)
                        onSuccess(sorted)
                    }
                    else {
                        onSuccess(json)
                    }

                })
                .catch((error) => {
                    console.error(error)
                })
        })
    }

    //creates an array of 10 skeleton UI
    let SkeletonComps = []
    for (let i = 0; i < 10; i++) {
        let temp = (
            <View key={"s" + i}>
                <SkeletonComponent width={Dimensions.get("screen").width} height={110} />
                <SkeletonComponent isAbsolute={true} topVal={10} leftVal={10} width={90}
                    height={90} borderColor={'white'} borderWidth={0.2} />
                <SkeletonComponent isAbsolute={true} height={30} width={150} borderColor={'white'} borderWidth={0.2}
                    topVal={40} leftVal={120} />
                <View style={{ borderWidth: 0.8, borderColor: '#fff' }}></View>
            </View>
        )
        SkeletonComps[i] = temp
    }


    return (
        isLoading ?
            <View>
                {SkeletonComps}
            </View>
            :
            <ScrollView>
                {
                    //loops through found users and creates UI for them
                    data.map((item, index) => {
                        return (
                            <View key={index}>
                                <TouchableOpacity onPress={() => {
                                    dataPromise(item.url, false).then((val) => {
                                        props.navigation.navigate("Profile", { data: val })
                                    })
                                }}>
                                    <View style={{ flexDirection: 'row', marginVertical: 10, marginHorizontal: 5 }}>
                                        <Image
                                            style={{
                                                width: 100,
                                                height: 100,
                                            }}
                                            source={{ uri: item.avatar_url }}
                                        />
                                        <View style={{ marginHorizontal: 15, justifyContent: 'center' }}>
                                            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{item.login}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <View style={{ borderWidth: 0.8, borderColor: '#fff' }}></View>
                            </View>
                        )

                    })
                }
            </ScrollView>
    )
}

export default List