// server.js

const express = require('express');
const mongoose= require('mongoose')
const app = express();
const axios = require('axios');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
// mongodb connection
mongoose.connect('mongodb://localhost:27017/detoxify')
.then(()=>{
  console.log('mongodb connected');
})
.catch(()=>{
  console.log('error');
})

const detoxTestSchema= new mongoose.Schema({
  name: {
    type:String,
    required:true
  },
  password: {
    type:String,
    required:true
  },
  testscore: {
    type: Number,
    required:true
  },
  level:{
    type:Number,
    required:true
  }
})

const collection=new mongoose.model('detoxTest',detoxTestSchema)

data=[{
  name:"Aayushi",
  password:"123456",
  testscore:14,
  level:2
},
{
  name:"Arpita",
  password:"arpitaaa",
  testscore:10,
  level:2
},
{
  name:"Anu",
  password:"anu123",
  testscore:18,
  level:1
}
]
collection.insertMany(data)


const PORT = process.env.PORT || 9999;

// Serve static files (HTML, CSS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Redirect route for Spotify authorization
app.get('/login', (req, res) => {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const redirect_uri = process.env.REDIRECT_URI; // Encode URI component
  const scopes = 'user-read-private user-top-read playlist-modify-public playlist-modify-private';
  const state = ''; // Optionally, you can add state for security

  const authorizationUrl = "https://accounts.spotify.com/en/authorize?client_id=0ed9ce5473ad4212a584161201e9e7a8&response_type=code&redirect_uri=http://localhost:9999/MenuPage.html&state=&show_dialog=false&scope=user-read-private%20user-top-read%20playlist-modify-public%20playlist-modify-private"
  res.redirect(authorizationUrl);
});

// Serve MenuPage.html
app.get('/MenuPage.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'MenuPage.html'));
});

// Route to handle fetching user's Spotify data
app.get('/spotify-data', async (req, res) => {
  try {
    // Make requests to the Spotify API here to fetch user data
    // For simplicity, let's just send sample data
    const topTracks = ['Maula Mere Maula - Roop Kumar Rathod', 'favorite - Isabel LaRosa', 'One Of The Girls ( with JENNIE, Lily Rose Depp - The Weekend, JENNIE, Lily-Rose Depp', 'Cruel Summer - Taylor Swift', 'Lae Dooba - Asees Kaur', 'Labon Ko - Pritam, KK', 'Lat Lag Gayee - Benny Dayal, Shalmali Kholgade, Pritam','Lae Dooba - Sunidhi Chauhan','Baarish - Mohammed Irfan, Gajendra Verma', 'Tera Mera Rishta - Mustafa Zahid'];
    const topPlaylists = ['Filmi', 'Indian Instrumental', 'Modern Bollywood', 'Dark R&b', 'Hyperpop'];
    const topArtists = [ 'Pritam', 'Isabel LaRosa', 'Arjit Singh', 'Taylor swift','Darshan Raval'];

    // Send the data as JSON response
    res.json({ topTracks, topPlaylists, topArtists });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});