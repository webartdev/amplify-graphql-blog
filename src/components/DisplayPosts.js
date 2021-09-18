import React, {Component} from 'react'
import {listPosts } from '../graphql/queries'
import {API, graphqlOperation} from 'aws-amplify'
import DeletePost from './DeletePost'
import EditPost from './EditPost'

class DisplayPosts extends Component {
    state = {posts: []}
  
    componentDidMount = async () => {
        this.getPosts()
    }

    getPosts = async () => {
        const result = await API.graphql(graphqlOperation(listPosts))
        this.setState({posts: result.data.listPosts.items})
        // console.log("All Posts: ", JSON.stringify(result.data.listPosts.items))
        // console.log("All Posts: ", result.data.listPosts.items)
    }

    render() {
        // const posts = this.state.posts
        const {posts}  = this.state

        return(
            posts.map((post)=> {
                return(<div key={post.id}><h1>{post.postTitle}</h1>
            <p>{"Wrote by:" }{post.postOwnerUsername
}</p>
<p>{"Post body:" }{post.postBody
}</p>
<br/><span> <EditPost/></span>
<span> <DeletePost/></span>
<h2>Blog</h2>

</div>)
            })
        )
    }
}

export default DisplayPosts