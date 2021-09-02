import React from "react";
import {Table} from "react-bootstrap";
import NewsItem from "../news-item/news-Item";

class FavoriteNews extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            this.props.favoriteNews?.length === 0 ? 'You have not added any news to your favorite :(' : (
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Source</th>
                        <th>Published At</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.favoriteNews.map(item =>
                        <NewsItem key={item.title}
                                  item={item}
                                  plainData={true}
                        />
                    )}
                    </tbody>
                </Table>
            )
        );
    }
}

export default FavoriteNews;
