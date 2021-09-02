import React from "react";
import './news-list.css';
import { Button, InputGroup, Spinner, Table } from "react-bootstrap";
import Select from "react-select";
import NewsClient from '../../clients/news/news.client';
import NewsItem from "../news-item/news-Item";
import FavoriteNews from "../favorite-news/favorite-news";

const countries = [
    {label: 'Australia', value: 'au'},
    {label: 'Korea', value: 'kr'},
    {label: 'Japan', value: 'jp'},
    {label: 'New Zealand', value: 'nz'},
    {label: 'United States', value: 'us'}
];

const newsType = [
    {label: 'Latest News', value: 'latest'},
    {label: 'Favorite News', value: 'favorite'}
];

const apiKey = '634c025c124f4790a919fb1e0a11935e';

class NewsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            country: 'us',
            loading: true,
            showFavoriteNews: false,
            favoriteNews: JSON.parse(localStorage.getItem('favorite-news')) || [],
            news: []
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    handleSubmit = (event) => {
        this.fetchData();
    }

    handleCountryChange = (event) => {
        this.setState({
            country: event.value
        });
    }

    handleFavoriteNews = (news) => {
        const storageKey = 'favorite-news';
        let favoriteNews = JSON.parse(localStorage.getItem(storageKey)) || [];
        let storageData = [];
        let stateData = [];

        if (!favoriteNews.some(addedNews => addedNews.title === news.title)) {
            favoriteNews.push(news);
            storageData = favoriteNews;
            stateData = [...this.state.favoriteNews, news];
        } else {
            stateData = storageData = favoriteNews.filter(item => item.title !== news.title);
        }

        localStorage.setItem(storageKey, JSON.stringify(storageData));
        this.setState({
            favoriteNews: stateData
        });
    }

    seeNewsByType = (event) => {
        this.setState({
            showFavoriteNews: ('favorite' === event.value)
        });
    }

    fetchData = () => {
        // Show loading animation
        this.setState({
            loading: true
        });

        // Prepare query parameters
        const queryParams = new URLSearchParams({
            country: this.state.country,
            apiKey: apiKey
        });

        // Fetch data from API source
        NewsClient.get(`top-headlines?${queryParams}`).then(res => {
            if (res?.data?.articles) {
                this.setState({
                    news: res.data.articles
                })
            }
        }).catch(error => {
            // Handle error case
            this.setState({
                news: []
            })
        }).finally(() => {
            // Turn off loading animation
            this.setState({
                loading: false
            })
        });
    }

    render() {
        const newsList = this.state.loading ? (
            <Spinner animation="grow" role="status" aria-hidden="true">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        ) : this.state.news?.length === 0 ? 'News are not available' : (
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Action</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Source</th>
                    <th>Published At</th>
                </tr>
                </thead>
                <tbody>
                {this.state.news.map(item =>
                    <NewsItem key={item.title}
                              item={item}
                              favoriteNews={this.state.favoriteNews}
                              onItemClick={this.handleFavoriteNews}/>
                )}
                </tbody>
            </Table>
        );

        const content = this.state.showFavoriteNews ?
            <FavoriteNews favoriteNews={this.state.favoriteNews}></FavoriteNews> : newsList

        return (
            <div className="mt-3">
                <div className='mb-3 w-25'>
                    <Select defaultValue={{label: 'Latest News', value: 'latest'}}
                            onChange={this.seeNewsByType} options={newsType}/>
                </div>

                <form>
                    <InputGroup className="mb-3">
                        <div className="me-2 w-25">
                            <Select defaultValue={{label: 'United States', value: 'us'}}
                                    onChange={this.handleCountryChange} options={countries}/>
                        </div>
                        <Button variant="outline-primary" onClick={this.handleSubmit}>Search</Button>
                    </InputGroup>
                </form>
                {content}
            </div>
        );
    }
}

export default NewsList;
