import React, { Component } from 'react';
import logo from './adil-secim.png';
import './App.css';
import axios from 'axios';
import moment from 'moment';
import Content from './Content';
import CircularProgress from '@material-ui/core/CircularProgress';

const data = { meclis: [{}], cumhur: [{}] };
const requests = { meclis: [], cumhur: [] };
const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

class App extends Component {
    constructor () {
        super();

        this.state = {
            init: false,
            loading: false,
            data: data
        };
    }

    componentDidMount() {
        this.buildRequests();
        this.fetchAll('cumhur');

        setInterval(() => {
            this.fetchAll('cumhur');
        }, 10000);
    }

    buildRequests() {
        requests.meclis = [];
        for (let city = 1; city <= 81; city++) {
            requests.meclis.push(() => {
                return axios.get(`/api/1/city/${city}.json`);
            });
        }

        requests.cumhur = [];
        for (let city = 1; city <= 81; city++) {
            requests.cumhur.push(() => {
                return axios.get(`/api/2/city/${city}.json`);
            });
        }
    }

    fetchAll(type) {
        this.setState({
            loading: true
        });

        axios
            .all(requests[type].map(req => req()))
            .then(function () {                
                let aggregates = data[type][0] = {
                    id: '0',
                    name: 'TUM ILLER',
                    box_count: 0,
                    open_box_count: 0,
                    voter_count: 0,
                    total_valid_vote: 0,
                    results: {
                        dp: 0,
                        ma: 0,
                        mi: 0,
                        rte: 0,
                        sd: 0,
                        tk: 0
                    },
                    updated_at: moment('2018-06-23').format(DATE_FORMAT)
                };

                arguments[0].forEach((item, index) => {
                    let city = item.data;

                    city.box_count = parseInt(city.box_count, 10);
                    city.open_box_count = parseInt(city.open_box_count, 10);
                    city.voter_count = parseInt(city.voter_count, 10);
                    city.total_valid_vote = parseInt(city.total_valid_vote, 10);
                    city.results.dp = parseInt(city.results.dp, 10);
                    city.results.ma = parseInt(city.results.ma, 10);
                    city.results.mi = parseInt(city.results.mi, 10);
                    city.results.rte = parseInt(city.results.rte, 10);
                    city.results.sd = parseInt(city.results.sd, 10);
                    city.results.tk = parseInt(city.results.tk, 10);

                    data[type][index + 1] = city;

                    aggregates.box_count += city.box_count;
                    aggregates.open_box_count += city.open_box_count;
                    aggregates.voter_count += city.voter_count;
                    aggregates.total_valid_vote += city.total_valid_vote;
                    aggregates.results.dp += city.results.dp;
                    aggregates.results.ma += city.results.ma;
                    aggregates.results.mi += city.results.mi;
                    aggregates.results.rte += city.results.rte;
                    aggregates.results.sd += city.results.sd;
                    aggregates.results.tk += city.results.tk;

                    let aggr_date = moment(aggregates.updated_at, DATE_FORMAT);
                    let city_date = moment(city.results.updated_at, DATE_FORMAT);

                    if (aggr_date.diff(city_date) < 0) {
                        aggregates.updated_at = city.results.updated_at;
                    }
                });

                this.setState({
                    init: true,
                    loading: false,
                    data: data
                });
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="App">
                <div className="container">
                    {this.state.init && this.state.loading && <div className="side-loader"><CircularProgress size={38} color="secondary" /></div>}

                    {this.state.init ? (
                        <Content data={this.state.data} />
                    ) : (
                        <div className="center-loader">
                            <CircularProgress size={60} />
                        </div>
                    )}

                    {this.state.init && <div className="side-loader">Guncel: {moment(this.state.data.cumhur[0].updated_at, DATE_FORMAT).format('HH:mm:ss')}</div>}
                </div>
            </div>
        );
    }
}

export default App;
