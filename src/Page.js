import React from 'react';
import NotFound from './NotFound';
import PrismicReact from 'prismic-reactjs';

// Declare your component
export default class Page extends React.Component {

    state = {
        doc: null,
        notFound: false,
    }

    componentWillMount() {
        this.fetchPage(this.props);
    }

    componentWillReceiveProps(props) {
        this.fetchPage(props);
    }

    componentDidUpdate() {
        this.props.prismicCtx.toolbar();
    }

    fetchPage(props) {
        if (props.prismicCtx) {
            // We are using the function to get a document by its uid
            return props.prismicCtx.api.getByUID('homepage', props.match.params.uid, {}, (err, doc) => {
                if (doc) {
                    console.log(doc);
                    // We put the retrieved content in the state as a doc variable
                    this.setState({ doc });
                } else {
                    // We changed the state to display error not found if no matched doc
                    this.setState({ notFound: !doc });
                }
            });
        }
        return null;
    }

    render() {
        if (this.state.doc) {
            return (
                <div data-wio-id={this.state.doc.id}>
                    <h1>{PrismicReact.RichText.asText(this.state.doc.data.home_page_title)}</h1>
                </div>
            );
        } else if (this.state.notFound) {
            return <NotFound />;
        }
        return <h1>Loading</h1>;
    }
}