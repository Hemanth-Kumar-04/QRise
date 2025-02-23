import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    flex: 1,
  },
  content: {
    padding: 46,
    paddingTop: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    color:'#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 22,
  },
  subtitle: {
    fontSize: 15,
    color: '#fff',
    textAlign: 'center',
    marginVertical: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    height: 50,
    width: '100%',
    backgroundColor: '#0F0F0F',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
});

export default styles;