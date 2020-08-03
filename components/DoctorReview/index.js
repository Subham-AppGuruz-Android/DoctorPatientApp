import React from 'react';
import { StyleSheet, View, TouchableOpacity,eSafeAreaView, ScrollView,TextInput,Image  } from 'react-native';  
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
  Right
  
} from 'native-base';  
import Entypo from 'react-native-vector-icons/Entypo'; 
import { Searchbar } from 'react-native-paper'; 
import StarRating from 'react-native-star-rating'; 
import Feather from 'react-native-vector-icons/dist/Feather';


import {colors} from '../../common/index';


export default class DoctorReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: '',
             starCount: 3.5
        };
    }

   goToPage=(page)=>{  
     page=='back'?this.props.navigation.pop():
       this.props.navigation.navigate("Signup")
   }

  

    render() {
   
        return (
    <Container>
          <Header  style={[styles.header_container]}>
            <View
              style={[
                styles.inner_header,
                {marginTop: Platform.OS === 'ios' ? 0 : 10},
              ]}>
              <Button transparent style={[styles.header_btn, {}]}>
                <TouchableOpacity onPress={() => this.goToPage('back')}>
                  <Icon
                    ios="ios-arrow-back"
                    android="ios-arrow-back"
                    style={[
                    
                      {fontSize: Platform.OS === 'ios' ? 35 : 30},
                    ]}
                  />
                </TouchableOpacity>   
               
              </Button> 
              <Right>  
                <Button transparent style={[ {}]}>
                <TouchableOpacity onPress={() => this.goToPage('star')}>
                  <Icon
                    ios="ios-star-outline"
                    android="ios-star-outline"
                    style={[
                    
                      {fontSize: Platform.OS === 'ios' ? 35 : 30},
                    ]}
                  />
                </TouchableOpacity>   
               
              </Button>    
                <Button transparent style={[ {}]}>
                <TouchableOpacity onPress={() => this.goToPage('share')}>
                  <Icon
                    ios="md-share"
                    android="md-share"
                    style={[
                    
                      {fontSize: Platform.OS === 'ios' ? 35 : 30},
                    ]}
                  />
                </TouchableOpacity>   
               
              </Button> 
              

              </Right>
             
            </View>
          </Header>

          <Content>  
          <View style={{marginLeft:15,marginRight:15,marginTop:5}}>   
          <View style={{flexDirection:'row',paddingLeft:30,paddingRight:30,paddingTop:20}}> 
          <View style={{flex:2}}> 
          <Text style={{fontSize:15,fontWeight:'bold'}}>  
          Dr. Christian Maxwell
          </Text> 
          <Text style={{fontSize:13}}>  
          Cosmetic Aesthetic Dentist
          </Text>
          <Text style={{color:colors.THEME_BLUE,fontSize:12}}>  
          22 years as Specialist
          </Text>
          </View>  

            





















          <View style={{flex:1}}>  
       <Image
          style={{
    width: 80,
    height: 80,
  }}
          source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
        />
          </View>  

          </View>      

           <View style={styles.progress_text_container}>  
             
         <View style={{flex:1,alignItems:'flex-end',justifyContent:'center'}}> 
               
    <Text style={styles.labelText}>Detail</Text>
        
        
         
         </View>   
        
       
        <View style={{flex:1,alignItems:'flex-end',justifyContent:'center'}}>
        <Text style={styles.labelText}>Reviews</Text>
        </View>
        </View>


         <View style={styles.progress_container}>  
             
         <View style={{flex:1,alignItems:'flex-end',justifyContent:'center'}}> 
               
         <View style={styles.circleStyle}> 
         </View>   
        
         
         </View>   
        
        
        <View style={{flex:1,alignItems:'flex-end',justifyContent:'center'}}>
        <View style={styles.MiddlecircleStyle}> 
        </View>
        </View>
    
         <View style={styles.leftBar} />
         <View style={styles.rightBar} />
      </View>  























          <Text style={styles.review_text}>Reviews <Text style={{fontSize:15}}>(120 Ratings)</Text></Text> 
        <View style={styles.review_container}>  
        <View style={{flex:.6}}>  
         <Image
          style={{
    width: 60,
    height: 60,
  }}
          source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
        />
        </View>  
        <View style={{flex:2}}>  
        <Text style={{fontSize:18,fontWeight:'bold'}}>Alex Rose</Text>
        <Text  style={{fontSize:10}}> <Feather
                  name="thumbs-up"
                    style={[
                    
                      {fontSize: Platform.OS === 'ios' ? 15 : 15,color:colors.GREEN},
                    ]}
                  /> I visited for cosmectic braces and the entire procedure went well Doctor Christian is highly understanding.</Text>  
        <View style={{width:100,position:'absolute',left:135}}> 
         <StarRating
                                            disabled={true}
                                            starSize={15}
                                            maxStars={5}
                                            rating={this.state.starCount}
                                            fullStarColor={'#fcd703'}
                                        />  
                                        </View>
        </View>
        
        
        
        </View>   
        <View style={styles.review_container}>  
        <View style={{flex:.6}}>  
         <Image
          style={{
    width: 60,
    height: 60,
  }}
          source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
        />
        </View>  
        <View style={{flex:2}}>  
        <Text style={{fontSize:18,fontWeight:'bold'}}>Alex Rose</Text>
        <Text  style={{fontSize:10}}> <Feather
                  name="thumbs-up"
                    style={[
                    
                      {fontSize: Platform.OS === 'ios' ? 15 : 15,color:colors.GREEN},
                    ]}
                  /> I visited for cosmectic braces and the entire procedure went well Doctor Christian is highly understanding.</Text>  
        <View style={{width:100,position:'absolute',left:135}}> 
         <StarRating
                                            disabled={true}
                                            starSize={15}
                                            maxStars={5}
                                            rating={this.state.starCount}
                                            fullStarColor={'#fcd703'}
                                        />  
                                        </View>
        </View>
        
        
        
        </View>
        <View style={styles.review_container}>  
        <View style={{flex:.6}}>  
         <Image
          style={{
    width: 60,
    height: 60,
  }}
          source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
        />
        </View>  
        <View style={{flex:2}}>  
        <Text style={{fontSize:18,fontWeight:'bold'}}>Alex Rose</Text>
        <Text  style={{fontSize:10}}> <Feather
                  name="thumbs-up"
                    style={[
                    
                      {fontSize: Platform.OS === 'ios' ? 15 : 15,color:colors.GREEN},
                    ]}
                  /> I visited for cosmectic braces and the entire procedure went well Doctor Christian is highly understanding.</Text>  
        <View style={{width:100,position:'absolute',left:135}}> 
         <StarRating
                                            disabled={true}
                                            starSize={15}
                                            maxStars={5}
                                            rating={this.state.starCount}
                                            fullStarColor={'#fcd703'}
                                        />  
                                        </View>
        </View>
        
        
        
        </View>
        <View style={styles.review_container}>  
        <View style={{flex:.6}}>  
         <Image
          style={{
    width: 60,
    height: 60,
  }}
          source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
        />
        </View>  
        <View style={{flex:2}}>  
        <Text style={{fontSize:18,fontWeight:'bold'}}>Alex Rose</Text>
        <Text  style={{fontSize:10}}> <Feather
                  name="thumbs-up"
                    style={[
                    
                      {fontSize: Platform.OS === 'ios' ? 15 : 15,color:colors.GREEN},
                    ]}
                  /> I visited for cosmectic braces and the entire procedure went well Doctor Christian is highly understanding.</Text>  
        <View style={{width:100,position:'absolute',left:135}}> 
         <StarRating
                                            disabled={true}
                                            starSize={15}
                                            maxStars={5}
                                            rating={this.state.starCount}
                                            fullStarColor={'#fcd703'}
                                        />  
                                        </View>
        </View>
        
        
        
        </View>
        <View style={styles.review_container}>  
        <View style={{flex:.6}}>  
         <Image
          style={{
    width: 60,
    height: 60,
  }}
          source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
        />
        </View>  
        <View style={{flex:2}}>  
        <Text style={{fontSize:18,fontWeight:'bold'}}>Alex Rose</Text>
        <Text  style={{fontSize:10}}> <Feather
                  name="thumbs-up"
                    style={[
                    
                      {fontSize: Platform.OS === 'ios' ? 15 : 15,color:colors.GREEN},
                    ]}
                  /> I visited for cosmectic braces and the entire procedure went well Doctor Christian is highly understanding.</Text>  
        <View style={{width:100,position:'absolute',left:135}}> 
         <StarRating
                                            disabled={true}
                                            starSize={15}
                                            maxStars={5}
                                            rating={this.state.starCount}
                                            fullStarColor={'#fcd703'}
                                        />  
                                        </View>
        </View>
        
        
        
        </View> 
<View style={styles.btn_conatiner}> 
<TouchableOpacity style={styles.btn} onPress={()=>{this.goToPage()}}><Text style={{color:'white'}}> Book Appointment </Text></TouchableOpacity>
</View>
         
          
          </View>   
         
          </Content>
        </Container>
        );
    }
}

