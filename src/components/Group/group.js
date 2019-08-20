import React, { Component } from "react";
import styles from "../Movie/styles.module.scss";
import movie from "../../assets/db.json";

class Group extends Component {
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
        const { title } = this.props.location.state;
        const { year } = this.props.location.state;
        const { plot } = this.props.location.state;

        return (
            <div className={styles.movie}>
                <h3 className={styles.movie__title}>
                    {title} ({year})
                </h3>
                <div className={styles.movie__content}>
                    <p className={styles.movie__plot}>
                        {plot}
                    </p>
                </div>
            </div>
        );
    }
}

export default Group;