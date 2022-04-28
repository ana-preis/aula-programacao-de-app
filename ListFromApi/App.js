import React, { useState } from "react";
import { FlatList, Text, View, TouchableOpacity, TextInput } from 'react-native';
import estilo from './estilo'
import api from './client'

const App = () => {

  const [post, setPost] = useState({});
  const [postId, setPostId] = useState("20")
  const [comments, setComments] = useState([])

  const handleRequestPost = async () => {
    const response = await api.get(`posts/${postId}`);
    setPost(response.data)
  }

  const handleRequestComments = async () => {
    const response = await api.get(`posts/${postId}/comments`);
    setComments(response.data);
  }

  return (
    <>
      <View>
        <Text style={[estilo.text, estilo.header]}>API - LISTE OS COMENTARIOS PELA ID</Text>
      </View>

      <View style={estilo.viewinline}>
        <TextInput value={postId} onChangeText={setPostId} placeholder="ID" style={estilo.inputtxt}/>
        <TouchableOpacity onPress={() => {
          handleRequestPost();
          handleRequestComments(); 
        }} style={estilo.btn}>
          <Text style={estilo.text}>
              Post
          </Text>
        </TouchableOpacity>
      </View>

      <View>

        <View style={estilo.fundopost}>
          <Text style={estilo.text}>
            Id do Usuário: {post.userId}
          </Text>
          <Text style={estilo.text}>
            Id do Post: {post.id}
          </Text>
          <Text style={estilo.text}>
            Título: {post.title}
          </Text>
          <Text style={estilo.text}>
            Conteúdo: {post.body}
          </Text>
        </View>

        <FlatList
          data={comments}
          renderItem={({item}) => 
          <View style={estilo.fundocomment}>
            <Text style={estilo.text}>
              Id do Comentário: {item.id}
            </Text>
            <Text style={estilo.text}>
              Nome: {item.name}
            </Text>
            <Text style={estilo.text}>
              Email: {item.email}
            </Text>
            <Text style={estilo.text}>
              Comentário: {item.body}
            </Text>
          </View>}
        />
      </View>
    </>
  );

};

export default App;