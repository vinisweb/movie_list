import React, { Component } from "react";
import styles from "./styles.module.scss";
import movie from "../../assets/data.js";

class Movie extends Component {
    constructor(props) {
        super(props);
     
        this.state = {
          movies: []
        };
    }

    componentDidMount(){
        this.setState({movies: movie});
        }

    render() {
        return (
            <div className={styles.movie}>
                <h3 className={styles.movie__title}>
                    {this.props.title} ({this.props.year})
                </h3>
                <div className={styles.movie__content}>
                    <p className={styles.movie__plot}>
                        {this.props.plot}
                    </p>
                </div>
            </div>
        );
    }
}

export default Movie;