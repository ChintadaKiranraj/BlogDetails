import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import {Component} from 'react'

import './index.css'

class BlogItemDetails extends Component {
  state = {
    blogData: {},
    isLoading: true,
  }

  componentDidMount() {
    this.getBlogItemDetails()
  }

  getBlogItemDetails = async () => {
    console.log(this.props)
    const {match} = this.props
    const {params} = match
    // const {params, url} = match
    const {id} = params
    console.log(id)
    // const Url = `https://apis.ccbp.in${url}`
    const Url = `https://apis.ccbp.in/blogs/${id}`
    const response = await fetch(Url)
    const eachItem = await response.json()
    console.log(eachItem)

    const Data = {
      author: eachItem.author,
      avatarUrl: eachItem.avatar_url,
      content: eachItem.content,
      imageUrl: eachItem.image_url,
      title: eachItem.title,
      topic: eachItem.topic,
    }
    this.setState({
      blogData: {...Data},
      isLoading: false,
    })
  }

  renderBlogItemDetails = () => {
    const {blogData} = this.state
    const {title, imageUrl, content, avatarUrl, author, topic} = blogData
    return (
      <div className="blog-info">
        <h2 className="blog-details-title">{title}</h2>

        <div className="author-details">
          <img className="author-pic" src={avatarUrl} alt={author} />
          <p className="details-author-name">{author}</p>
        </div>

        <img className="blog-image" src={imageUrl} alt={title} />
        <p className="blog-content">{content}</p>
        <p className="blog-content">{topic}</p>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="blog-container">
        {isLoading ? (
          <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
        ) : (
          this.renderBlogItemDetails()
        )}
      </div>
    )
  }
}

export default BlogItemDetails
