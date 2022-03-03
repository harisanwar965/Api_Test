// shift, unshift, post , edit, delete
import React, {useState} from 'react';
import styles from './Styles';
import {NavigationContainer} from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useEffect} from 'react';
import Modal from 'react-native-modal';
import Cross from 'react-native-vector-icons/Entypo';
const App = props => {
  const [modalvisible, Setmodalvisible] = useState(false);
  const [modalvisible1, Setmodalvisible1] = useState(false);
  const [Data, setData] = useState([]);
  const [id, setId] = useState('');
  const [id1, setId1] = useState('');
  const [title, setTitle] = useState('');
  const [title1, setTitle1] = useState('');
  const [description, setDescription] = useState('');
  const [description1, setDescription1] = useState('');
  const [response, setResponse] = useState('');
  const [flag, setFlag] = useState(true);
  const [flag1, setFlag1] = useState(true);
  const [indexx, setIndexx] = useState(0);
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch('https://jsonplaceholder.typicode.com/posts', requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result && typeof result.length != 'undefined' && result != {}) {
          console.log('result.length', result.length);
          result.forEach(item => {
            item.flag = true;
          });
          setData(result);
          console.log('result.length');
        } else {
          console.log('no values');
        }
      })

      .catch(error => console.log('error'));
  };
  const addtoarray1 = () => {
    let array1 = [...Data];
    array1[indexx].title = title1;
    setData(array1);
    setFlag1(!flag1);
  };
  const addtoarray = () => {
    let object = {
      userId: 1,
      id: id,
      title: title,
      body: description,
      flag: true,
    };
    let array = [...Data];
    array.unshift(object);
    setData(array);

    var formdata = new FormData();
    formdata.append('id', id);
    formdata.append('title', title);
    formdata.append('description', description);
    formdata.append('userId', '222');

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    fetch('https://jsonplaceholder.typicode.com/posts', requestOptions)
      .then(response => response.json())

      .then(result => {
        console.log(result);

        setResponse(result.id);
      })

      .catch(error => console.log('error', error));
  };
  const deletearray = index => {
    Data[index].flag = false;
    console.log('Data', Data);
    setFlag(!flag);
  };
  const ListFooterComponent = () => {
    return (
      <View
        style={{
          marginBottom: 80,
        }}></View>
    );
  };
  const listhead = () => {
    return (
      <View
        style={{
          height: 20,
          marginTop: 20,
        }}></View>
    );
  };
  const renderItem = ({item, index}) => {
    return (
      <>
        {item.flag === true ? (
          <View style={{marginHorizontal: 12}}>
            <TouchableOpacity
              style={{
                borderRadius: 10,
                borderColor: 'black',
                borderWidth: 2,
                elevation: 22,
                height: 150,
                backgroundColor: '#0ff',
                marginTop: '5%',
                justifyContent: 'center',
                marginBottom: 0,
              }}
              onPress={() => {
                Setmodalvisible1(true);
                setIndexx(index);
              }}>
              <TouchableOpacity
                style={{
                  color: 'ivory',
                  height: 40,
                  width: 50,
                  marginTop: 10,
                }}
                onPress={() => {
                  deletearray(index);
                }}>
                <Cross name={'trash'} size={25}></Cross>
              </TouchableOpacity>
              <Text
                style={{
                  textAlign: 'center',

                  alignSelf: 'center',
                  fontSize: 20,
                  fontWeight: 'bold',
                }}>
                {item.id}
              </Text>
              <Text
                style={{
                  textAlign: 'center',

                  alignSelf: 'center',
                  fontSize: 20,
                  fontWeight: 'bold',
                }}>
                {item.title}
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </>
    );
  };
  return (
    <View>
      <Text>{response.toString()}</Text>
      <TouchableOpacity
        onPress={() => {
          props.navigation.goBack();
        }}>
        <Text>GO BACK</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          borderRadius: 10,
          borderColor: 'black',
          borderWidth: 2,
          elevation: 22,
          height: 50,
          width: 60,
          backgroundColor: '#55f',
          marginLeft: '80%',
          marginTop: 10,
          marginBottom: 10,
          justifyContent: 'center',
        }}
        onPress={() => {
          Setmodalvisible(true);
        }}>
        <Text
          style={{
            textAlign: 'center',
            alignSelf: 'center',
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          Add
        </Text>
      </TouchableOpacity>

      <FlatList
        extraData={(flag, flag1)}
        renderItem={renderItem}
        data={Data}
        ListHeaderComponent={listhead}
        ListFooterComponent={ListFooterComponent}></FlatList>
      <View style={{flex: 1}}>
        <Modal isVisible={modalvisible}>
          <View
            style={{
              paddingVertical: 8,
              width: '80%',

              backgroundColor: 'white',
              // justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              borderRadius: 25,
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: 'white',
                // height: 30,
                // width: 50,
                alignSelf: 'flex-end',
                marginRight: 12,
              }}
              onPress={() => {
                Setmodalvisible(false);
              }}>
              <Cross name={'cross'} size={35}></Cross>
            </TouchableOpacity>
            <TextInput
              style={{
                margin: 10,
                height: 60,
                width: 200,
                borderRadius: 15,
                borderWidth: 0.5,
                borderColor: 'black',
                color: 'black',
              }}
              placeholder={'enter id'}
              value={id}
              onChangeText={newId => setId(newId)}></TextInput>
            <TextInput
              style={{
                margin: 10,
                height: 60,
                width: 200,
                borderRadius: 15,
                borderWidth: 0.5,
                borderColor: 'black',
                color: 'black',
              }}
              placeholder={'enter title'}
              value={title}
              onChangeText={newTitle => setTitle(newTitle)}></TextInput>
            <TextInput
              style={{
                margin: 10,
                height: 60,
                width: 200,
                borderRadius: 15,
                borderWidth: 0.5,
                borderColor: 'black',
                color: 'black',
              }}
              placeholder={'enter description'}
              value={description}
              onChangeText={newDescription =>
                setDescription(newDescription)
              }></TextInput>

            <TouchableOpacity
              style={{
                height: 40,
                width: 200,
                backgroundColor: 'aqua',
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
              }}
              onPress={() => {
                Setmodalvisible(false);
                addtoarray();
              }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                }}>
                change
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <View>
          <Modal isVisible={modalvisible1}>
            <View
              style={{
                paddingVertical: 10,
                width: '80%',
                height: '80%',
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                borderRadius: 25,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  alignSelf: 'center',
                  fontSize: 20,
                  fontWeight: 'bold',
                }}></Text>

              <TextInput
                style={{
                  margin: 10,
                  height: 60,
                  width: 200,
                  borderRadius: 15,
                  borderWidth: 0.5,
                  borderColor: 'black',
                  color: 'black',
                }}
                placeholder={'enter id'}
                value={id1}
                onChangeText={newId => setId1(newId)}></TextInput>
              <TextInput
                style={{
                  margin: 10,
                  height: 60,
                  width: 200,
                  borderRadius: 15,
                  borderWidth: 0.5,
                  borderColor: 'black',
                  color: 'black',
                }}
                placeholder={'enter title'}
                value={title1}
                onChangeText={newTitle => setTitle1(newTitle)}></TextInput>
              <TextInput
                style={{
                  margin: 10,
                  height: 60,
                  width: 200,
                  borderRadius: 15,
                  borderWidth: 0.5,
                  borderColor: 'black',
                  color: 'black',
                }}
                placeholder={'enter description'}
                value={description1}
                onChangeText={newDescription =>
                  setDescription1(newDescription)
                }></TextInput>
              <TouchableOpacity
                onPress={() => {
                  Setmodalvisible1(false);
                }}>
                <Cross name={'cross'} size={40}></Cross>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: 60,
                  width: 200,
                  backgroundColor: 'grey',
                  borderRadius: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  addtoarray1();
                  Setmodalvisible1(false);
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}>
                  change text
                </Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </View>
    </View>
  );
};

export default App;
