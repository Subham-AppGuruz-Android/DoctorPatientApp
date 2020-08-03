import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions, ScrollView
} from 'react-native';
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
} from 'native-base';
import Feather from 'react-native-vector-icons/dist/Feather';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import Ionicons from "react-native-vector-icons/Ionicons";
import get from "lodash.get";

import { colors, Styles } from '../../common/index';
import Fonts from '../../common/fonts';
import { callNumber } from '../../common/utils';
const defaultDoc = require('../../assets/imgs/default_doctor.jpg');
const blogDefault = require('../../assets/imgs/blog_information_default.jpg');
export default class BlogDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blog_detail: ''
    };
  }

  goback = () => {
    this.props.navigation.pop();
  };
  componentDidMount() {
    let { blog_detail } = this.props.route.params
    console.log('blog_detail', blog_detail)
    this.setState({ blog_detail })
  }


  render() {
    let { blog_detail } = this.state
    return (
      <Container>

        <Header style={[Styles.CommonStyles.header_container]}>
          <TouchableOpacity onPress={() => this.goback()}>
            <Icon
              ios="ios-arrow-back"
              android="ios-arrow-back"
              style={[{ fontSize: 30, color: "#fff", }]}
            />
          </TouchableOpacity>

          <Title style={{ fontFamily: Fonts.SemiBold }}>Health Articles</Title>

          <TouchableOpacity onPress={() => console.log('press')}>
            <Icon
              ios="share"
              android="share"
              type='Entypo'
              style={[{ fontSize: Platform.OS === 'ios' ? 35 : 30, color: '#fff' }]}
            />
          </TouchableOpacity>

        </Header>


        <ScrollView>
          <View style={styles.container}>
            <View style={styles.upper_view}>
              <View style={styles.row_container}>
                <View style={styles.image_view}>
                  <Image style={styles.image} source={defaultDoc} resizeMode='contain' />
                </View>
                <View style={styles.text_container}>
                  <Text style={styles.heading_text}>Dr. Christian Maxwell</Text>
                  <Text style={styles.description_text}>
                    cosmetic, Aesthetic Dentist
                </Text>
                </View>
              </View>
            </View>
            <View style={styles.middle_view}>
              <Image style={styles.blog_image} source={blogDefault} />
              <Text style={styles.blog_heading}>
                {blog_detail.post_title}
              </Text>
              <Text style={styles.blog_description}>
                {blog_detail.post_content}
              </Text>
            </View>
            <View style={styles.bottomContainer}>
              <TouchableOpacity
                style={styles.bottomButtonContainer}
                onPress={() => {
                  // this.onDoctorPress("clinical", item);
                }}
              >
                <Image
                  resizeMode="contain"
                  style={{ height: 25, width: 25 }}
                  source={require("../../assets/imgs/calendar-(1).png")}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.bottomButtonContainer}
                onPress={() => {
                  // this.onDoctorPress("video", item);
                }}
              >
                <Image
                  resizeMode="contain"
                  style={{ height: 25, width: 25 }}
                  source={require("../../assets/imgs/Video.png")}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.bottomButtonContainer}
                onPress={() => {
                  console.log("pressed");
                }}
              >
                <Image
                  resizeMode="contain"
                  style={{ height: 25, width: 25 }}
                  source={require("../../assets/imgs/comment.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.bottomButtonContainer}
                onPress={() => {
                  callNumber(get('', "contact_no", "12345"));
                }}
              >
                <Image
                  resizeMode="contain"
                  style={{ height: 25, width: 25 }}
                  source={require("../../assets/imgs/Phone.png")}
                />
              </TouchableOpacity>
            </View>

          </View></ScrollView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header_container: {
    height: 50,
    alignItems: 'center',
    backgroundColor: colors.THEME_BLUE,
  },
  inner_header: {
    height: 80,
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  header_btn: {
    textAlign: 'left',
    position: 'absolute',
    top: '20%',
    left: 0,
  },
  row_container: {
    flexDirection: 'row',
  },
  image_view: {
    flex: 0.8,
  },
  image: {
    width: 80,
    height: 80,
  },
  blog_image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width - 220,
  },
  blog_heading: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15,
    fontFamily: Fonts.SemiBold,
    fontSize: 14,
  },
  text_container: {
    flex: 2,
    justifyContent: 'center',
  },
  heading_text: {
    fontSize: 14,
    fontFamily: Fonts.SemiBold
  },
  description_text: {
    fontSize: 12, fontFamily: Fonts.Regular, marginTop: 2
  },
  like_icon: {
    fontSize: Platform.OS === 'ios' ? 25 : 20,
    color: colors.GREEN,
  },
  share_icon: {
    fontSize: Platform.OS === 'ios' ? 25 : 20,
    color: colors.gray,
  },
  icon_text: { marginTop: 5 },
  upper_view: {
    // flex: 0.5,
    paddingVertical: 15,
    marginLeft: 15,
    marginRight: 15,
    justifyContent: 'center',
  },
  middle_view: { flex: 2 },
  lower_view: { flex: 0.4, justifyContent: 'center' },
  blog_description: {
    marginHorizontal: 15,
    fontSize: 9,
    marginTop: 15,
  },
  btn: {
    backgroundColor: colors.THEME_BLUE,
    width: 240,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn_container: { alignItems: 'center' },
  btn_text: { color: 'white' },
  bottomContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.borderColor,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fdfbfc",
    height: 45,
  },

  bottomButtonContainer: {
    backgroundColor: "#fdfbfc",
    flex: 1,
    alignItems: "center",
    borderRightWidth: 1,
    borderColor: colors.borderColor,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
