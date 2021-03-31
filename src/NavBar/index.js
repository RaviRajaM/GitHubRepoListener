import React, { Fragment } from "react";
import {
    Row,
    Col,
    Card,
    CardBody,
    Button,
} from "reactstrap";
import "./nav.css";
import "../../node_modules/font-awesome/css/font-awesome.min.css";
import ErrorModal from "../Modals/errorModal";
const { Octokit } = require("@octokit/rest");

class NavBarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            load: true,
            searchInput: "",
            response: [],
            modalOpen: false,
            sortArray: [],
            sortType: "byStag",
        };
    }

    componentDidMount = async () => {
    };
    refresh = () => {
        window.location.reload();
    }
    onToggle = () => {
        this.setState({ modalOpen: !this.state.modalOpen });
        window.location.reload();
    };
    onCancel = () => {
        this.onToggle();
    };
    handleSearch = async () => {
        let orgName = this.state.searchInput;
        try {
            const octokit = new Octokit();
            const result = await octokit
                .request('GET /users/{username}/repos', {
                    username: orgName,
                })
                .then(({ data }) => {
                    this.setState({ response: data, sortType: "byStag" });
                    console.log(this.state.response);
                });
        } catch (error) {
            this.setState({ modalOpen: true });
            console.log("Error");
        }
        this.sortFunction();
    };
    handleChange = (event) => {
        if (event.target.value === "") {
            this.setState({ response: [], sortArray: [] })
        }
        this.setState({ searchInput: event.target.value });

    };
    sortFunction = () => {
        const { response, sortType } = this.state;
        if (sortType === "byAplha") {
            this.state.sortArray = response.sort((a, b) => {
                const isReversed = sortType === "byAplha" ? -1 : 1;
                return isReversed * a.name.localeCompare(b.name);
            });
            this.setState({ sortArray: this.state.sortArray });
        }
        if (sortType === "byStag") {
            this.state.sortArray = response.sort((a, b) => {
                return parseInt(b.stargazers_count) - parseInt(a.stargazers_count);
            });
            this.setState({ sortArray: this.state.sortArray });
        }
    };

    renderCards = (data, index) => {
        return (
            <Col lg={4} md={6} sm={12} xs={12} key={index} className="mt-2">
                <div
                    className="icon-cards-row mb-3"
                >
                    <div key={`icon_card_1`}>
                        <div className={`icon-row-item`}>
                            <Card className="card1">
                                <CardBody className="cardBody1 md-0">
                                    <Row className="mt-0">
                                        <p
                                            className="font-weight-semibold mb-0"
                                            style={{ fontSize: "1rem", fontWeight: 600, fontFamily: "    FontAwesome" }}
                                        >
                                            {data.name}
                                        </p>
                                    </Row>
                                    <Row className="customRow mt-1">
                                        <span>{data.stargazers_count} {' '}Stargazers
                                        {' '} {"|"} {' '}{data.watchers_count}{' '} People Watching </span>
                                    </Row>
                                    <Row>
                                        <p className="mt-1" style={{ fontFamily: "    FontAwesome", }}>{data.description}</p>
                                    </Row>
                                    <Row>
                                        <p className="mt-1" style={{ fontFamily: "    FontAwesome", }}><a target="_blank" href={data.html_url}> {data.html_url}</a></p>
                                    </Row>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </div>
            </Col>
        );
    };

    buttonSort = (value) => {
        this.state.sortType = value;
        this.sortFunction();
    };
    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    }

    render() {
        return (
            <Fragment>
                <div>
                    <div className="main mt-2">
                        <form>
                            <Row sm="3" lg="12" md="12" xs="3">
                                <Col lg="4" md="4" sm="3">
                                    {" "}
                                    <h3 className="mt-3 header1" onClick={this.refresh}>GitHub Repo Lister</h3>

                                </Col>
                                <Col lg="4" md="4" sm="3">
                                    <div className="form-group has-search mt-3">
                                        <span className="fa fa-search form-control-feedback"></span>
                                        <input
                                            type="text"
                                            class="form-control"
                                            placeholder="Search Users/Orgs"
                                            value={this.state.searchInput}
                                            onChange={this.handleChange}
                                            onKeyDown={this.handleKeyDown}

                                        />
                                    </div>
                                </Col>
                                <Col lg="4" md="3" sm="3">
                                    <Button
                                        className="searchButton  mt-3"
                                        onClick={this.handleSearch}
                                    >
                                        {" "}
                  Search
                </Button>
                                </Col>
                            </Row>
                        </form>
                    </div>
                    <div className="mt-5">
                        <Row style={{ paddingLeft: "40px" }}>
                            <h6 className="customHeading">
                                Please enter any GitHub User Names to find their individual repositories
                            <br />
                                <br />
                                Listing repositories for the user "{this.state.searchInput}":
            </h6>
                        </Row>

                        <Row
                            className="mt-3"
                            style={{ display: "flex", alignItems: "flex-end", paddingLeft: "40px" }}
                        >
                            <h6 style={{ fontSize: "1rem", paddingRight: "10px" }}>SortBy</h6>
                            {this.state.sortType === "byAplha" ? (
                                <Button
                                    className="fa fa-sort"
                                    style={{ marginRight: "10px", background: "blueviolet" }}
                                    onClick={() => this.buttonSort("byAplha")}
                                >
                                    {" "}
                Alphabetical
                                </Button>
                            ) : (
                                <Button
                                    className="fa fa-sort"
                                    style={{ marginRight: "10px" }}
                                    onClick={() => this.buttonSort("byAplha")}
                                >
                                    {" "}
                Alphabetical
                                </Button>
                            )}
                            {this.state.sortType === "byStag" ? (
                                <Button
                                    className="fa fa-sort"
                                    style={{ background: "blueviolet" }}
                                    onClick={() => this.buttonSort("byStag")}
                                >
                                    {" "}
                By Most Stars
                                </Button>
                            ) : (
                                <Button
                                    className="fa fa-sort"
                                    onClick={() => this.buttonSort("byStag")}
                                >
                                    {" "}
                By Most Stars
                                </Button>
                            )}
                        </Row>

                        <Row>{this.state.sortArray.map(this.renderCards)}</Row>
                    </div>
                    <ErrorModal
                        open={this.state.modalOpen}
                        onToggle={this.onToggle}
                        onCancel={this.onCancel}
                        bodyText="No Organization Repos Found, Click Ok to search a new Repo "
                        modalText="Oops Error.."
                    />
                </div>
            </Fragment >
        );
    }
}

export default NavBarComponent;