const styles = StyleSheet.create({
     container: {
    flex: 1,
    justifyContent: 'center',
  },

  header_container: {
    height: 50,
    alignItems: 'center', 
    backgroundColor:colors.THEME_BLUE
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

  field_conatiner:{flexDirection:'row',marginTop:15},
  heading_text:{fontWeight:'bold',fontSize:13},
  bullet_operator:{color:colors.THEME_BLUE,fontSize:12},
  btn_conatiner:{marginTop:20,alignItems:'center'},
  btn:{backgroundColor:colors.THEME_BLUE,width:240,height:40,alignItems:'center',justifyContent:'center'},
  review_text:{fontWeight:'bold',fontSize:20}, 
  review_container:{flexDirection:"row",marginTop:10,backgroundColor:"#fafafa"},




  progress_container:{ flexDirection: 'row',flex:1, alignItems: 'center',marginLeft:30,marginRight:30,marginTop:10},
progress_text_container:{ flexDirection: 'row',flex:1, alignItems: 'center',marginLeft:30,marginRight:30,marginTop:5},




circleStyle: { 
         
          width: 20,
          height: 20,
          borderRadius: 20,
          backgroundColor: "#9c9c9c",
          borderColor: "#9c9c9c",
          borderWidth: 5,
          bottom: 2, 
         
        }, 
        MiddlecircleStyle: { 
         width: 20,
          height: 20,
          borderRadius: 20,
          backgroundColor: colors.SLOTS_BTN,
          borderColor: colors.SLOTS_BTN,
          borderWidth: 5,
          bottom: 2, 
         
        },
        circleText: {
          alignSelf: 'center',
          top: 20 / 3,
        },
        labelText: {
        fontSize:12,
        fontWeight:'bold'
        },
        leftBar: {
          position: 'absolute',
          top: 20 / 2.22,
          left: 0,
          right: 144,
        
          borderTopWidth: 3,
          borderTopColor: "#ebebe4",
          marginRight: 16 / 2 + 4,
        },
        rightBar: {
          position: 'absolute',
          top: 16 / 2,
          right: 20,
          left: 122,
         
          borderTopWidth: 3,
          borderTopColor: colors.SLOTS_BTN,
          marginLeft: 16 / 2 + 4,
        },
        stepNum: {
          color: 'black',
        },
});