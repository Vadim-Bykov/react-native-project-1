import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Badge, Icon} from 'react-native-elements';

export const StarBlock = ({data, width}) => {
  return (
    <View style={{...styles.container, width: width * 0.9}}>
      <View>
        <Icon type="antdesign" name="star" color="#FFDD00" />
        <Text>{data.vote_average}/10</Text>
      </View>

      <View>
        <Icon type="antdesign" name="staro" color="#000" />
        <Text>Save to favorites</Text>
      </View>

      <View>
        <Badge
          status="success"
          value={data.vote_count}
          textStyle={styles.voteCount}
          containerStyle={{height: 24, marginTop: 5}}
        />
        <Text>Vote count</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    alignSelf: 'flex-end',
    marginTop: -50,
    backgroundColor: '#fff',
    elevation: 10,
  },
  voteCount: {
    borderRadius: 3,
    backgroundColor: '#51C51B',
    height: 24,
    paddingTop: 3,
  },
});
