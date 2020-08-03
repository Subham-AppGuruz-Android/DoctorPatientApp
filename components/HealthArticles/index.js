import React from 'react'
import { Text, Image, TouchableOpacity, View } from 'react-native';
import {
    Button,
    Text,
    Icon,
    Header,
    Left,
    Body,
    Title,
    Content,
    Container,
    Right,
    CheckBox

} from 'native-base';
class HealthArticles extends React.Component {
    state = {}
    componentDidMount() {

    }
    render() {
        return (
            <Container>
                <Header style={[Styles.CommonStyles.header_container]}>
                    <TouchableOpacity onPress={() => this.goToPage('back')}>
                        <Icon
                            ios="ios-arrow-back"
                            android="ios-arrow-back"
                            style={[{ fontSize: 30, color: "#fff", }]}
                        />
                    </TouchableOpacity>

                    <Title style={{ fontFamily: Fonts.SemiBold }}>Health Atricles</Title>
                    <View />
                </Header>

                <View style={styles.container}>
                    {/* {loader ? (
          <Loader />
        ) : (
            <View style={{ flex: 1, }}>
              {
                payments_array.length != 0
                  ?
                  <FlatList
                    data={payments_array}
                    renderItem={item => this.renderPayments(item)}
                    extraData={this.state}
                    keyExtractor={(item, index) => index.toString()}
                  />
                  :
                  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text
                      style={{ fontSize: 20, fontFamily: Fonts.Bold, color: colors.LIGHT_GREY }}
                    >
                      No Payments Found!
                  </Text>
                  </View>
              }


            </View>
          )
        } */}


                </View>
            </Container >
        )
    }

}

export default HealthArticles;