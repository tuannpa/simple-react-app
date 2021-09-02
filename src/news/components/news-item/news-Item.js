import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as farStar } from "@fortawesome/fontawesome-free-regular";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons";
import * as moment from 'moment'

library.add(farStar, fasStar);

class NewsItem extends React.Component {
    handleFavoriteNews = () => {
        // Notify News list to add the selected news to favorite news
        if (this.props.onItemClick) {
            this.props.onItemClick(this.props.item);
        }
    }

    render() {
        let icon = farStar;
        let title = 'Mark as favorite';

        if (this.props.favoriteNews &&
            this.props.favoriteNews.some(addedNews => addedNews.title === this.props.item.title)) {
            icon = fasStar;
            title = 'Remove favorite';
        }

        return (
            <tr key={this.props.item.title}>
                {
                    !this.props.plainData && <td>
                        <FontAwesomeIcon onClick={this.handleFavoriteNews}
                                         title={title}
                                         className="star-icon"
                                         icon={icon} />
                    </td>
                }
                <td>{this.props.item.title}</td>
                <td>{this.props.item.author}</td>
                <td>{this.props.item.source.name}</td>
                <td>{moment(this.props.item.publishedAt).format('DD/MM/YYYY')}</td>
            </tr>
        );
    }
}

export default NewsItem;
