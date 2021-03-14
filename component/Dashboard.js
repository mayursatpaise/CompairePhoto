import React, { Component } from 'react';
import axios from "react-native-axios";

import { View, Text, SafeAreaView, TouchableOpacity, FlatList, Modal, SectionList, StyleSheet, Image, TextComponent } from 'react-native';


const refEam = React.createRef();

class Dashboard extends Component {

    constructor(props) {

        super(props)

        this.state = {
            photoArray: [],
            compaireList: [],
            isModalVisible: false



        };
    };

    handleButton() {

    }
    componentDidMount() {
        this.getPhotoList();
    }




    async getPhotoList() {


        fetch('https://jsonplaceholder.typicode.com/photos')
            .then(response => response.json())
            .then(data => {
                this.setState({ photoArray: data });


                // console.log('<<===Data===>>', data)

            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }


    render() {

        return (
            <>
                <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F8F8', }}>



                    <TouchableOpacity
                        onPress={() => {
                            this.setState({
                                isModalVisible: !this.state.isModalVisible
                            })
                        }}
                        style={{ width: '50%', fontSize: 18, alignSelf: "flex-end", backgroundColor: 'lightgreen' }}>
                        <Text style={{ fontWeight: 'bold', color: 'grey', alignSelf: 'center' }}>Compaired Item List </Text>
                    </TouchableOpacity>



                    <FlatList
                        data={this.state.photoArray}
                        // style={{ alignSelf: 'center' }}
                        numColumns={2}
                        keyExtractor={(item) => item.id}

                        renderItem={(item, index, s) => {

                            return (


                                <View style={{ flex: 1, alignSelf: 'center', margin: 2, alignContent: 'center', borderWidth: 0.4, margin: 3 }}>

                                    <Image
                                        style={{ backgroundColor: 'grey', width: '90%', height: 200, alignSelf: 'center', marginVertical: 3 }}
                                        source={{ uri: item.item.url }}
                                    />
                                    <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                                        <View>
                                            <Text>ID :-</Text>
                                            <Text style={{ height: 80 }}>Title :- </Text>
                                            <Text style={{}}>url :-</Text>
                                        </View>
                                        <View>
                                            <Text >{item.item.id}</Text>
                                            <Text style={{ width: 100, height: 100 }}>{item.item.title}.</Text>

                                            <Text style={{ width: 170 }}>{item.item.url}</Text>

                                        </View>

                                    </View>

                                    <TouchableOpacity
                                        style={{ backgroundColor: 'cyan', width: '50%', alignSelf: 'center', paddingVertical: 8, marginVertical: 3 }}
                                        onPress={() => {

                                            var data = this.state.photoArray;

                                            var indexOfItem = item.index;

                                            if (item.item.isCompaire == undefined || item.item.isCompaire == false) {

                                                var data = this.state.photoArray;

                                                this.state.compaireList.push(item.item);
                                                data[indexOfItem].isCompaire = true

                                                this.setState({
                                                    photoArray: data
                                                })


                                                console.log(this.state.compaireList, "<<<<<<==== 1 Compaired Array");


                                            } else {


                                                let mainArray2 = this.state.photoArray;
                                                var indexOfItem2 = -1;

                                                mainArray2.map((ite, ind) => {
                                                    if (item.item.id === ite.id) {
                                                        indexOfItem2 = item.index;
                                                    }

                                                });
                                                mainArray2[indexOfItem2].isCompaire = false;
                                                console.log(mainArray2[indexOfItem2])
                                                this.setState({
                                                    photoArray: mainArray2
                                                });

                                                // Remove

                                                var compairePhotoArray = this.state.compaireList;
                                                compairePhotoArray.splice(indexOfItem2, 1);

                                                // compairePhotoArray.filter((ite, ind) => {

                                                //     if (indexOfItem2.id != ite.id) {
                                                //         console.log(ite, "me marathi")
                                                //         return ite;

                                                //     }

                                                // });

                                                console.log(compairePhotoArray, "updatred compaire array==>");
                                                if (compairePhotoArray == 1) {
                                                    compairePhotoArray = [];
                                                }
                                                this.setState({
                                                    compaireList: compairePhotoArray
                                                })







                                            }

                                        }
                                        }
                                    >

                                        <Text style={{ alignSelf: 'center' }}>{item.item.isCompaire == true ? "Remove" : "Compaire"}</Text>

                                    </TouchableOpacity>



                                </View>



                            )
                        }}
                    />


                </SafeAreaView>

                <Modal
                    visible={this.state.isModalVisible}

                >

                    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', width: '100%', alignSf: 'elcenter' }}>
                        <TouchableOpacity
                            style={{ alignSelf: 'flex-end', margin: 3 }}
                            onPress={() => {
                                this.setState({ isModalVisible: false });

                            }}>
                            <Text>Close</Text>
                        </TouchableOpacity>
                        <View style={{ padding: 5, borderWidth: 1, borderBottomWidth: 0 }}>

                            <Text style={{ alignSelf: 'center', fontWeight: 'bold' }}>COMPARISON TABLE</Text>


                        </View>
                        <View style={{
                            borderWidth: 1, flexDirection: 'row',
                        }}>
                            <Text style={styles.tableText}>ID</Text>
                            <Text style={[styles.tableText]}>PHOTO</Text>
                            <Text style={styles.tableText}>url</Text>

                            <Text style={styles.tableText}>Title</Text>




                        </View>

                        <FlatList
                            data={this.state.compaireList}
                            // style={{ alignSelf: 'center' }}

                            keyExtractor={(item) => item.id}

                            renderItem={(item, index) => {

                                return (

                                    <View style={{ flex: 1, flexDirection: 'row', width: '100%', alignSelf: 'center' }}>
                                        <Text style={{ width: '14%', borderWidth: 1 }}>{item.item.id}</Text>
                                        <Image
                                            source={{ uri: item.item.uri }}
                                            style={{ width: 100, height: 60, alignSelf: 'center', backgroundColor: 'red', paddingBottom: 5, marginBottom: 3 }}
                                        />

                                        <Text style={{ width: '30%', borderWidth: 1 }}>{item.item.url}</Text>
                                        <Text style={{ width: '30%', borderWidth: 1 }}>{item.item.title}</Text>
                                    </View>



                                )
                            }}
                        />

                    </SafeAreaView>

                </Modal>

            </>


        );
    }

}


const styles = StyleSheet.create({
    tableText: {
        width: '28%',
        backgroundColor: 'grey',
        alignSelf: 'center',

    },
    textLeft: {
        marginLeft: 20,
        marginVertical: 10,
        alignSelf: 'flex-start',
        fontSize: 16,
    },

    textRight: {
        fontSize: 16,
        marginLeft: 20,
        marginVertical: 10,
    }

})


export default Dashboard;

