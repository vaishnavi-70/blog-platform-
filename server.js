const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));
let posts = [
    {
        id: 1,
        title: 'Getting Started with Web Development',
        content: 'Web development is an exciting journey combining creativity and logic...',
        author: 'Vaishnavi',
        comments: [
            { user: 'Rahul', text: 'Great explanation!' },
            { user: 'Ananya', text: 'Very helpful article.' }
        ]
    },
    {
        id: 2,
        title: 'Understanding Node.js and Express',
        content: 'Node.js allows you to run JavaScript on the server side efficiently...',
        author: 'Admin',
        comments: []
    }
];
app.get('/api/posts', (req, res) => {
    res.json(posts);
});
app.get('/api/posts/:id', (req, res) => {
    const post = posts.find(p => p.id == req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
});
app.post('/api/posts', (req, res) => {
    const { title, content, author } = req.body;
    const newPost = {
        id: posts.length + 1,
        title,
        content,
        author: author || 'Anonymous',
        comments: []
    };
    posts.push(newPost);
    res.json({ message: 'Post created successfully', post: newPost });
});

app.post('/api/posts/:id/comments', (req, res) => {
    const { user, text } = req.body;
    const post = posts.find(p => p.id == req.params.id);
    
    if (!post) return res.status(404).json({ error: 'Post not found' });

    post.comments.push({ user: user || 'Anonymous', text });
    res.json({ message: 'Comment added successfully', post });
});
app.delete('/api/posts/:id', (req, res) => {
    posts = posts.filter(p => p.id != req.params.id);
    res.json({ message: 'Post deleted successfully' });
});

app.listen(3000, () => {
    console.log('Blog server running on http://localhost:3000');
});